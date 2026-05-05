const hre = require("hardhat");

async function main() {
    // Endereços dos contratos
    const TOKEN_ADDR = "0xa9360438700CdBB2056165A59fba9C5D0760e19a";
    const NFT_ADDR = "0x833c25f1Bddea55085978a59904a52b294c92292";
    const STAKING_ADDR = "0xdFe7368686FD5A3a4Ea89D4081A8Ef309661E2C3";
    const DAO_ADDR = "0xCADAc53aC11411025600b19D3E2F13894E1CE84e";

    const [deployer] = await hre.ethers.getSigners();
    
    const token = await hre.ethers.getContractAt("SecurityToken", TOKEN_ADDR);
    const nft = await hre.ethers.getContractAt("AssetNFT", NFT_ADDR);
    const staking = await hre.ethers.getContractAt("StakingVault", STAKING_ADDR);
    const dao = await hre.ethers.getContractAt("SimpleDAO", DAO_ADDR); // Padronizei para 'dao' minúsculo

    console.log("Iniciando interações com a conta:", deployer.address);

    // MINT DE NFT
    console.log("Mintando NFT de Ativo...");
    const nftTx = await nft.safeMint(deployer.address);
    await nftTx.wait(); 
    console.log("NFT Mintado! Hash:", nftTx.hash);

    // APPROVE
    const amount = hre.ethers.parseEther("50"); 
    console.log("Aprovando o contrato de Staking...");
    const approveTx = await token.approve(STAKING_ADDR, amount);
    await approveTx.wait();
    console.log("Aprovado!");

    // STAKE
    console.log("Realizando Stake de 50 tokens...");
    const stakeTx = await staking.stake(amount);
    await stakeTx.wait();
    console.log("Stake concluído! Hash:", stakeTx.hash);

    // CONSULTA ORÁCULO
    const price = await staking.getLatestPrice();
    console.log("Preço atual do ETH (via Chainlink):", price.toString());

    // DAO - CRIAR PROPOSTA
    console.log("Criando proposta na DAO...");
    const propTx = await dao.createProposal("Indenizar sinistro do NFT #0?");
    await propTx.wait();
    console.log("Proposta criada! Hash:", propTx.hash);

    // DAO - VOTAR 
    console.log("Votando na proposta...");
    const voteTx = await dao.vote(0); 
    await voteTx.wait();
    console.log("Voto registrado na Sepolia! Hash:", voteTx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});