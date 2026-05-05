const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Fazendo deploy com a conta:", deployer.address);

  // Deploy do Token ERC-20
  const Token = await hre.ethers.getContractFactory("SecurityToken");
  const token = await Token.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("Token ERC-20 implantado em:", tokenAddress);

  // Deploy do NFT ERC-721
  const NFT = await hre.ethers.getContractFactory("AssetNFT");
  const nft = await NFT.deploy();
  await nft.waitForDeployment();
  console.log("NFT implantado em:", await nft.getAddress());

  // deploy simpledao
  const DAO = await hre.ethers.getContractFactory("SimpleDAO");
  const dao = await DAO.deploy(tokenAddress); // <-- Passando o endereço aqui
  await dao.waitForDeployment();
  console.log("SimpleDAO implantado em:", await dao.getAddress());


  // Deploy do Staking (Passando o Token e o Oráculo da Sepolia)
  // Endereço do Price Feed ETH/USD na Sepolia:
  const CHAINLINK_ORACLE = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
  
  const Staking = await hre.ethers.getContractFactory("StakingVault");
  const staking = await Staking.deploy(tokenAddress, CHAINLINK_ORACLE);
  await staking.waitForDeployment();
  console.log("Staking implantado em:", await staking.getAddress());

  console.log("\n--- DEPLOY FINALIZADO ---");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});