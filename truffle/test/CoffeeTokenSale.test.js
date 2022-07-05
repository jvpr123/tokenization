const CoffeeToken = artifacts.require("CoffeeToken");
const CoffeeTokenSale = artifacts.require("CoffeeTokenSale");

const BN = web3.utils.BN;
const chai = require("./chaisetup");
const expect = chai.expect;

contract("CoffeeTokenSale Contract", async (accounts) => {
    const [deployerAccount, recipient] = accounts;
    
    it("should have no tokens in deployer account", async () => {
        let coffeeTokenInstance = await CoffeeToken.deployed();
        let deployerBalance = await coffeeTokenInstance.balanceOf(deployerAccount);

        expect(deployerBalance.toNumber()).to.be.equal(0);
    });
    
    it("should have all tokens", async () => {
        let coffeeTokenInstance = await CoffeeToken.deployed();
        let totalSupply = await coffeeTokenInstance.totalSupply();
        let coffeeTokenSaleBalance = await coffeeTokenInstance.balanceOf(CoffeeTokenSale.address);

        expect(coffeeTokenSaleBalance.toNumber()).to.be.equal(totalSupply.toNumber());
    });
    
    it("should allow tokens purchase", async () => {
        let coffeeTokenInstance = await CoffeeToken.deployed();
        let coffeeTokenSaleInstance = await CoffeeTokenSale.deployed();

        await coffeeTokenSaleInstance.sendTransaction({ from: recipient, value: web3.utils.toWei("1", "wei") });
        
        expect(await coffeeTokenInstance.balanceOf(recipient)).to.be.a.bignumber.equal(new BN(1));
    });
});
