pragma solidity ^0.8.20;

import "../interfaces/IWallGenerator.sol";
import "../security/onlyActive.sol";
import "erc721a/contracts/ERC721A.sol";
import "../utils/ERC721AVotes.sol";
import "../tokens/InnerBlockToken.sol";
import "../tokens/stINRWLToken.sol";

contract WallGenerator is ERC721A, OnlyActive, IWallGenerator {
    ERC721AVotes public immutable BLOCK_TOKEN;
    ERC721A public immutable INNER_WALL_TOKEN;

    mapping(uint256 => WallStore) internal _wallStore;

    constructor(
        address blockTokenContract_
    ) ERC721A("Hom3Page WallGenerator", "WALL") Ownable(msg.sender) {
        BLOCK_TOKEN = ERC721AVotes(blockTokenContract_);
        INNER_WALL_TOKEN = new stINRWL();
    }

    function createFirstInnerWall(
        uint256 motherBlock_,
        CreateWallProps memory wallSetup_
    ) external override is_active {
        // Check that the call is the block owner
        // Check if the contract can spend the token
        _isSenderIsBlockOwner(_msgSender(), motherBlock_);

        if (BLOCK_TOKEN.getApproved(motherBlock_) != address(this))
            revert SpendNotApproved();

        // Transfer the token into the contract
        BLOCK_TOKEN.transferFrom(_msgSender(), address(this), motherBlock_);

        // Deploy the inner wall token contract
        ERC721A newWallContract = new InnerBlockToken(
            wallSetup_.wallName_,
            "INRWL",
            motherBlock_,
            1
        );
        // Create store object
        _wallStore[_nextTokenId()] = WallStore(
            1,
            motherBlock_,
            wallSetup_.wallName_,
            _msgSender(),
            address(BLOCK_TOKEN),
            address(newWallContract),
            true,
            wallSetup_.allowNWalls_
        );

        // Mint the wrapped token
        // Delegate vote to the owner
        _mint(_msgSender(), 1);
        BLOCK_TOKEN.delegate(_msgSender());
        emit NewInnerWallCreated(
            motherBlock_,
            address(BLOCK_TOKEN),
            1,
            address(newWallContract)
        );
    }

    function destroyInnerWall(
        address motherWall,
        uint256 motherBlock_
    ) external override is_active {}

    function delegateBlockVote(
        uint256 wallId_,
        address delegatee_
    ) external override {}

    function updateWallSetting() external override {}

    function _isSenderIsBlockOwner(
        address msgSender_,
        uint256 blockId_
    ) internal view {
        if (BLOCK_TOKEN.ownerOf(blockId_) != msgSender_) revert NotBlockOwner();
    }
}
