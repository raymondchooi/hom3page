// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/api/IHom3Messages.sol";

interface Hom3Types {
    event DepositedFundsRequested(
        bytes32 indexed messageId_,
        uint256 indexed profileId_,
        uint256 indexed amount_
    );
    event DepositedFunds(uint256 indexed profileId_, uint256 indexed amount_);
    event WithdrewFunds(uint256 indexed profileId_, uint256 indexed amount_);
    event WithdrewFundsRequested(
        bytes32 indexed messageId_,
        uint256 indexed profileId_,
        uint256 indexed amount_
    );

    event ProfileOwnershipTransferred(uint256 profileId_, address to_);

    error NotOwnerOfProfile();
    error BalanceToLow();
    error VaultBalanceToLow();

    struct PastMessage {
        IHom3Messages.Message message_;
        bool fullFilled_;
    }

    struct ActionStore {
        bytes32 messageId_;
        IHom3Messages.MessageActions action_;
    }
}
