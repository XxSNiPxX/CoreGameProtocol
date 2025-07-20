// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {LibPassportStorage} from "../libraries/LibPassportStorage.sol";
import {LibInventoryStorage} from "../libraries/LibInventoryStorage.sol";
import {IERC721Receiver} from "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "hardhat/console.sol"; // Only for Hardhat local testing

contract PassportFacet is IERC721, IERC721Metadata {
    using LibPassportStorage for LibPassportStorage.Layout;

    modifier onlyCoreAuthorized() {
        require(LibDiamond.isAuthorized(msg.sender), "Not authorized");
        _;
    }

    event PassportMinted(address indexed user, uint256 indexed tokenId);
    event PassportTransferred(address indexed from, address indexed to, uint256 indexed tokenId);
    event PassportApproved(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event BaseTokenURISet(string uri);
    event PassportAttributesUpdated(uint256 indexed tokenId);
    event UserMetadataUpdated(uint256 indexed tokenId);
    event GlobalAttributesSet();
    event GlobalUserMetadataTemplateSet();
    event ItemTransferred(address indexed from, address indexed to, uint256 indexed tokenId, uint256 amount);
    event PassportMintedBatch(address indexed user, uint256[] tokenIds);
    event PassportTransferredBatch(address indexed from, address indexed to, uint256[] tokenIds);
    event PassportBurned(address indexed user, uint256 indexed tokenId);

    function supportsInterface(bytes4 interfaceId) external pure override returns (bool) {
        return interfaceId == type(IERC721).interfaceId || interfaceId == type(IERC721Metadata).interfaceId;
    }

    function _isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }

    function name() external view override returns (string memory) {
        return LibPassportStorage.layout().name;
    }

    function symbol() external view override returns (string memory) {
        return LibPassportStorage.layout().symbol;
    }

    function _checkERC721Received(address operator, address from, address to, uint256 tokenId, bytes memory data) internal {
        if (_isContract(to)) {
            try IERC721Receiver(to).onERC721Received(operator, from, tokenId, data) returns (bytes4 retval) {
                require(retval == IERC721Receiver.onERC721Received.selector, "ERC721: receiver rejected tokens");
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert("ERC721: transfer to non ERC721Receiver implementer");
                } else {
                    assembly {
                        revert(add(reason, 32), mload(reason))
                    }
                }
            }
        }
    }

    function balanceOf(address owner) public view override returns (uint256) {
        return LibPassportStorage.layout().balances[owner];
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        return LibPassportStorage.layout().owners[tokenId];
    }

    function getTokenIdForWallet(address user) external view returns (uint256) {
        return LibPassportStorage.layout().walletToTokenId[user];
    }

    function approve(address to, uint256 tokenId) external override {
        address owner = ownerOf(tokenId);
        console.log(to, owner);
        bool isOperator = isApprovedForAll(owner, msg.sender);
        console.log(isOperator, "isOperator");

        require(to != owner, "Approval to current owner");
        require(msg.sender == owner || isOperator, "Not authorized");

        LibPassportStorage.layout().tokenApprovals[tokenId] = to;
        emit PassportApproved(owner, to, tokenId);
    }

    function getApproved(uint256 tokenId) public view override returns (address) {
        return LibPassportStorage.layout().tokenApprovals[tokenId];
    }

    function isApprovedForAll(address owner, address operator) public view override returns (bool) {
        return LibPassportStorage.layout().operatorApprovals[owner][operator];
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not authorized");

        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) external override {
        transferFrom(from, to, tokenId);
        _checkERC721Received(msg.sender, from, to, tokenId, "");
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external override {
        transferFrom(from, to, tokenId);
        _checkERC721Received(msg.sender, from, to, tokenId, data);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return string(abi.encodePacked(LibPassportStorage.layout().baseTokenURI, _toString(tokenId)));
    }

    function setApprovalForAll(address operator, bool approved) external override {
        LibPassportStorage.layout().operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function mint() external {
        LibPassportStorage.Layout storage s = LibPassportStorage.layout();
        require(s.walletToTokenId[msg.sender] == 0, "Already minted");

        uint256 tokenId = ++s.nextTokenId;
        s.walletToTokenId[msg.sender] = tokenId;
        s.owners[tokenId] = msg.sender;
        s.balances[msg.sender]++;

        // Add the user's address to the allPassportHolders array
        s.allPassportHolders.push(msg.sender);
        s.passportHolderIndex[msg.sender] = s.allPassportHolders.length - 1;

        // Set global attributes and metadata
        for (uint i = 0; i < s.globalTraitKeys.length; i++) {
            s.passportAttributes[tokenId].push(s.globalTemplateAttributes[s.globalTraitKeys[i]]);
        }

        for (uint i = 0; i < s.globalUserMetadataKeys.length; i++) {
            s.userMetadata[tokenId].push(s.globalUserMetadataTemplate[s.globalUserMetadataKeys[i]]);
        }
        LibPassportStorage.layout().operatorApprovals[msg.sender][msg.sender] = true;

        emit PassportMinted(msg.sender, tokenId);
    }

    function setGlobalAttributes(
        string[] calldata trait_types,
        string[] calldata values,
        string[] calldata display_types,
        string[] calldata uris
    ) external onlyCoreAuthorized {
        LibPassportStorage.Layout storage s = LibPassportStorage.layout();
        require(trait_types.length == values.length && values.length == display_types.length && display_types.length == uris.length, "Mismatch");

        for (uint i = 0; i < trait_types.length; i++) {
            string memory key = trait_types[i];
            s.globalTemplateAttributes[key] = LibPassportStorage.Attribute(key, values[i], display_types[i], uris[i]);
            s.globalTraitKeys.push(key);
        }

        emit GlobalAttributesSet();
    }

    function updatePassportAttributes(uint256 tokenId, LibPassportStorage.Attribute[] calldata attrs) external onlyCoreAuthorized {
        require(ownerOf(tokenId) != address(0), "Invalid token");
        delete LibPassportStorage.layout().passportAttributes[tokenId];
        for (uint i = 0; i < attrs.length; i++) {
            LibPassportStorage.layout().passportAttributes[tokenId].push(attrs[i]);
        }
        emit PassportAttributesUpdated(tokenId);
    }

    function setGlobalUserMetadataTemplate(
        string[] calldata trait_types,
        string[] calldata values,
        string[] calldata uris
    ) external onlyCoreAuthorized {
        LibPassportStorage.Layout storage s = LibPassportStorage.layout();
        require(trait_types.length == values.length && values.length == uris.length, "Mismatch");
        for (uint i = 0; i < trait_types.length; i++) {
            string memory key = trait_types[i];
            s.globalUserMetadataTemplate[key] = LibPassportStorage.MetadataField(key, values[i], uris[i]);
            s.globalUserMetadataKeys.push(key);
        }
        emit GlobalUserMetadataTemplateSet();
    }

    function setBaseTokenURI(string calldata uri) external onlyCoreAuthorized {
        LibPassportStorage.layout().baseTokenURI = uri;
        emit BaseTokenURISet(uri);
    }

    function updateUserMetadata(uint256 tokenId, LibPassportStorage.MetadataField[] calldata fields) external {
        require(ownerOf(tokenId) == msg.sender, "Not your token");

        LibPassportStorage.Layout storage s = LibPassportStorage.layout(); // 🔥 Add this here first

        require(fields.length == s.globalUserMetadataKeys.length, "Invalid number of metadata fields");
        for (uint i = 0; i < fields.length; i++) {
            require(keccak256(bytes(fields[i].trait_type)) == keccak256(bytes(s.globalUserMetadataKeys[i])), "Mismatched metadata key");
        }

        delete s.userMetadata[tokenId];
        for (uint i = 0; i < fields.length; i++) {
            s.userMetadata[tokenId].push(fields[i]);
        }

        emit UserMetadataUpdated(tokenId);
    }

    function getGlobalUserMetadataTemplate() external view returns (LibPassportStorage.MetadataField[] memory) {
        LibPassportStorage.Layout storage s = LibPassportStorage.layout();
        uint256 length = s.globalUserMetadataKeys.length;

        LibPassportStorage.MetadataField[] memory fields = new LibPassportStorage.MetadataField[](length);
        for (uint256 i = 0; i < length; i++) {
            fields[i] = s.globalUserMetadataTemplate[s.globalUserMetadataKeys[i]];
        }
        return fields;
    }

    function getGlobalAttributeTemplate() external view returns (LibPassportStorage.Attribute[] memory) {
        LibPassportStorage.Layout storage s = LibPassportStorage.layout();
        uint256 length = s.globalTraitKeys.length;

        LibPassportStorage.Attribute[] memory fields = new LibPassportStorage.Attribute[](length);
        for (uint256 i = 0; i < length; i++) {
            fields[i] = s.globalTemplateAttributes[s.globalTraitKeys[i]];
        }
        return fields;
    }

    function getUserMetadata(uint256 tokenId) external view returns (LibPassportStorage.MetadataField[] memory) {
        return LibPassportStorage.layout().userMetadata[tokenId];
    }

    function burn(uint256 tokenId) external onlyCoreAuthorized {
        LibPassportStorage.Layout storage s = LibPassportStorage.layout();
        address owner = ownerOf(tokenId);

        require(owner == msg.sender, "Not owner");

        // Clear approvals
        delete s.tokenApprovals[tokenId];

        // Update balances and ownership
        s.balances[owner]--;
        delete s.owners[tokenId];
        delete s.walletToTokenId[owner];

        // Remove from allPassportHolders
        _removePassportHolder(owner);

        // Delete metadata and attributes
        delete s.userMetadata[tokenId];
        delete s.passportAttributes[tokenId];

        // (Optional) Reset operator approvals for this user if needed
        delete s.operatorApprovals[owner][owner];

        // If you want to zero out inventory as part of burn (though it's transferred on transfer already)
        LibInventoryStorage.Layout storage inv = LibInventoryStorage.layout();
        uint256[] memory itemIds = inv.allItemIds;
        for (uint256 i = 0; i < itemIds.length; i++) {
            delete inv.balances[owner][itemIds[i]];
        }

        emit PassportBurned(owner, tokenId);
    }

    function totalSupply() external view returns (uint256) {
        return LibPassportStorage.layout().allPassportHolders.length;
    }

    function getPassportAttributes(uint256 tokenId) external view returns (LibPassportStorage.Attribute[] memory) {
        return LibPassportStorage.layout().passportAttributes[tokenId];
    }

    function getAllPassportHolders() external view returns (address[] memory) {
        return LibPassportStorage.layout().allPassportHolders;
    }

    function getAllPassports() external view returns (uint256[] memory tokenIds) {
        LibPassportStorage.Layout storage s = LibPassportStorage.layout();
        uint256 total = s.allPassportHolders.length;
        uint256[] memory ids = new uint256[](total);

        for (uint i = 0; i < total; i++) {
            ids[i] = s.walletToTokenId[s.allPassportHolders[i]];
        }

        return ids;
    }

    function _transfer(address from, address to, uint256 tokenId) internal {
        LibPassportStorage.Layout storage s = LibPassportStorage.layout();

        // Ensure the sender is the owner of the passport
        require(ownerOf(tokenId) == from, "Not owner");
        require(to != address(0), "Cannot transfer to zero address");
        // Ensure the recipient doesn't already have a passport
        require(s.walletToTokenId[to] == 0, "Recipient already has a passport");

        // Check if the recipient already has inventory
        LibInventoryStorage.Layout storage invStorage = LibInventoryStorage.layout();
        uint256[] memory itemIds = invStorage.allItemIds;

        // If the recipient already has inventory, reject the transfer
        for (uint256 i = 0; i < itemIds.length; i++) {
            if (invStorage.balances[to][itemIds[i]] > 0) {
                revert("Recipient already has inventory");
            }
        }

        // Update the ownership of the passport
        s.owners[tokenId] = to;
        s.balances[from]--;
        s.balances[to]++;
        s.walletToTokenId[from] = 0;
        s.walletToTokenId[to] = tokenId;

        // Remove old holder and add new holder to the allPassportHolders list
        _removePassportHolder(from);
        s.allPassportHolders.push(to);
        s.passportHolderIndex[to] = s.allPassportHolders.length - 1;

        // Transfer Inventory items to the new owner if they don't already have inventory
        _transferInventoryItems(from, to);

        // Emit the event after the transfer
        emit PassportTransferred(from, to, tokenId);
    }

    function safeBatchTransferFrom(address from, address to, uint256[] calldata tokenIds) external {
        uint256[] memory successfulTransfers = new uint256[](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            // Transfer each passport
            _transfer(from, to, tokenId);
            successfulTransfers[i] = tokenId;
        }

        emit PassportTransferredBatch(from, to, successfulTransfers);
    }

    function _transferInventoryItems(address from, address to) internal {
        LibInventoryStorage.Layout storage invStorage = LibInventoryStorage.layout();

        // Check if the recipient already has inventory
        uint256[] memory itemIds = invStorage.allItemIds;

        // If the recipient already has inventory, revert the transfer
        for (uint256 i = 0; i < itemIds.length; i++) {
            if (invStorage.balances[to][itemIds[i]] > 0) {
                revert("Recipient already has inventory");
            }
        }

        // If no inventory exists for the recipient, proceed with transferring the items
        for (uint256 i = 0; i < itemIds.length; i++) {
            uint256 itemId = itemIds[i];
            uint256 amount = invStorage.balances[from][itemId];
            if (amount > 0) {
                // Transfer the item balance from the old owner to the new owner
                invStorage.balances[from][itemId] = 0; // Remove from the old owner
                invStorage.balances[to][itemId] += amount; // Add to the new owner
                emit ItemTransferred(from, to, itemId, amount);
            }
        }
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

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

    function _removePassportHolder(address holder) internal {
        LibPassportStorage.Layout storage s = LibPassportStorage.layout();

        uint256 index = s.passportHolderIndex[holder];
        uint256 lastIndex = s.allPassportHolders.length - 1;
        address lastHolder = s.allPassportHolders[lastIndex];

        // Swap current with last
        s.allPassportHolders[index] = lastHolder;
        s.passportHolderIndex[lastHolder] = index;

        // Remove last
        s.allPassportHolders.pop();
        delete s.passportHolderIndex[holder];
    }
}
