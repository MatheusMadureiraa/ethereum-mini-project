const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SecurityToken Unit Test", function () {
  it("Deve atribuir o suprimento inicial ao owner", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("SecurityToken");
    const token = await Token.deploy();
    
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });
});