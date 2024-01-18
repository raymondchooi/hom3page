// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IVaultData} from "./IVaultData.sol";

interface IHom3DepositVault is IVaultData {
    function depositFunds(uint256 profileId_, uint256 amount_) external;

    function withdrawFunds(uint256 profileId_, uint256 amount_) external;

    function getProfileDespoited(
        uint256 profileId_
    ) external view returns (uint256);
}
