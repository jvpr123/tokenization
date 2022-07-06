import React, { useState } from "react";

function KYC({KycInstance}) {
  const [kycAddress, setKycAddress] = useState("");

  const handleKycSubmit = async () => {
    try {
        const currentAccount = await window.ethereum.request({ method: "eth_requestAccounts" });
        
        await KycInstance.methods.setKycCompleted(kycAddress).send({ from: currentAccount[0] });
        alert("Successfully whitelisted!");

        setKycAddress("");
    } catch (error) {
        alert("ERROR: Could not complete the whitelist transaction.");

        setKycAddress("");
        console.error(error);
    }
  }

  return (
    <fieldset>
      <h3>KYC Whitelisting</h3>
      
      <span>Address to allow: </span>
      <input 
        type="text" 
        name="kycAddress" 
        placeholder="Address" 
        value={ kycAddress } 
        onChange={ (event) => setKycAddress(event.target.value) }
      />
      <button type="button" onClick={ () => handleKycSubmit() }>Send</button>
    </fieldset>
  );
}

export default KYC;
