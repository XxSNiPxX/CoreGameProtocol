// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library LibGameInfoStorage {
    bytes32 constant STORAGE_POSITION = keccak256("diamond.standard.game.info");

    struct SocialLinks {
        string twitter;
        string discord;
        string telegram;
        string youtube;
        string tiktok;
        string instagram;
    }

    struct GameMetadata {
        string name;
        string description;
        string genre;
        string imageURI;
        string gameLink;
        string website;
        string supportEmail;
        SocialLinks socials;
    }

    struct Layout {
        GameMetadata metadata;
        mapping(address => bool) authorizedUsers;
        address[] authorizedUserList;
        address diamondAddress;
    }

    function layout() internal pure returns (Layout storage s) {
        bytes32 pos = STORAGE_POSITION;
        assembly {
            s.slot := pos
        }
    }
}
