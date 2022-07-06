// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./Crowdsale.sol";
import "./KYC.sol";

contract CoffeeTokenSale is Crowdsale {
    KYC kyc;

    constructor(
        uint256 rate,
        address payable wallet,
        IERC20 token,
        KYC _kyc
    ) Crowdsale(rate, wallet, token) {
        kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(msg.sender), "KYC not completed: purchase not allowed.");
    }
}
