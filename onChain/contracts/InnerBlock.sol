// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./security/onlyActive.sol";

contract InnerBlockToken is ERC721A, OnlyActive {
    uint256 public immutable WALL_LAYER;
    uint256 constant MAX_SUPPLY = 288;
    bool private _mintComplete;

    mapping(uint256 => address) internal _innerWall;

    constructor(
        uint256 layer_
    ) ERC721A("Hom3Page Block", "AZUKI") Ownable(msg.sender) {
        WALL_LAYER = layer_;
    }

    /**
     * @notice One time function to mint all the tokens to the sales contract
     */
    function mintAllBlocks(address salesContract_) external onlyOwner {
        require(!_mintComplete);
        _mintComplete = true;

        _mint(salesContract_, MAX_SUPPLY);
    }

    function mintInnerWall(uint256 blockId_) external is_active {
        // Allow the block owner to mint an inner wall.
        // Will deploy a new BLock contract fron a factory.
    }
}
