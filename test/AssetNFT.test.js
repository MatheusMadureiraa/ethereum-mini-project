const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AssetNFT Unit Test", function () {
  it("Deve incrementar o TokenID a cada mint", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("AssetNFT");
    const nft = await NFT.deploy();

    await nft.safeMint(addr1.address);
    expect(await nft.ownerOf(0)).to.equal(addr1.address);

    await nft.safeMint(addr1.address);
    expect(await nft.ownerOf(1)).to.equal(addr1.address);
  });
});