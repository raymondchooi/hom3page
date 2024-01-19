// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IHom3Profile {
    event ProfileCreated(address owner_, uint256 profileId_);

    error OneProfilePerAccount();

    function signUpAndCreateLens(address owner_) external;

    function signUpWithLens(address owner_, uint256 lensProfileId_) external;

    function blockPurchaseMint(address owner_) external;

    function _setLensProfile(
        uint256 profileId_,
        uint256 lensProfileId_
    ) external;
}
