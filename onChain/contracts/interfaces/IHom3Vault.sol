// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IVaultData} from "./IVaultData.sol";

interface IHom3Vault is IVaultData {
    event SetSpendAllowance(uint256 profileId_, uint256 amount_);
    event SetSpender(uint256 profileId_, address spender_);

    error NotATrustedSpender();
    error AllowanceToLow();

    function spend(
        uint256 profileId_,
        uint256 amount_,
        bytes calldata calldata_
    ) external;

    function depositFunds(uint256 profileId_, uint256 amount_) external;

    function withdrawFunds(uint256 profileId_, uint256 amount_) external;

    function setSpend(uint256 profileId_, uint256 amount_) external;

    function setSpender(uint256 profileId_, address spender_) external;

    function removeSpend(uint256 profileId_) external;

    function removeSpender(uint256 profileId_) external;

    function getProfilesBalance(
        uint256 profileId_
    ) external view returns (uint256);

    function getSpendBalanceOfProfile(
        uint256 profileId
    ) external view returns (uint256);
}
