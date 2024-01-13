pragma solidity ^0.8.20;

interface IWallGenerator {
    struct WallStore {
        address owner_;
        uint256 motherBlock_;
        address wallLayer_;
    }
}
