// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library LibPassportStorage {
    bytes32 constant STORAGE_POSITION = keccak256("diamond.standard.passport.storage");

    struct Attribute {
        string trait_type; // e.g. "HP"
        string value; // e.g. "100"
        string display_type; // e.g. "boost_number"
        string uri; // Optional IPFS or offchain reference
    }

    struct MetadataField {
        string trait_type; // e.g. "bio", "website"
        string value; // e.g. "https://example.com"
        string uri; // Optional metadata (image, ref)
    }

    struct Layout {
        // Token metadata
        string name;
        string symbol;
        string baseTokenURI;
        uint256 nextTokenId;
        // ERC721 mappings
        mapping(uint256 => address) owners;
        mapping(address => uint256) balances;
        mapping(uint256 => address) tokenApprovals;
        mapping(address => mapping(address => bool)) operatorApprovals;
        mapping(address => uint256) walletToTokenId;
        // Game logic attributes (set by authorized core user)
        mapping(uint256 => Attribute[]) passportAttributes;
        mapping(string => Attribute) globalTemplateAttributes;
        string[] globalTraitKeys;
        // User social metadata (initialized from template, updatable by user)
        mapping(uint256 => MetadataField[]) userMetadata;
        mapping(string => MetadataField) globalUserMetadataTemplate;
        string[] globalUserMetadataKeys;
        // All passports are tracked
        address[] allPassportHolders;
        mapping(address => uint256) passportHolderIndex;
    }

    function layout() internal pure returns (Layout storage s) {
        bytes32 position = STORAGE_POSITION;
        assembly {
            s.slot := position
        }
    }
}
