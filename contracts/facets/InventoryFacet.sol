// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {LibInventoryStorage} from "../libraries/LibInventoryStorage.sol";
import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
import {IERC1155MetadataURI} from "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol"; // Import the correct interface

contract InventoryFacet is IERC1155, IERC1155MetadataURI {
    using LibInventoryStorage for LibInventoryStorage.Layout;
    using LibInventoryStorage for LibInventoryStorage.ItemAttribute;
    using LibInventoryStorage for LibInventoryStorage.Attribute;

    event ItemTransferredBatch(address indexed from, address indexed to, uint256[] tokenIds, uint256[] amounts);
    event ItemAdded(uint256 indexed tokenId, string name);
    event ItemUpdated(uint256 indexed tokenId);
    event ItemRemoved(uint256 indexed tokenId);
    event BalanceSet(address indexed user, uint256 indexed tokenId, uint256 amount);
    event ItemMinted(address indexed to, uint256 indexed tokenId, uint256 amount);
    event ItemsMinted(address indexed to, uint256[] tokenIds, uint256[] amounts);

    event ItemTransferred(address indexed from, address indexed to, uint256 indexed tokenId, uint256 amount);

    modifier onlyCoreAuthorized() {
        require(LibDiamond.isAuthorized(msg.sender), "Not authorized");
        _;
    }

    // ERC-1155 standard functions

    function balanceOf(address account, uint256 tokenId) public view override returns (uint256) {
        return LibInventoryStorage.layout().balances[account][tokenId];
    }

    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids) external view override returns (uint256[] memory balances) {
        require(accounts.length == ids.length, "Length mismatch");
        balances = new uint256[](accounts.length);
        for (uint256 i = 0; i < accounts.length; i++) {
            balances[i] = balanceOf(accounts[i], ids[i]);
        }
        return balances;
    }

    function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes calldata data) public override {
        require(from != address(0), "From address cannot be zero");
        require(to != address(0), "To address cannot be zero");
        require(value > 0, "Value must be greater than 0");

        _transfer(from, to, id, value);

        // If `to` is a contract, ensure it can handle ERC1155 tokens
        if (isContract(to)) {
            bytes4 retval = IERC1155Receiver(to).onERC1155Received(msg.sender, from, id, value, data);
            require(retval == IERC1155Receiver.onERC1155Received.selector, "ERC1155: Receiver rejected tokens");
        }
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) public override {
        require(ids.length == amounts.length, "Ids and amounts mismatch");

        for (uint256 i = 0; i < ids.length; i++) {
            safeTransferFrom(from, to, ids[i], amounts[i], data);
        }

        // If `to` is a contract, ensure it can handle ERC1155 tokens
        if (isContract(to)) {
            IERC1155Receiver(to).onERC1155BatchReceived(msg.sender, from, ids, amounts, data);
        }
        emit ItemTransferredBatch(from, to, ids, amounts);
    }

    function setApprovalForAll(address operator, bool approved) public override {
        LibInventoryStorage.Layout storage s = LibInventoryStorage.layout();
        s.operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address account, address operator) public view override returns (bool) {
        return LibInventoryStorage.layout().operatorApprovals[account][operator];
    }

    // Implement ERC-1155 Metadata URI function
    function uri(uint256 tokenId) external view override returns (string memory) {
        LibInventoryStorage.Layout storage s = LibInventoryStorage.layout();
        if (!s.itemExists[tokenId]) {
            return "";
        }
        return string(abi.encodePacked(s.baseTokenURI, _toString(tokenId)));
    }

    // Helper function to check if an address is a contract
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    // Internal functions for transfers
    function _transfer(address from, address to, uint256 tokenId, uint256 amount) internal {
        require(LibInventoryStorage.layout().balances[from][tokenId] >= amount, "Insufficient balance");
        LibInventoryStorage.layout().balances[from][tokenId] -= amount;
        LibInventoryStorage.layout().balances[to][tokenId] += amount;
        emit ItemTransferred(from, to, tokenId, amount);
    }

    // Implement batch minting of items
    function mint(address to, uint256 tokenId, uint256 amount) external onlyCoreAuthorized {
        LibInventoryStorage.Layout storage s = LibInventoryStorage.layout();

        s.balances[to][tokenId] += amount;

        if (!s.itemExists[tokenId]) {
            s.itemExists[tokenId] = true;
            s.allItemIds.push(tokenId);
        }
        emit ItemMinted(to, tokenId, amount);
    }

    function mintBatch(address to, uint256[] calldata tokenIds, uint256[] calldata amounts) external onlyCoreAuthorized {
        require(tokenIds.length == amounts.length, "Ids and amounts mismatch");

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            uint256 amount = amounts[i];

            LibInventoryStorage.Layout storage s = LibInventoryStorage.layout();
            s.balances[to][tokenId] += amount;
            if (!s.itemExists[tokenId]) {
                s.itemExists[tokenId] = true;
                s.allItemIds.push(tokenId);
            }
        }
        emit ItemsMinted(to, tokenIds, amounts);
    }

    // Implement other necessary functions for adding, updating, and removing items
    function addItem(
        uint256 tokenId,
        string calldata name,
        string calldata description,
        string calldata imageURI,
        LibInventoryStorage.Attribute[] calldata attributes
    ) external onlyCoreAuthorized {
        require(attributes.length > 0, "Attributes cannot be empty");
        LibInventoryStorage.Layout storage s = LibInventoryStorage.layout();
        require(!s.itemExists[tokenId], "Item already exists");

        LibInventoryStorage.ItemAttribute storage item = s.itemAttributes[tokenId];
        item.name = name;
        item.description = description;
        item.imageURI = imageURI;

        for (uint i = 0; i < attributes.length; i++) {
            item.attributes.push(attributes[i]);
        }

        s.itemExists[tokenId] = true;
        s.allItemIds.push(tokenId);

        emit ItemAdded(tokenId, name);
    }

    function updateItem(
        uint256 tokenId,
        string calldata name,
        string calldata description,
        string calldata imageURI,
        LibInventoryStorage.Attribute[] calldata attributes
    ) external onlyCoreAuthorized {
        LibInventoryStorage.Layout storage s = LibInventoryStorage.layout();
        require(s.itemExists[tokenId], "Item doesn't exist");

        LibInventoryStorage.ItemAttribute storage item = s.itemAttributes[tokenId];
        item.name = name;
        item.description = description;
        item.imageURI = imageURI;

        delete item.attributes;
        for (uint i = 0; i < attributes.length; i++) {
            item.attributes.push(attributes[i]);
        }

        emit ItemUpdated(tokenId);
    }

    function removeItem(uint256 tokenId) external onlyCoreAuthorized {
        LibInventoryStorage.Layout storage s = LibInventoryStorage.layout();
        require(s.itemExists[tokenId], "Item doesn't exist");

        delete s.itemAttributes[tokenId];
        s.itemExists[tokenId] = false;

        for (uint256 i = 0; i < s.allItemIds.length; i++) {
            if (s.allItemIds[i] == tokenId) {
                s.allItemIds[i] = s.allItemIds[s.allItemIds.length - 1];
                s.allItemIds.pop();
                break;
            }
        }

        emit ItemRemoved(tokenId);
    }

    // Helper function to convert uint256 to string
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function getUserItems(address user) external view returns (uint256[] memory itemIds, uint256[] memory balances) {
        LibInventoryStorage.Layout storage s = LibInventoryStorage.layout();

        uint256 itemCount = s.allItemIds.length;
        itemIds = new uint256[](itemCount);
        balances = new uint256[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 itemId = s.allItemIds[i];
            itemIds[i] = itemId;
            balances[i] = s.balances[user][itemId];
        }
    }

    function getItem(
        uint256 tokenId
    )
        external
        view
        returns (string memory name, string memory description, string memory imageURI, LibInventoryStorage.Attribute[] memory attributes)
    {
        LibInventoryStorage.Layout storage s = LibInventoryStorage.layout();

        require(s.itemExists[tokenId], "Item doesn't exist");

        LibInventoryStorage.ItemAttribute storage item = s.itemAttributes[tokenId];
        return (item.name, item.description, item.imageURI, item.attributes);
    }

    function getAllItems()
        external
        view
        returns (string[] memory names, string[] memory descriptions, string[] memory imageURIs, uint256[] memory tokenIds)
    {
        LibInventoryStorage.Layout storage s = LibInventoryStorage.layout();
        uint256 itemCount = s.allItemIds.length;

        names = new string[](itemCount);
        descriptions = new string[](itemCount);
        imageURIs = new string[](itemCount);
        tokenIds = new uint256[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 id = s.allItemIds[i];
            LibInventoryStorage.ItemAttribute storage item = s.itemAttributes[id];

            tokenIds[i] = id;
            names[i] = item.name;
            descriptions[i] = item.description;
            imageURIs[i] = item.imageURI;
        }
    }

    function getAllItemIds() external view returns (uint256[] memory) {
        return LibInventoryStorage.layout().allItemIds;
    }

    // Implement the supportsInterface function from IERC165
    function supportsInterface(bytes4 interfaceId) external pure override returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC165).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId;
    }
}
