const { expect } = require("chai");

describe("MyCryptoNft", function () {
  it("Should return the right name and symbol", async function () {
    const MyCryptoLions = await hre.ethers.getContractFactory("MyCryptoNft");
    const myCryptoLions = await MyCryptoLions.deploy("MyCryptoNft", "MCN");

    await myCryptoLions.deployed();
    expect(await myCryptoLions.name()).to.equal("MyCryptoNft");
    expect(await myCryptoLions.symbol()).to.equal("MCN");
  });
});