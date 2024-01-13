pragma solidity ^0.8.20;

import "./security/onlyActive.sol";

contract WallGenerator is OnlyActive {
    constructor() Ownable(msg.sender) {}
}
