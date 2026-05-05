const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Protocol Integration Tests", function () {
  let token, dao, staking, owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // Deploy do Ecossistema
    const Token = await ethers.getContractFactory("SecurityToken");
    token = await Token.deploy();

    const DAO = await ethers.getContractFactory("SimpleDAO");
    dao = await DAO.deploy(await token.getAddress());

    const Staking = await ethers.getContractFactory("StakingVault");
    // No teste local, usamos o owner como mock do priceFeed
    staking = await Staking.deploy(await token.getAddress(), owner.address);
  });

  it("DAO: Não deve permitir voto sem saldo de SecurityToken", async function () {
    await dao.createProposal("Reparo de sinistro #123");
    // user tem 0 tokens
    await expect(dao.connect(user).vote(0))
      .to.be.revertedWith("Voce precisa de tokens STK para votar");
  });

  it("Staking: Deve reter tokens e atualizar saldo do Vault", async function () {
    const amount = ethers.parseEther("100");
    await token.approve(await staking.getAddress(), amount);
    await staking.stake(amount);

    expect(await staking.stakedAmount(owner.address)).to.equal(amount);
  });

  it("Fluxo Completo: Transferir token -> Votar na DAO", async function () {
    await dao.createProposal("Nova regra de governança");
    
    // Transfere 1 token para o user poder votar
    await token.transfer(user.address, ethers.parseEther("1"));
    
    await expect(dao.connect(user).vote(0)).to.not.be.reverted;
    const prop = await dao.proposals(0);
    expect(prop.voteCount).to.equal(1);
  });
});