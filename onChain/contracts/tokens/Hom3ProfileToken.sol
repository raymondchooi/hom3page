// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IHom3Profile.sol";
import {OnlyActive, Ownable} from "../security/onlyActive.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";

contract Hom3ProfileToken is ERC721Votes, OnlyActive, IHom3ProfileToken {
    constructor(
        string memory name_,
        string memory symbol_,
        string memory version_
    ) ERC721Votes(name_, symbol_) EIP712(name_, version_) Ownable(msg.sender) {}
}
