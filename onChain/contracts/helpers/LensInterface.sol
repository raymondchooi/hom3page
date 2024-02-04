// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ILensHub} from "../interfaces/api/ILensHub.sol";
import {Types} from "../types/LensTypes.sol";

abstract contract LensInterface {
    ILensHub public immutable LENS_PROTOCOL;

    event CreatedLensProfile(address owner_, uint256 lensProfileId_);
    error FailedToCreateLensProfile();

    constructor(address lensHubAddress_) {
        LENS_PROTOCOL = ILensHub(lensHubAddress_);
    }

    function _getLensProfile(
        uint256 profileId_
    ) internal view returns (Types.Profile memory) {
        return LENS_PROTOCOL.getProfile(profileId_);
    }

    function _getLensBalance(address owner_) internal returns (uint256) {
        return LENS_PROTOCOL.balanceOf(owner_);
    }

    function _getOwnerOfLens(uint256 profileId_) internal returns (address) {
        return LENS_PROTOCOL.ownerOf(profileId_);
    }

    function _hasLensProfile(address owner_) internal returns (bool) {
        return _getLensBalance(owner_) > 0;
    }

    function _createProfileWithoutModula(
        address owner_
    ) internal returns (uint256) {
        uint256 lensProfileId = LENS_PROTOCOL.createProfile(
            Types.CreateProfileParams(owner_, address(0), abi.encode(0))
        );
        if (lensProfileId < 1) revert FailedToCreateLensProfile();
        emit CreatedLensProfile(owner_, lensProfileId);
        return lensProfileId;
    }

    function _createProfileWithModula(
        address owner_,
        address modualAddress_,
        bytes memory modualData_
    ) internal returns (uint256) {
        uint256 lensProfileId = LENS_PROTOCOL.createProfile(
            Types.CreateProfileParams(owner_, modualAddress_, modualData_)
        );
        if (lensProfileId < 1) revert FailedToCreateLensProfile();
        emit CreatedLensProfile(owner_, lensProfileId);
        return lensProfileId;
    }
}
