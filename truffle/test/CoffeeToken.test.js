const CoffeeToken = artifacts.require("CoffeeToken");

const chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
const chaiAsPromised = require("chai-as-promised")

const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiBN);
chai.use(chaiAsPromised);

contract("Coffee Token", async (accounts) => {
    const [deployerAccount, recipient] = accounts;

    it("should have all tokens in contract owner`s account", async () => {
        let instance = await CoffeeToken.deployed();
        let totalSupply = await instance.totalSupply();

        // ---> USING CHAI ASSERT <---  
        // let balance = await instance.balanceOf(deployerAccount);
        // assert.equal(balance.valueOf(), totalSupply.valueOf(), "The balances do not match");

        // ---> USING CHAI EXPECT <---
        // expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(totalSupply);
        
        // ---> USING CHAI-AS-PROMISED <---
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("should allow sending tokens between accounts", async () => {
        let instance = await CoffeeToken.deployed();
        let totalSupply = await instance.totalSupply();

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, 1)).to.eventually.be.fulfilled;
    })

    it("should not allow sending more tokens than avaiable on supply", async () => {
        let instance = await CoffeeToken.deployed();
        let deployerBalance = await instance.balanceOf(deployerAccount);

        expect(instance.transfer(recipient, new BN(deployerBalance + 1))).to.be.rejected;
    })
});
