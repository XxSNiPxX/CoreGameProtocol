// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {LibPassportStorage} from "../libraries/LibPassportStorage.sol";
import {LibInventoryStorage} from "../libraries/LibInventoryStorage.sol";
import {LibGameInfoStorage} from "../libraries/LibGameInfoStorage.sol";
import {LibFacetRegistryStorage} from "../libraries/LibFacetRegistryStorage.sol";

contract GameDataFacetV1 {
    struct PlayerSnapshot {
        address wallet;
        uint256 tokenId;
        LibPassportStorage.Attribute[] passportAttributes;
        LibPassportStorage.MetadataField[] userMetadata;
        uint256[] itemIds;
        uint256[] itemBalances;
    }

    struct FacetInfo {
        string name;
        address facetAddress;
    }

    struct GlobalGameData {
        LibGameInfoStorage.GameMetadata metadata;
        uint256 totalPassports;
        uint256 totalItems;
        LibInventoryStorage.ItemAttribute[] allItems;
        LibPassportStorage.Attribute[] globalPassportTraits;
        LibPassportStorage.MetadataField[] globalUserMetadata;
        FacetInfo[] deployedFacets;
    }

    function getPlayerSnapshots(uint256 offset, uint256 limit) external view returns (PlayerSnapshot[] memory snapshots) {
        LibPassportStorage.Layout storage p = LibPassportStorage.layout();
        LibInventoryStorage.Layout storage inv = LibInventoryStorage.layout();

        uint256 total = p.allPassportHolders.length;
        if (offset >= total) return new PlayerSnapshot[](0);

        uint256 count = limit;
        if (offset + limit > total) {
            count = total - offset;
        }

        snapshots = new PlayerSnapshot[](count);
        for (uint256 idx = 0; idx < count; idx++) {
            address user = p.allPassportHolders[offset + idx];
            uint256 tokenId = p.walletToTokenId[user];

            uint256 itemCount = inv.allItemIds.length;
            uint256[] memory itemIds = new uint256[](itemCount);
            uint256[] memory itemBalances = new uint256[](itemCount);
            for (uint256 j = 0; j < itemCount; j++) {
                uint256 itemId = inv.allItemIds[j];
                itemIds[j] = itemId;
                itemBalances[j] = inv.balances[user][itemId];
            }

            snapshots[idx] = PlayerSnapshot({
                wallet: user,
                tokenId: tokenId,
                passportAttributes: p.passportAttributes[tokenId],
                userMetadata: p.userMetadata[tokenId],
                itemIds: itemIds,
                itemBalances: itemBalances
            });
        }
    }

    function getGlobalGameInfo() external view returns (GlobalGameData memory data) {
        LibGameInfoStorage.Layout storage g = LibGameInfoStorage.layout();
        LibPassportStorage.Layout storage p = LibPassportStorage.layout();
        LibInventoryStorage.Layout storage inv = LibInventoryStorage.layout();
        LibFacetRegistryStorage.FacetRegistry storage f = LibFacetRegistryStorage.layout();

        // All items
        uint256 itemCount = inv.allItemIds.length;
        LibInventoryStorage.ItemAttribute[] memory allItems = new LibInventoryStorage.ItemAttribute[](itemCount);
        for (uint256 m = 0; m < itemCount; m++) {
            allItems[m] = inv.itemAttributes[inv.allItemIds[m]];
        }

        // Traits
        uint256 traitCount = p.globalTraitKeys.length;
        LibPassportStorage.Attribute[] memory globalTraits = new LibPassportStorage.Attribute[](traitCount);
        for (uint256 j = 0; j < traitCount; j++) {
            string memory key = p.globalTraitKeys[j];
            globalTraits[j] = p.globalTemplateAttributes[key];
        }

        // Metadata
        uint256 metaCount = p.globalUserMetadataKeys.length;
        LibPassportStorage.MetadataField[] memory globalMetadata = new LibPassportStorage.MetadataField[](metaCount);
        for (uint256 k = 0; k < metaCount; k++) {
            string memory key = p.globalUserMetadataKeys[k];
            globalMetadata[k] = p.globalUserMetadataTemplate[key];
        }

        // Facets
        uint256 facetCount = f.facetAddresses.length;
        FacetInfo[] memory deployedFacets = new FacetInfo[](facetCount);
        for (uint256 i = 0; i < facetCount; i++) {
            address addr = f.facetAddresses[i];
            deployedFacets[i] = FacetInfo({name: f.facetNames[addr], facetAddress: addr});
        }

        data = GlobalGameData({
            metadata: g.metadata,
            totalPassports: p.allPassportHolders.length,
            totalItems: itemCount,
            allItems: allItems,
            globalPassportTraits: globalTraits,
            globalUserMetadata: globalMetadata,
            deployedFacets: deployedFacets
        });
    }
}
