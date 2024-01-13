// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./security/onlyActive.sol";

contract NFTSalesContract is ReentrancyGuard, OnlyActive {
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

    function buyNFT(uint256 tokenId) public nonReentrant is_active {
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
            NFT.transferFrom(address(this), msg.sender, tokenId);
        }
    }

    function buyBatchNFTs(
        uint256[] calldata tokenIds
    ) public nonReentrant is_active {
        uint256 cost = COST_PER_BLOCK * (tokenIds.length);
        require(GHO.balanceOf(_msgSender()) > cost, "Incorrect payment");
        bool succsess = GHO.transferFrom(_msgSender(), address(this), cost);

        for (uint i = 0; i < tokenIds.length; i++) {
            require(
                NFT.ownerOf(tokenIds[i]) == address(this),
                "Token not available"
            );
            NFT.transferFrom(address(this), msg.sender, tokenIds[i]);
        }
    }

    function withdraw(address withdrawAddress_) public onlyOwner {
        uint balance = GHO.balanceOf(address(this));
        GHO.transfer(withdrawAddress_, balance);
    }

    // Additional functions like setting prices, handling auctions, etc., can be added here.
}
