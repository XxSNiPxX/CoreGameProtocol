const hre = require("hardhat");
const { ethers } = require("hardhat");

async function getExistingSelectors(diamondAddress) {
    const diamond = await hre.ethers.getContractAt("CoreGameDiamond", diamondAddress);
    const selectors = await diamond.getSelectors(); // You might need to implement this function
    return new Set(selectors); // Use a Set to ensure uniqueness
}

async function deployFacet(diamondAddress, facetName) {
    // Deploy a single facet
    const Facet = await hre.ethers.getContractFactory(facetName);
    const facet = await Facet.deploy();
    await facet.deployed();
    console.log(`${facetName} deployed to:`, facet.address);

    // Get the function selectors for the deployed facet
    const selectors = await getUniqueSelectors(facet);

    // Fetch the existing selectors from the diamond
    const existingSelectors = await getExistingSelectors(diamondAddress);

    // Filter out the selectors that already exist in the diamond
    const newSelectors = selectors.filter(selector => !existingSelectors.has(selector));

    if (newSelectors.length > 0) {
        const facetData = {
            facetAddress: facet.address,
            action: 0, // Action 0 = Add facet
            functionSelectors: newSelectors
        };

        // Update the diamond with the new facet
        const diamond = await hre.ethers.getContractAt("CoreGameDiamond", diamondAddress);
        const txUpdate = await diamond.deployFacet([facetData],facetName);

        // Wait for the transaction to be mined and log gas used
        const receipt = await txUpdate.wait();

        // Log gas used in ETH
        const gasUsedInETH = ethers.utils.formatEther(receipt.gasUsed.mul(await hre.ethers.provider.getGasPrice()));
        console.log(`${facetName} facet added to CoreGameDiamond: ${diamondAddress}`);
        console.log(`Gas used for ${facetName} facet deployment: ${gasUsedInETH} ETH`);
    } else {
        console.log(`Facet ${facetName} already exists in the diamond, skipping.`);
    }
}

async function getUniqueSelectors(facet) {
    const iface = new hre.ethers.utils.Interface(await facet.interface.format());
    const selectors = [];
    for (const key of Object.keys(iface.functions)) {
        const selector = iface.getSighash(key);
        selectors.push(selector);
    }
    return selectors;
}

async function deployGame() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy the CoreGameFactory contract
    const Factory = await hre.ethers.getContractFactory("CoreGameFactory");
    const factory = await Factory.deploy();
    await factory.deployed();
    console.log("CoreGameFactory deployed to:", factory.address);

    // // Gas used for CoreGameFactory deployment
    // const factoryReceipt = await factory.deployTransaction.wait();
    // const factoryGasPrice = await hre.ethers.provider.getGasPrice();
    // const factoryGasInETH = ethers.utils.formatEther(factoryReceipt.gasUsed.mul(factoryGasPrice));
    // console.log(`Gas used for CoreGameFactory deployment: ${factoryGasInETH} ETH`);

    // // Define the public keys and game name
    // const pubKeys = [deployer.address];
    // const gameName = "MyGame";
    // const gameDescription = "An RPG Game";
    // const gameGenre = "RPG";
    // const imageURI = "ipfs://MyGame.png";

    // // Deploy the game and get the CoreGameDiamond address
    // const tx = await factory.createCoreGame(
    //     pubKeys,
    //     gameName,
    //     gameDescription,
    //     gameGenre,
    //     [],  // Placeholder for facets, we add them later
    //     imageURI
    // );
    // const receipt = await tx.wait();
    // const event = receipt.logs.map(log => {
    //     try {
    //         return factory.interface.parseLog(log);
    //     } catch { return null; }
    // }).find(log => log?.name === "CoreGameCreated");

    // const diamondAddress = event.args.coreGameDiamond;
    // console.log("CoreGameDiamond deployed to:", diamondAddress);

    // // Gas used for creating CoreGameDiamond
    // const gasUsedInETH = ethers.utils.formatEther(receipt.gasUsed.mul(factoryGasPrice));
    // console.log(`Gas used for CoreGameDiamond creation: ${gasUsedInETH} ETH`);

    // // Deploy and add facets one by one
    // const facetNames = [
    //     "DiamondLoupeFacet",
    //     "OwnershipFacet",
    //     "PassportFacet",
    //     "InventoryFacet",
    //     "GameInfoFacet"
    // ];

    // for (const facetName of facetNames) {
    //     await deployFacet(diamondAddress, facetName);
    // }



}

// Run the main deploy script
deployGame()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
