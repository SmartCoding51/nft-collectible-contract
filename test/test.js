const { expect } = require("chai");
const { utils } = require("ethers");

describe("NFT Collectible Test", function () {
  let nftContract;
  let owner, user1;
  before(async function(){
    const baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb";

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
    let txn = await nftContract.reserveNFTs();
    await txn.wait();
    console.log("10 NFTs have been reserved");

    // Get all token IDs of the owner
    const tokensOfOwner = await nftContract.tokensOfOwner(owner.address)
    console.log("Owner has tokens: ", tokensOfOwner);
    expect(tokensOfOwner.length).to.equal(10);
  });

  it("Mint 3 NFTs by sending 0.03 ether", async function () {
    txn = await nftContract
      .connect(user1)
      .mintNFTs(3, { 
        value: utils.parseEther('0.03') 
      });
    await txn.wait();

    // Get all tokens of user1
    const tokensOfUser1 = await nftContract.tokensOfOwner(user1.address)
    console.log("User1 has tokens: ", tokensOfUser1);
    expect(tokensOfUser1.length).to.equal(3);
  });

});