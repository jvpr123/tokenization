import React, { useEffect, useState } from "react";
import KYC from "./Components/KYC";
import { init } from "./Web3Client";

function App() {
  const [CoffeeTokenInstance, setCoffeTokenInstance] = useState();
  const [CoffeeTokenSaleInstance, setCoffeTokenSaleInstance] = useState();
  const [KycInstance, setKycInstance] = useState();

  useEffect(() => {
    init().then((contracts) => {
      setCoffeTokenInstance(contracts.CoffeeTokenInstance);
      setCoffeTokenSaleInstance(contracts.CoffeeTokenSaleInstance);
      setKycInstance(contracts.KycInstance);
    });
  }, []);

  return (
    <>
      <h1>Coffee Tokens</h1>

      <KYC props={ KycInstance }/>
    </>
  );
}

export default App;
