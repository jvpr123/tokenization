const env = require("../env");

const CoffeeToken = artifacts.require("CoffeeToken.sol");
const CoffeeTokenSale = artifacts.require("CoffeeTokenSale.sol");
const KYC = artifacts.require("KYC.sol");

module.exports = async (deployer) => {
    const [ownerAddress] = await web3.eth.getAccounts();
    const token = {
        initialSupply: env.tokensInitialSupply,
        rate: env.tokensRate,
    }

    /**
        * @param CoffeeToken points to the Token contract
        * @param token.initialSupply refers to the Tokens initial supply
     */
    await deployer.deploy(CoffeeToken, token.initialSupply);

     /**
        * @param KYC points to the KYC (Know Your Customer) contract
        * @dev a KYC contract will be applied here to validate token purchases
     */
    await deployer.deploy(KYC);

    /**
        * @param CoffeeTokenSale points to the contract which manages token selling stuff
        * @param token.rate refers to the ammount of wei required to purchase a token
        * @param ownerAddress refers to the wallet is going to receive funds raised
        * @param CoffeeToken.address points to the CoffeeToken Contract address
        * @param KYC.address points to the KYC Contract address
     */
     await deployer.deploy(CoffeeTokenSale, 1, ownerAddress, CoffeeToken.address, KYC.address);

    /**
        * @dev After deploying, it`s time to transfer all CoffeeToken initial supply
        * to CoffeeTokenSale contract, in order to make it able to distribute the tokens 
     */
     const instance = await CoffeeToken.deployed();
     await instance.transfer(CoffeeTokenSale.address, token.initialSupply);
}
