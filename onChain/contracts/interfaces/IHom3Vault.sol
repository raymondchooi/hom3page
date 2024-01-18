// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IHom3Vault {
    event DepositedFunds(uint256 profileId_, uint256 amount_);
    event WithdrewFunds(uint256 profileId_, uint256 amount_);
    event SetSpendAllowance(
        uint256 profileId_,
        address spender_,
        uint256 amount_
    );
    event RevokedSpend(uint256 profileId_, address spender_);

    error NotOwnerOfProfile();
    error NotEnoughBalance();

    function depositFunds(uint256 profileId_, uint256 amount_) external;

    function withdrawFunds(uint256 profileId_, uint256 amount_) external;

    function setSpend(
        uint256 profileId_,
        address spender_,
        uint256 amount_
    ) external;

    function removeSpend(uint256 profileId_, address spender_) external;

    function getProfilesBalance(
        uint256 profileId_
    ) external view returns (uint256);

    function getSpendBalanceOfProfile(
        uint256 profileId,
        address spender_
    ) external view returns (uint256);
}
