const hre = require("hardhat");
const { ethers } = require("hardhat");

async function getGameInfo(diamondAddress) {
    const gameInfoFacet = await hre.ethers.getContractAt("GameInfoFacet", diamondAddress);

    // Fetch current game information
    const gameMetadata = await gameInfoFacet.getGameMetadata();
    console.log(`Current Game Info:`);
    console.log(`Name: ${gameMetadata[0]}`);
    console.log(`Description: ${gameMetadata[1]}`);
    console.log(`Genre: ${gameMetadata[2]}`);
    console.log(`Image URI: ${gameMetadata[3]}`);
}

async function updateGameName(diamondAddress, newGameName, newDescription, newGenre, newImageURI) {
    const gameInfoFacet = await hre.ethers.getContractAt("GameInfoFacet", diamondAddress);

    console.log(`Updating game name to: ${newGameName}`);
    console.log(`Updating description to: ${newDescription}`);
    console.log(`Updating genre to: ${newGenre}`);
    console.log(`Updating image URI to: ${newImageURI}`);

    const tx = await gameInfoFacet.setGameMetadata(newGameName, newDescription, newGenre, newImageURI);
    const receipt = await tx.wait();

    const gasUsedInETH = ethers.utils.formatEther(receipt.gasUsed.mul(await hre.ethers.provider.getGasPrice()));
    console.log(`Gas used for updating game metadata: ${gasUsedInETH} ETH`);
}

async function addAuthorizedUser(diamondAddress, userAddress) {
    const gameInfoFacet = await hre.ethers.getContractAt("GameInfoFacet", diamondAddress);

    console.log(`Adding authorized user: ${userAddress}`);
    const tx = await gameInfoFacet.addAuthorizedUser(userAddress);
    const receipt = await tx.wait();

    const gasUsedInETH = ethers.utils.formatEther(receipt.gasUsed.mul(await hre.ethers.provider.getGasPrice()));
    console.log(`Gas used for adding authorized user: ${gasUsedInETH} ETH`);
}

async function removeAuthorizedUser(diamondAddress, userAddress) {
    const gameInfoFacet = await hre.ethers.getContractAt("GameInfoFacet", diamondAddress);

    console.log(`Removing authorized user: ${userAddress}`);
    const tx = await gameInfoFacet.removeAuthorizedUser(userAddress);
    const receipt = await tx.wait();

    const gasUsedInETH = ethers.utils.formatEther(receipt.gasUsed.mul(await hre.ethers.provider.getGasPrice()));
    console.log(`Gas used for removing authorized user: ${gasUsedInETH} ETH`);
}

async function getAuthorizedUsers(diamondAddress) {
    const gameInfoFacet = await hre.ethers.getContractAt("GameInfoFacet", diamondAddress);

    const authorizedUsers = await gameInfoFacet.getAuthorizedUsers();
    console.log(`Authorized users:`);
    console.log(authorizedUsers);
}

async function mintPassport(diamondAddress, userAddress) {
    const passportFacet = await hre.ethers.getContractAt("PassportFacet", diamondAddress);

    console.log(`Minting passport for user: ${userAddress}`);
    const tx = await passportFacet.connect(userAddress).mint();
    const receipt = await tx.wait();

    const gasUsedInETH = ethers.utils.formatEther(receipt.gasUsed.mul(await hre.ethers.provider.getGasPrice()));
    console.log(`Gas used for minting passport: ${gasUsedInETH} ETH`);
}

async function updatePassportMetadata(diamondAddress, userAddress) {
    const passportFacet = await hre.ethers.getContractAt("PassportFacet", diamondAddress);

    const id = await passportFacet.getTokenIdForWallet(userAddress);
    console.log(`Updating passport metadata for user: ${userAddress}, Token ID: ${id.toNumber()}`);

    const tx = await passportFacet.connect(userAddress).updateUserMetadata(id, [
        { trait_type: "nickname", value: "UpdatedName", uri: "ipfs://updated.png" }
    ]);
    const receipt = await tx.wait();

    const gasUsedInETH = ethers.utils.formatEther(receipt.gasUsed.mul(await hre.ethers.provider.getGasPrice()));
    console.log(`Gas used for updating passport metadata: ${gasUsedInETH} ETH`);
}

