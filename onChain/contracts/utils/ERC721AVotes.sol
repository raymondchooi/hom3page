pragma solidity ^0.8.20;
import "erc721a/contracts/ERC721A.sol";
import {Votes} from "@openzeppelin/contracts/governance/utils/Votes.sol";

abstract contract ERC721Votes is ERC721A, Votes {
    /**
     * @dev Override function for 'transferFrom' to include Voting logic
     * @param from_ Address to transfer the token from
     * @param to_ Address tp receive the tokens
     * @param tokenId_ Token ID to transfer
     */
    function transferFrom(
        address from_,
        address to_,
        uint256 tokenId_
    ) public payable virtual override {
        super.transferFrom(from_, to_, tokenId_);

        _transferVotingUnits(from_, to_, 1);
    }

    /**
     * @dev oOverride function for '_mint' to include Voting logic
     * @param to_ address to mint the tokens to
     * @param quantity_ amount of tokens to mint
     */
    function _mint(address to_, uint256 quantity_) internal virtual override {
        super._mint(to_, quantity_);
        _transferVotingUnits(address(0x0), to_, quantity_);
    }

    /**
     * @dev Returns the balance of `account`.
     *
     * WARNING: Overriding this function will likely result in incorrect vote tracking.
weeks int    */
    function _getVotingUnits(
        address account
    ) internal view virtual override returns (uint256) {
        return balanceOf(account);
    }

}
