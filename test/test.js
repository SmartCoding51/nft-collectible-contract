const { expect } = require("chai");
const { utils } = require("ethers");
require('dotenv').config();

describe("NFT Collectible Test", function () {
  let nftContract;
  let owner, user1;
  before(async function(){
    const baseTokenURI = process.env.BASE_TOKEN_URI;

    // Get owner/deployer's wallet address
    [owner, user1] = await hre.ethers.getSigners();

    // Get contract that we want to deploy
    const contractFactory = await hre.ethers.getContractFactory("NFTCollectible");

    // Deploy contract with the correct constructor arguments
    nftContract = await contractFactory.deploy(baseTokenURI);

    // Wait for this transaction to be mined
    await nftContract.deployed();

    // Get contract address
    console.log("Contract deployed to:", nftContract.address);
  });

  it("Reserve NFTs", async function () {
    await nftContract.reserveNFTs();

    // Get all token IDs of the owner
    const tokensOfOwner = await nftContract.tokensOfOwner(owner.address)
    expect(tokensOfOwner.length).to.equal(10);
  });

  it("Mint 3 NFTs by sending 0.03 ether", async function () {
    await nftContract
      .connect(user1)
      .mintNFTs(3, { 
        value: utils.parseEther('0.03') 
      });

    // Get all token IDs of user1
    const tokensOfUser1 = await nftContract.tokensOfOwner(user1.address)
    expect(tokensOfUser1.length).to.equal(3);
  });

});