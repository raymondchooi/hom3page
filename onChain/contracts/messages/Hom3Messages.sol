// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../helpers/CCIPInterface.sol";
import {IHom3Messages} from "../interfaces/api/IHom3Messages.sol";

abstract contract Hom3Messages is CCIPInterface, IHom3Messages {
    constructor(
        address ccipRouter_,
        address linkToken_
    ) CCIPInterface(linkToken_, ccipRouter_) {}

    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    )
        internal
        virtual
        override
        onlyAllowlisted(
            any2EvmMessage.sourceChainSelector,
            abi.decode(any2EvmMessage.sender, (address))
        )
    {
        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector
        );
        Message memory message = abi.decode(any2EvmMessage.data, (Message));
        _messageSwitch(message.action_, any2EvmMessage);
    }

    function _messageSwitch(
        MessageActions action_,
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal {
        if (action_ == MessageActions.ERROR) _receiveError(any2EvmMessage);
        else if (action_ == MessageActions.DEPOSIT)
            _receiveDeposit(any2EvmMessage);
        else if (action_ == MessageActions.COMPLETE)
            _receiveComplete(any2EvmMessage);
        else if (action_ == MessageActions.WITHDRAW)
            _receiveWithdraw(any2EvmMessage);
        else if (action_ == MessageActions.TRANSFER)
            _receiveTransfer(any2EvmMessage);
    }

    function _receiveDeposit(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal virtual {}

    function _receiveWithdraw(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal virtual {}

    function _receiveTransfer(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal virtual {}

    function _receiveComplete(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal virtual {}

    function _receiveError(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal virtual {}
}
