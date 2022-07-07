require("dotenv").config();

module.exports = {
    tokensInitialSupply: process.env.TOKENS_INITIAL_SUPPLY,
    tokensRate: process.env.TOKENS_RATE,
    mnemonic: process.env.MNEMONIC,
    accountIndex: process.env.ACCOUNT_INDEX,
}
