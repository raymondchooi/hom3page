// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {CCIPChainSelectors} from "../helpers/CCIPInterface.sol";

abstract contract Hom3Constants is CCIPChainSelectors {
    uint64 public constant SALES_CONTRACT_CHAIN = MATIC_CHAIN_SELECTOR;
    uint64 public constant PROFILE_CONTRACT_CHAIN = MATIC_CHAIN_SELECTOR;
    uint64 public constant BLOCK_TOKEN_CHAIN = MATIC_CHAIN_SELECTOR;
}
