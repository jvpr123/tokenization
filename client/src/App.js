import React, { useEffect } from "react";
import Web3 from "web3";
import { init } from "./Web3Client";

import CoffeeToken from "./contracts/CoffeeToken.json";
import CoffeeTokenSale from "./contracts/CoffeeTokenSale.json";
import KYC from "./contracts/KYC.json";

function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <h2>Hello</h2>
    </>
  );
}

export default App;
