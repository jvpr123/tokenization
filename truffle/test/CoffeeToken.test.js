const CoffeeToken = artifacts.require("CoffeeToken");

const BN = web3.utils.BN;
const chai = require("./chaisetup");
const expect = chai.expect;

contract("CoffeeToken Contract", async (accounts) => {
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
        let deployerBalance = await this.instance.balanceOf(deployerAccount);
        let totalSupply = await this.instance.totalSupply();

        expect(deployerBalance.toNumber()).to.be.equal(totalSupply.toNumber());
    });
    
    it("should allow sending tokens between accounts", async () => {
        expect(await this.instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(this.totalSupply);
        
        await this.instance.transfer(recipient, 1);
        
        expect(await this.instance.balanceOf(recipient)).to.be.a.bignumber.equal(new BN(1));
        expect(await this.instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(new BN(this.totalSupply - 1));
    })
    
    it("should not allow sending more tokens than avaiable on supply", async () => {
        expect(this.instance.transfer(recipient, (new BN(this.totalSupply + 1)))).to.eventually.be.rejected;
    })
});
