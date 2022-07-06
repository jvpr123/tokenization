import Web3 from "web3";

import CoffeeToken from "./contracts/CoffeeToken.json";
import CoffeeTokenSale from "./contracts/CoffeeTokenSale.json";
import KYC from "./contracts/KYC.json";

let currentAccount;

export const init = async () => {
    let provider = window.ethereum;
    
    if (typeof provider !== "undefined") {
      provider
        .request( {method: "eth_requestAccounts"})
        .then(acc => {
            currentAccount = acc;
            alert(`Connected to account ${currentAccount}.`)
        })
        .catch(err => {
            currentAccount = undefined;
            alert('Could not connect to any account.');
            console.log(err);
        });

      window
        .ethereum
        .on("accountsChanged", (acc) => {
            currentAccount = acc;
            alert(`Account changed:\nConnected to account ${currentAccount}.`)
        })
    }

    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    const CoffeeTokenInstance = new web3.eth.Contract(
        CoffeeToken.abi, 
        CoffeeToken.networks[networkId].address
    ); 
}
