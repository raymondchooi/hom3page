// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./CCIPInterface.sol";
import {IHom3Vault, IVaultData} from "../interfaces/IHom3Vault.sol";

abstract contract Hom3PageMessaging is IVaultData {
    function _messageSwitch(
        MessageActions action_,
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        if (action_ == MessageActions.ERROR) _receiveError(any2EvmMessage);
        if (action_ == MessageActions.COMPLETE) {}
    }

    function _receiveError(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        Message memory message = abi.decode(any2EvmMessage.data, (Message));
    }
}
