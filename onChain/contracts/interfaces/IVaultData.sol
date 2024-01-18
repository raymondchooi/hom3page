// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IVaultData {
    event DepositedFunds(uint256 profileId_, uint256 amount_);
    event WithdrewFunds(uint256 profileId_, uint256 amount_);

    error NotOwnerOfProfile();
    error BalanceToLow();
    error VaultBalanceToLow();

    enum MessageActions {
        DEPOSIT,
        WITHDRAW,
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

    struct Message {
        bytes32 returnMessageId_;
        uint256 profileId_;
        uint256 value_;
        MessageActions action_;
        Errors errors_;
    }

    struct ActionStore {
        bytes32 messageId_;
        MessageActions action_;
    }
}
