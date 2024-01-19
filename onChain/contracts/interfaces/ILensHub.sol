// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../helpers/LensTypes.sol";

interface ILensHub {
    function createProfile(
        Types.CreateProfileParams calldata createProfileParams
    ) external returns (uint256);

    function post(
        Types.PostParams calldata postParams
    ) external returns (uint256);

    function balanceOf(address owner_) external returns (uint256);

    function ownerOf(uint256 tokenId_) external returns (address);

    function setProfileMetadataURIWithSig(
        uint256 profileId,
        string calldata metadataURI,
        Types.EIP712Signature calldata signature
    ) external;

    function setProfileMetadataURI(
        uint256 profileId,
        string calldata metadataURI
    ) external;

    function comment(Types.CommentParams calldata commentParams) external;

    function postWithSig(
        Types.PostParams calldata postParams,
        Types.EIP712Signature calldata signature
    ) external;

    function mirror(Types.MirrorParams calldata mirrorParams) external;

    function mirrorWithSig(
        Types.MirrorParams calldata mirrorParams,
        Types.EIP712Signature calldata signature
    ) external;

    function quote(Types.QuoteParams calldata quoteParams) external;

    function quoteWithSig(
        Types.QuoteParams calldata quoteParams,
        Types.EIP712Signature calldata signature
    ) external;

    function follow(
        uint256 followerProfileId,
        uint256[] calldata idsOfProfilesToFollow,
        uint256[] calldata followTokenIds,
        bytes[] calldata datas
    ) external;

    function followWithSig(
        uint256 followerProfileId,
        uint256[] calldata idsOfProfilesToFollow,
        uint256[] calldata followTokenIds,
        bytes[] calldata datas,
        Types.EIP712Signature calldata signature
    ) external;

    function unfollow(
        uint256 unfollowerProfileId,
        uint256[] calldata idsOfProfilesToUnfollow
    ) external;

    function unfollowWithSig(
        uint256 unfollowerProfileId,
        uint256[] calldata idsOfProfilesToUnfollow,
        Types.EIP712Signature calldata signature
    ) external;

    function isFollowing(
        uint256 followerProfileId,
        uint256 followedProfileId
    ) external view returns (bool);

    function getContentURI(
        uint256 profileId,
        uint256 pubId
    ) external view returns (string memory);

    function getProfile(
        uint256 profileId
    ) external view returns (Types.Profile memory);

    function getPublication(
        uint256 profileId,
        uint256 pubId
    ) external pure returns (Types.PublicationMemory memory);

    function tokenURI(uint256 tokenId) external view returns (string memory);
}
