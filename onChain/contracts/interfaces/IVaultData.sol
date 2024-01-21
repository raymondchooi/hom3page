// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IVaultData {
    event DepositedFundsRequested(
        bytes32 messageId_,
        uint256 profileId_,
        uint256 amount_
    );
    event DepositedFunds(uint256 profileId_, uint256 amount_);
    event WithdrewFunds(uint256 profileId_, uint256 amount_);
    event WithdrewFundsRequested(
        bytes32 messageId_,
        uint256 profileId_,
        uint256 amount_
    );

    event ProfileOwnershipTransferred(uint256 profileId_, address to_);

    error NotOwnerOfProfile();
    error BalanceToLow();
    error VaultBalanceToLow();

    enum MessageActions {
        DEPOSIT,
        WITHDRAW,
        TRANSFER,
        ERROR,
        COMPLETE
    }

    enum Errors {
        NO_ERROR,
        BALANCE_TO_LOW,
        UNKNOWN_ERROR,
        ALREADY_EXECUTED
    }

    struct PastMessage {
        Message message_;
        bool fullFilled_;
    }

    struct UpdateMessage {
        uint256 profileId_;
        address owner_;
        uint256 balance_;
    }

    struct Message {
        MessageActions action_;
        Errors errors_;
        string message_;
        UpdateMessage update_;
        bytes32 returnMessageId_;
        uint256 value_;
    }

    struct ActionStore {
        bytes32 messageId_;
        MessageActions action_;
    }
}
