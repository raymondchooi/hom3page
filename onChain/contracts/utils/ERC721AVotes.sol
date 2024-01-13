pragma solidity ^0.8.20;
import "erc721a/contracts/ERC721A.sol";
import {Votes} from "@openzeppelin/contracts/governance/utils/Votes.sol";

abstract contract ERC721AVotes is ERC721A, Votes {
    /**
     * @dev Override function for '_afterTokenTransfers' to include Voting logic
     * @param from_ Address to transfer the token from
     * @param to_ Address tp receive the tokens
     * @param firstTokenId_ Token ID to transfer
     * @param batchSize_ Amount of tokens in the transfer
     */
    function _afterTokenTransfers(
        address from_,
        address to_,
        uint256 firstTokenId_,
        uint256 batchSize_
    ) internal virtual override {
        _transferVotingUnits(from_, to_, batchSize_);
        super._afterTokenTransfers(from_, to_, firstTokenId_, batchSize_);
    }

    /**
     * @dev Returns the balance of `account`.
     *
     * WARNING: Overriding this function will likely result in incorrect vote tracking.
     */
    function _getVotingUnits(
        address account
    ) internal view virtual override returns (uint256) {
        return balanceOf(account);
    }
}
