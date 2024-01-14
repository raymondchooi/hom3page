pragma solidity ^0.8.20;
import "erc721a/contracts/IERC721A.sol";

interface IWallGenerator is IERC721A {
    error NotBlockOwner();
    error SpendNotApproved();

    event NewInnerWallCreated(
        uint256 indexed motherBlock_,
        address indexed motherWall_,
        uint256 wallLayer_,
        address newWallContract_
    );
    struct WallStore {
        uint256 wallLayer_;
        uint256 motherBlock_;
        string wallName_;
        address owner_;
        address motherWall_;
        address newWallContract;
        bool active_;
        bool allowNWalls_;
    }

    struct CreateWallProps {
        bool allowNWalls_;
        string wallName_;
    }

    /**
     * @notice Allows owner of a block to generate the first Inner Wall
     * @param motherBlock_ token Id of the mother block
     */
    function createFirstInnerWall(
        uint256 motherBlock_,
        CreateWallProps memory wallSetup_
    ) external;

    function destroyInnerWall(
        address motherWall,
        uint256 motherBlock_
    ) external;

    function delegateBlockVote(uint256 wallId_, address delegatee_) external;
}
