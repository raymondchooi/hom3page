// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC721A} from "../utils/ERC721AVotes.sol";
import {OnlyActive, Ownable} from "../security/onlyActive.sol";

contract InnerBlockToken is ERC721A, OnlyActive {
    uint256 public immutable WALL_LAYER;
    uint256 public immutable MOTHER_BLOCK;
    uint256 constant MAX_SUPPLY = 288;
    bool private _mintComplete;

    mapping(uint256 => address) internal _innerWall;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 motherBlock_,
        uint8 layer_
    ) ERC721A(name_, symbol_) Ownable(msg.sender) {
        WALL_LAYER = layer_;
        MOTHER_BLOCK = motherBlock_;
    }

    /**
     * @notice One time function to mint all the tokens to the sales contract
     */
    function mintNBlock(uint256 amount_) external onlyOwner {
        require(!_mintComplete);
        uint256 newSupply = totalSupply() + amount_;
        require(newSupply <= MAX_SUPPLY, "Exceeds Maximum Supply");

        if (newSupply == MAX_SUPPLY) {
            _mintComplete = true;
        }

        _mint(_msgSender(), amount_);
    }

    function mintInnerWall(uint256 blockId_) external is_active {
        // Allow the block owner to mint an inner wall.
        // Will deploy a new BLock contract fron a factory.
    }
}
