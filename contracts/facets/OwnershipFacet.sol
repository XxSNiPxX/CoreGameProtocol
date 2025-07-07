// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import {IERC173} from "../interfaces/IERC173.sol";
// import your registry or tracking library here
import {LibFacetRegistry} from "../libraries/LibFacetRegistry.sol";

contract OwnershipFacet is IERC173 {
    function transferOwnership(address _newOwner) external override {
        LibDiamond.enforceIsContractOwner();
        address oldOwner = LibDiamond.contractOwner();
        LibDiamond.setContractOwner(_newOwner);

        // Custom logic: update any facet mappings, owner-linked metadata
        LibFacetRegistry.updateOwner(oldOwner, _newOwner);
    }

    function owner() external view override returns (address owner_) {
        owner_ = LibDiamond.contractOwner();
    }
}
