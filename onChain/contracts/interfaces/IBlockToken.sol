pragma solidity ^0.8.20;

interface IBlockToken {
    error NotOwnerOfToken();
    error InnerWallNotEmpty();

    function mintAllBlocks(address salesContract_) external;

    function mintInnerWall(uint256 tokenId_) external;

    function burnInnerWall(uint256 tokenId_) external;
}
