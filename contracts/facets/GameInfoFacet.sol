// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {LibGameInfoStorage} from "../libraries/LibGameInfoStorage.sol";

contract GameInfoFacet {
    using LibGameInfoStorage for LibGameInfoStorage.Layout;

    event GameMetadataUpdated(string name, string description, string genre, string imageURI);
    event GameLinksUpdated(string gameLink, string website, string supportEmail);
    event SocialLinksUpdated(string twitter, string discord, string telegram, string youtube, string tiktok, string instagram);
    event AuthorizedUserUpdated(address indexed user, bool isAuthorized);

    modifier onlyOwner() {
        LibDiamond.enforceIsContractOwner();
        _;
    }

    modifier onlyAuthorized() {
        LibGameInfoStorage.Layout storage s = LibGameInfoStorage.layout();
        require(msg.sender == LibDiamond.contractOwner() || s.authorizedUsers[msg.sender], "Not authorized");
        _;
    }

    // ------------------- Game Metadata -------------------

    function setBasicGameMetadata(string memory name, string memory description, string memory genre, string memory imageURI) external onlyOwner {
        LibGameInfoStorage.Layout storage s = LibGameInfoStorage.layout();
        s.metadata.name = name;
        s.metadata.description = description;
        s.metadata.genre = genre;
        s.metadata.imageURI = imageURI;
        emit GameMetadataUpdated(name, description, genre, imageURI);
    }

    function setGameLinks(string memory gameLink, string memory website, string memory supportEmail) external onlyOwner {
        LibGameInfoStorage.Layout storage s = LibGameInfoStorage.layout();
        s.metadata.gameLink = gameLink;
        s.metadata.website = website;
        s.metadata.supportEmail = supportEmail;
        emit GameLinksUpdated(gameLink, website, supportEmail);
    }

    function setSocialLinks(
        string memory twitter,
        string memory discord,
        string memory telegram,
        string memory youtube,
        string memory tiktok,
        string memory instagram
    ) external onlyOwner {
        LibGameInfoStorage.Layout storage s = LibGameInfoStorage.layout();
        s.metadata.socials = LibGameInfoStorage.SocialLinks({
            twitter: twitter,
            discord: discord,
            telegram: telegram,
            youtube: youtube,
            tiktok: tiktok,
            instagram: instagram
        });
        emit SocialLinksUpdated(twitter, discord, telegram, youtube, tiktok, instagram);
    }

    function getGameMetadata()
        external
        view
        returns (
            string memory name,
            string memory description,
            string memory genre,
            string memory imageURI,
            string memory gameLink,
            string memory website,
            string memory supportEmail,
            LibGameInfoStorage.SocialLinks memory socials
        )
    {
        LibGameInfoStorage.Layout storage s = LibGameInfoStorage.layout();
        LibGameInfoStorage.GameMetadata storage meta = s.metadata;
        return (meta.name, meta.description, meta.genre, meta.imageURI, meta.gameLink, meta.website, meta.supportEmail, meta.socials);
    }

    // ------------------- Authorization -------------------

    function addAuthorizedUser(address user) external onlyOwner {
        LibGameInfoStorage.Layout storage s = LibGameInfoStorage.layout();
        if (!s.authorizedUsers[user]) {
            s.authorizedUsers[user] = true;
            s.authorizedUserList.push(user);
        }
        emit AuthorizedUserUpdated(user, true);
    }

    function removeAuthorizedUser(address user) external onlyOwner {
        LibGameInfoStorage.Layout storage s = LibGameInfoStorage.layout();
        if (s.authorizedUsers[user]) {
            s.authorizedUsers[user] = false;
            // Optional: remove from user list if you need strict cleanup
        }
        emit AuthorizedUserUpdated(user, false);
    }

    function isAuthorized(address user) external view returns (bool) {
        LibGameInfoStorage.Layout storage s = LibGameInfoStorage.layout();
        return user == LibDiamond.contractOwner() || s.authorizedUsers[user];
    }

    function getAuthorizedUsers() external view returns (address[] memory) {
        return LibGameInfoStorage.layout().authorizedUserList;
    }
}
