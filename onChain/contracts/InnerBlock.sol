// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./utils/ERC721AVotes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./security/onlyActive.sol";

contract InnerBlockToken is ERC721AVotes, OnlyActive {
    uint256 public immutable WALL_LAYER;
    uint256 public immutable MOTHER_BLOCK;
    uint256 constant MAX_SUPPLY = 288;
    bool private _mintComplete;

    mapping(uint256 => address) internal _innerWall;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory version_,
        uint256 motherBlock_,
        uint8 layer_
    ) ERC721A(name_, symbol_) Ownable(msg.sender) EIP712(name_, version_) {
        WALL_LAYER = layer_;
        MOTHER_BLOCK = motherBlock_;
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
