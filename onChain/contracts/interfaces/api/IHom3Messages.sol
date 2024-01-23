// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

interface IHom3Messages {
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

    struct Message {
        UpdateMessage update_;
        bytes32 returnMessageId_;
        uint256 value_;
        string message_;
        MessageActions action_;
        Errors errors_;
    }

    struct UpdateMessage {
        uint256 profileId_;
        address owner_;
        uint256 balance_;
    }
}
