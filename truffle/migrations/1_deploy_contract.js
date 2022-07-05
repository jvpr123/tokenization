require("dotenv").config({ path: "../.env" });

const CoffeeToken = artifacts.require("CoffeeToken.sol");
const CoffeeTokenSale = artifacts.require("CoffeeTokenSale.sol");

module.exports = async (deployer) => {
    const [ownerAddress] = await web3.eth.getAccounts();
    const token = {
        initialSupply: process.env.TOKENS_INITIAL_SUPPLY,
        rate: process.env.TOKENS_RATE,
    }

    /**
        * @param CoffeeToken points to the Token contract
        * @param token.initialSupply refers to the Tokens initial supply
     */
    await deployer.deploy(CoffeeToken, token.initialSupply);

    /**
        * @param CoffeeTokenSale points to the contract which manages token selling stuff
        * @param token.rate refers to the ammount of wei required to purchase a token
        * @param ownerAddress refers to the wallet is going to receive funds raised
        * @param CoffeeToken.address points to the token address
     */
     await deployer.deploy(CoffeeTokenSale, token.rate, ownerAddress, CoffeeToken.address);

    /**
        * @dev After deploying, it`s time to transfer all CoffeeToken initial supply
        * to CoffeeTokenSale contract, in order to make it able to distribute the tokens 
     */
     const instance = await CoffeeToken.deployed();
     await instance.transfer(CoffeeTokenSale.address, token.initialSupply);
}
