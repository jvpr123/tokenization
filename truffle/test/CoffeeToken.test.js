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

    beforeEach(async () => {
        this.instance = await CoffeeToken.new(500);
        this.totalSupply = await this.instance.totalSupply();
    })

    it("should have all tokens in contract owner`s account", async () => {
        // ---> USING CHAI ASSERT <---  
        // let balance = await instance.balanceOf(deployerAccount);
        // assert.equal(balance.valueOf(), totalSupply.valueOf(), "The balances do not match");

        // ---> USING CHAI EXPECT <---
        // expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(totalSupply);
        
        // ---> USING CHAI-AS-PROMISED <---
        expect(this.instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(this.totalSupply);
    });
    
    it("should not allow sending more tokens than avaiable on supply", async () => {
        expect(this.instance.transfer(recipient, (new BN(this.totalSupply + 1)))).to.eventually.be.rejected;
    })

    it("should allow sending tokens between accounts", async () => {
        expect(this.instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(this.totalSupply);
        expect(this.instance.transfer(recipient, 1)).to.eventually.be.fulfilled;
        
        expect(this.instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(1));
        expect(this.instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(this.totalSupply - 1));
    })
});
