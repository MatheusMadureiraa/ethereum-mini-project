const hre = require("hardhat");

async function main() {
  const SecurityToken = await hre.ethers.getContractFactory("SecurityToken");
  const token = await SecurityToken.deploy();

  await token.waitForDeployment();

  console.log("Token implantado em:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});