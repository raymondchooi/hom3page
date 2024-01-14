// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IInnerBlockFactory {
    struct InnerBlockStore {
        uint256 tokenId_;
        address owner_;
        address tokenContract_;
    }
}
