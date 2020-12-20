async function main() {
    const MyCryptoNft = await hre.ethers.getContractFactory("MyCryptoNft");
    const myCryptoNft = await MyCryptoNft.deploy("MyCryptoNft", "MCN");
  
    await myCryptoNft.deployed();
  
    console.log("MyCryptoNft deployed to:", myCryptoNft.address);
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });