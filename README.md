# 🛡️ SecuritiTech: Protocolo de Seguro Descentralizado para RWA

## 🎯 Objetivo do Projeto
O SecuritiTech é um MVP de protocolo de seguro descentralizado focado em Ativos do Mundo Real (RWA). O objetivo é eliminar a opacidade e a lentidão dos seguros tradicionais utilizando a tecnologia blockchain para automatizar a custódia de ativos, a verificação de preços e a governança de indenizações.

O ecossistema integra quatro pilares fundamentais:
* **Tokenização (ERC-20)**: Representa o capital de liquidez e o poder de voto.
* **Ativos Digitais (ERC-721)**: Certificados únicos que representam a apólice de seguro de um bem físico.
* **Cofre de Staking**: Gerencia a reserva financeira com proteção contra ataques de reentrada e integração com oráculos.
* **Governança (DAO)**: Permite que apenas detentores de tokens decidam sobre a liberação de pagamentos de sinistros.

## 🏗️ Arquitetura Técnica
O protocolo foi desenvolvido em Solidity utilizando o framework Hardhat. As principais tecnologias incluem:
* **Chainlink Price Feeds**: Para obtenção de dados de mercado em tempo real diretamente no contrato.
* **OpenZeppelin**: Implementação de padrões de segurança como AccessControl, ReentrancyGuard e IERC20.
* **Ethers.js**: Scripting para automação de interações na rede Sepolia.

## 🚀 Passo a Passo para Rodar o Projeto

### 1. Pré-requisitos
Certifique-se de ter instalado:
* Node.js (v18+)
* NPM ou Yarn

### 2. Instalação
Clone o repositório e instale as dependências:
$ npm install

### 3. Configuração de Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto:
SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/SUA_CHAVE
PRIVATE_KEY=SUA_CHAVE_PRIVADA
ETHERSCAN_API_KEY=SUA_CHAVE_ETHERSCAN

### 4. Testes Automatizados
Execute a suite de testes locais para validar a integração dos contratos:
$ npx hardhat test

### 5. Deploy na Rede Sepolia
Para realizar o deploy de todos os contratos:
$ npx hardhat run scripts/deploy.js --network sepolia

### 6. Interação de Ponta a Ponta
Para rodar o script que executa o Mint do NFT, Stake de Tokens e Votação na DAO:
$ npx hardhat run scripts/interact_sepolia.js --network sepolia

## 🛡️ Auditoria e Segurança
* **ReentrancyGuard**: Implementado no StakingVault para prevenir drenagem de fundos durante saques.
* **AccessControl**: O SecurityToken utiliza papéis administrativos para controle de emissão (Mint).
* **Validação de Governança**: A SimpleDAO exige saldo positivo de SecurityToken para validar votos, prevenindo ataques de spam.
