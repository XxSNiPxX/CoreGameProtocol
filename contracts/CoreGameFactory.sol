// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {CoreGameDiamond} from "./CoreGameDiamond.sol";
import {FacetRegistryFacet} from "./facets/FacetRegistryFacet.sol"; // Import GameInfoFacet
import {IDiamondCut} from "./interfaces/IDiamondCut.sol";
import {DiamondLoupeFacet} from "./facets/DiamondLoupeFacet.sol"; // Import GameInfoFacet
import {OwnershipFacet} from "./facets/OwnershipFacet.sol"; // Import GameInfoFacet
import {InitialFaucets} from "./CoreGameShared.sol";
import "hardhat/console.sol"; // Only for Hardhat local testing

contract CoreGameFactory {
    struct GameInfo {
        address developer;
        address coreGameDiamond;
    }

    mapping(address => address[]) public developerToGames;
    mapping(uint256 => GameInfo) public games;
    address[] public allGames;
    uint256 public gameId;

    event CoreGameCreated(address indexed developer, address coreGameDiamond);

    function createCoreGame(IDiamondCut.FacetCut[] memory _facetCuts) external {
        gameId++;
        console.log("FacetCut", gameId);

        // Deploy the diamond (without any facets except GameInfoFacet)
        //
        FacetRegistryFacet facetRegistryFacet = new FacetRegistryFacet();
        OwnershipFacet ownershipFacet = new OwnershipFacet();
        DiamondLoupeFacet diamondLoupeFacet = new DiamondLoupeFacet();
        for (uint i = 0; i < _facetCuts.length; i++) {
            console.log("FacetCut", i);
        }

        InitialFaucets[] memory initialFaucets = new InitialFaucets[](3);
        initialFaucets[0] = InitialFaucets("FacetRegistryFacet", address(facetRegistryFacet));
        initialFaucets[1] = InitialFaucets("OwnershipFacet", address(ownershipFacet));
        initialFaucets[2] = InitialFaucets("DiamondLoupeFacet", address(diamondLoupeFacet));
        for (uint i = 0; i < initialFaucets.length; i++) {
            console.log("initialFaucets", i, address(facetRegistryFacet));
        }
        CoreGameDiamond diamond = new CoreGameDiamond(
            msg.sender,
            initialFaucets,
            _facetCuts // This would be empty for now or can be passed dynamically
        );
        console.log("here");

        // Save the game information
        games[gameId] = GameInfo({developer: msg.sender, coreGameDiamond: address(diamond)});
        developerToGames[msg.sender].push(address(diamond));
        allGames.push(address(diamond));

        emit CoreGameCreated(msg.sender, address(diamond));
    }

    function getGamesByDeveloper(address _dev) external view returns (address[] memory) {
        return developerToGames[_dev];
    }

    function getAllGames() external view returns (address[] memory) {
        return allGames;
    }
}
