import React, { useEffect, useState } from "react";

function BuyTokens({coffeeTokenSaleInstance}) {
  const [buyTokensAddress, setBuyTokensAddress] = useState();

  useEffect(() => {
    if (coffeeTokenSaleInstance !== undefined) {  
        setBuyTokensAddress(coffeeTokenSaleInstance.options.address);
    }
  }, [coffeeTokenSaleInstance]);

  return (
    <fieldset>
      <h3>Buy Coffee Tokens</h3>
      <span>Address to buy Tokens: {buyTokensAddress}</span>
    </fieldset>
  );
}

export default BuyTokens;
