// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IHom3ProfileToken {
    event ProfileCreated(address owner_, uint256 profileId_);

    error NotOwnerOfProfile();
    error OneProfilePerAccount();

    function signUpAndCreateLens(address owner_) external;

    function signUpWithLens(address owner_, uint256 lensProfileId_) external;

    function assignLensProfile(
        uint256 profileId_,
        uint256 lensProfileId_
    ) external;
}
