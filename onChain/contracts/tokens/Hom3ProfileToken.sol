// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../interfaces/IHom3Profile.sol";
import {OnlyActive, Ownable, Context} from "../security/onlyActive.sol";
import {ERC721, ERC721Votes} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract Hom3ProfileToken is ERC721Votes, OnlyActive, IHom3ProfileToken {
    constructor(
        string memory name_,
        string memory symbol_,
        string memory version_
    ) ERC721(name_, symbol_) EIP712(name_, version_) Ownable(msg.sender) {}


    function mintProfile(address owner_)external {
        
    }



}
