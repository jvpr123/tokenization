const CoffeeToken = artifacts.require("CoffeeToken.sol");

module.exports = async (deployer) => {
    await deployer.deploy(CoffeeToken, 500);
}
