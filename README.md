# NFT Collectible Smart Contract

This project demonstrates a simple Hardhat use case to write an NFT Collectible smart contract

## Setup

Follow the next steps to setup the repository:

- Install `node.js & npm` and Run `npm install`
- Create an enviroment file named `.env` and fill the next enviroment variables

```
# A wallet private key to be used to deploy on the testnets
PRIVATE_KEY=

# Add alchemy provider keys, alchemy takes preference at the config level
ALCHEMY_KEY=

# Optional Etherscan key, for automatize the verification of the contracts at Etherscan
ETHERSCAN_API_KEY=

# Base Token URI, the IPFS URL of the folder containing the JSON metadata
BASE_TOKEN_URI=

```

## Compilation & Test
```
npx hardhat compile

npx hardhat test

```

## Deployment on the Ropsten Testnet
npx hardhat run scripts/deploy.js --network ropsten

## Verification on Etherscan
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "BASE_TOKEN_URI"