async function transferPassport(diamondAddress, fromAddress, toAddress, passportId) {
    const passportFacet = await hre.ethers.getContractAt("PassportFacet", diamondAddress);

    console.log(`Transferring passport ID ${passportId} from ${fromAddress} to ${toAddress}`);
    const tx = await passportFacet.connect(fromAddress).transferFrom(fromAddress, toAddress, passportId);
    const receipt = await tx.wait();

    const gasUsedInETH = ethers.utils.formatEther(receipt.gasUsed.mul(await hre.ethers.provider.getGasPrice()));
    console.log(`Gas used for transferring passport: ${gasUsedInETH} ETH`);
}

async function approvePassportTransfer(diamondAddress, userAddress, toAddress, passportId) {
    const passportFacet = await hre.ethers.getContractAt("PassportFacet", diamondAddress);

    console.log(`Approving transfer of passport ID ${passportId} from ${userAddress} to ${toAddress}`);
    const tx = await passportFacet.connect(userAddress).approve(toAddress, passportId);
    const receipt = await tx.wait();

    const gasUsedInETH = ethers.utils.formatEther(receipt.gasUsed.mul(await hre.ethers.provider.getGasPrice()));
    console.log(`Gas used for approving passport transfer: ${gasUsedInETH} ETH`);
}

async function handleInventoryOperations(diamondAddress, itemId, userAddress) {
    const invFacet = await hre.ethers.getContractAt("InventoryFacet", diamondAddress);

    console.log(`Adding inventory item ID ${itemId} for user: ${userAddress}`);
    const txAddItem = await invFacet.connect(userAddress).addItem(itemId, "Sword", "Sharp blade", "ipfs://sword.png", [
        { trait_type: "damage", value: "100", display_type: "number", uri: "ipfs://damage.png" }
    ]);
    await txAddItem.wait();

    console.log(`Minting inventory item ID ${itemId} to user: ${userAddress}`);
    const txMint = await invFacet.connect(userAddress).mint(userAddress, itemId, 5);
    await txMint.wait();

    console.log(`Transferring inventory item ID ${itemId} from ${userAddress} to another user`);
    const txTransfer = await invFacet.connect(userAddress).safeTransferFrom(userAddress, toAddress, itemId, 2, "0x");
    await txTransfer.wait();
}

async function interactWithDiamond(diamondAddress) {
    // Fetch current game info
    await getGameInfo(diamondAddress);

    // Update the game name and other metadata
    const newGameName = "NewAwesomeGame";
    const newDescription = "An updated RPG game";
    const newGenre = "RPG";
    const newImageURI = "ipfs://NewAwesomeGame.png";
    await updateGameName(diamondAddress, newGameName, newDescription, newGenre, newImageURI);

    // Add an authorized user
    const userAddress = "0x0b578b476BF918Ee791784485cb2494c260D8528"; // Replace with a valid address
    await addAuthorizedUser(diamondAddress, userAddress);

    // Remove an authorized user
    await removeAuthorizedUser(diamondAddress, userAddress);

    // Get the list of authorized users
    await getAuthorizedUsers(diamondAddress);

    // Mint passport for the user
    await mintPassport(diamondAddress, userAddress);

    // Update passport metadata
    await updatePassportMetadata(diamondAddress, userAddress);

    // Transfer passport between users
    const passportId = 1; // Replace with a valid passport ID
    const toAddress = "0x2d348249c153dc9f9d32b6ef3cd2b529fbb99c34"; // Replace with a valid address
    await transferPassport(diamondAddress, userAddress, toAddress, passportId);

    // Approve passport transfer
    await approvePassportTransfer(diamondAddress, userAddress, toAddress, passportId);

    // Handle inventory operations
    const itemId = 999; // Replace with a valid item ID
    await handleInventoryOperations(diamondAddress, itemId, userAddress);
}

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Interacting with contracts using the account:", deployer.address);

    // Specify the deployed CoreGameDiamond address
    const diamondAddress = "0xaB9C116d024cfB89A3Abe9087483e0D72B3213a0"; // Replace with the actual address

    // Interact with the diamond contract
    await interactWithDiamond(diamondAddress);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
