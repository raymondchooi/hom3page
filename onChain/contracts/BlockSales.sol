// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./security/onlyActive.sol";
import "./interfaces/IBlockSale.sol";

contract BlockSales is ReentrancyGuard, OnlyActive, IBlockSale {
    IERC721 public immutable NFT;
    IERC20 public immutable GHO;

    //  Set token cost to 100 $GHO
    uint256 public constant COST_PER_BLOCK = 100 * 10 ** 18;

    uint256 internal _totalSold;

    constructor(
        address NFTAddress_,
        address ghoTokenAddress_
    ) Ownable(msg.sender) {
        NFT = IERC721(NFTAddress_);
        GHO = IERC20(ghoTokenAddress_);
    }

    fallback() external payable {
        revert("BlockSales : [fallback] - We don't want your ETH");
    }

    receive() external payable {
        revert("BlockSales : [receive] - You can keep you tokens");
    }

    function buyBlock(
        uint256 tokenId
    ) external override nonReentrant is_active {
        require(NFT.ownerOf(tokenId) == address(this), "Token not available");
        require(
            GHO.balanceOf(_msgSender()) > COST_PER_BLOCK,
            "Incorrect payment"
        );
        bool succsess = GHO.transferFrom(
            _msgSender(),
            address(this),
            COST_PER_BLOCK
        );
        if (succsess) {
            NFT.transferFrom(address(this), _msgSender(), tokenId);
            _totalSold++;
            emit SaleMade(_msgSender(), 1);
        }
    }

    function buyBatchBlock(
        uint256[][] calldata tokenIds_
    ) external override nonReentrant is_active {
        (uint totalOrder, uint index, uint numElements) = (
            0,
            0,
            tokenIds_.length
        );

        if (numElements > 5) revert ToManyElementsInBuyArray();

        unchecked {
            while (totalOrder < 10 && index < numElements) {
                totalOrder = tokenIds_[index].length;
                index++;
            }
            if (totalOrder > 10) revert OrderToLargeMax10();
        }

        uint256 cost = COST_PER_BLOCK * (totalOrder);
        require(GHO.balanceOf(_msgSender()) >= cost, "Insufficient Funds");

        bool succsess = GHO.transferFrom(_msgSender(), address(this), cost);
        if (succsess) {
            for (uint i = 0; i < numElements; i++) {
                for (uint x = 0; x < tokenIds_[i].length; x++)
                    NFT.transferFrom(
                        address(this),
                        msg.sender,
                        tokenIds_[i][x]
                    );
            }
            _totalSold += totalOrder;
            emit SaleMade(_msgSender(), totalOrder);
        }
    }

    function withdrawFunds(address withdrawAddress_) external onlyOwner {
        uint balance = GHO.balanceOf(address(this));
        GHO.transfer(withdrawAddress_, balance);
    }

    function withdrawBlock(
        address withdrawAddress_,
        uint256 tokenId_
    ) external override onlyOwner {}

    function getBlockCost() public pure returns (uint256) {
        return COST_PER_BLOCK;
    }

    function getTotalSold() public view returns (uint256) {
        return _totalSold;
    }
}
