// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library LibInventoryStorage {
    bytes32 constant STORAGE_POSITION = keccak256("diamond.standard.inventory.storage");

    struct Attribute {
        string trait_type; // e.g. "Damage"
        string value; // e.g. "10"
        string display_type; // e.g. "number" or "boost_number"
    }

    struct ItemAttribute {
        uint256 tokenId;
        string name; // e.g. "Sword"
        string description; // Optional
        string imageURI; // e.g. ipfs://.../sword.png
        Attribute[] attributes; // OpenSea-style traits
    }

    struct Layout {
        // Item storage
        mapping(uint256 => ItemAttribute) itemAttributes;
        mapping(uint256 => bool) itemExists;
        uint256[] allItemIds;
        // Balances of each user for each item
        mapping(address => mapping(uint256 => uint256)) balances;
        // Operator approvals
        mapping(address => mapping(address => bool)) operatorApprovals;
        string baseTokenURI;
    }

    function layout() internal pure returns (Layout storage s) {
        bytes32 position = STORAGE_POSITION;
        assembly {
            s.slot := position
        }
    }
}
