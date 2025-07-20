const { expect } = require("chai");
const { ethers } = require("hardhat");
const { getUniqueSelectors } = require("./getUniqueSelectors");

describe("CoreGameFactory + CoreGameDiamond Full Integration", function () {
  let factory, diamond, diamond2, owner, user, otherUser,hehe;
  const facetNames = ["PassportFacet", "InventoryFacet", "GameInfoFacet"];
  FACTORY_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3"
  async function expectRevert(promise, expectedError) {
    let threw = false;
    let errorMessage = '';
    try {
      await promise;
    } catch (error) {
      threw = true;
      errorMessage = error.message;
    }
    expect(threw).to.equal(true, `Expected revert, but it didn't happen. Error: ${errorMessage}`);
    if (expectedError) {
      expect(errorMessage).to.include(expectedError);
    }
  }

  async function deployDiamond( signer) {
      if (!signer) signer = (await ethers.getSigners())[0]; // default to owner

      const facets = [];
      const seenSelectors = new Set();
      const facet_init = ["FacetRegistryFacet", "OwnershipFacet", "DiamondLoupeFacet"];

      for (const fname of facet_init) {
          const Facet = await ethers.getContractFactory(fname, signer);
          const facet = await Facet.deploy();
          await facet.deployed();
          facets.push({
              facetAddress: facet.address,
              action: 0,
              functionSelectors: getUniqueSelectors(facet, seenSelectors),
          });
      }

      const connectedFactory = factory.connect(signer);
      const tx = await connectedFactory.createCoreGame(facets);
      const receipt = await tx.wait();

      // Filter logs emitted by the factory only
      const factoryLogs = receipt.logs.filter(log => log.address.toLowerCase() === factory.address.toLowerCase());

      const evt = factoryLogs
        .map(log => {
          try {
            return connectedFactory.interface.parseLog(log);
          } catch {
            return null;
          }
        })
        .find(e => e?.name === "CoreGameCreated");

      if (!evt) {
        throw new Error("CoreGameCreated event not found in transaction logs");
      }


      return await ethers.getContractAt("CoreGameDiamond", evt.args.coreGameDiamond);
  }


  before(async () => {
    [owner, user, otherUser,hehe] = await ethers.getSigners();
    factory = await ethers.getContractAt("CoreGameFactory", FACTORY_ADDRESS);

    diamond = await deployDiamond(otherUser);      // deploy as owner
    diamond2 = await deployDiamond(user);  // deploy as user
    console.log(diamond.address)

  });

  it("should track developer-created games via factory", async () => {
    const devGames = await factory.getGamesByDeveloper(otherUser.address);
    expect(devGames).to.include(diamond.address);
    const allGames = await factory.getAllGames();
    expect(allGames.length).to.equal(2);
  });

  it("Deploy and set game metadata", async () => {
    const seenSelectors = new Set();
    let facet_init=["GameInfoFacet"]
    const facets = [];
    for (const fname of facet_init) {
      const Facet = await ethers.getContractFactory(fname,otherUser);

      const facet = await Facet.deploy();
      await facet.deployed();
      facets.push({
        facetAddress: facet.address,
        action: 0,
        functionSelectors: getUniqueSelectors(facet, seenSelectors),
      });
    }
    const devGames = await factory.getGamesByDeveloper(otherUser.address);


    const deploy_face = await diamond.connect(otherUser).deployFacet(facets,["GameInfoFacet"]);

    const facett = await ethers.getContractAt("FacetRegistryFacet", devGames[0]);
    const facets_registerd = await facett.getAllFacets();

    const gameinfo = await ethers.getContractAt("GameInfoFacet", devGames[0]);
    const metadata_update=await gameinfo.connect(otherUser).setBasicGameMetadata("Test Game","test game","Open","https://dsadsadsa.com")
    const get_meta=await gameinfo.connect(otherUser).getGameMetadata()
    // expect(authorized).to.include(owner.address);
  });

  it("should mint passport, set real-world attributes and metadata, and enforce schema restrictions", async () => {
    const seenSelectors = new Set();
    const facet_init = ["PassportFacet"];
    const facets = [];

    for (const fname of facet_init) {
      const Facet = await ethers.getContractFactory(fname, otherUser);
      const facet = await Facet.deploy();
      await facet.deployed();

      const loupe = await ethers.getContractAt("DiamondLoupeFacet", diamond.address);
      const existingSelectors = (await loupe.facets()).flatMap(f => f.functionSelectors);
      const newSelectors = getUniqueSelectors(facet, seenSelectors).filter(s => !existingSelectors.includes(s));

      facets.push({
        facetAddress: facet.address,
        action: 0,
        functionSelectors: newSelectors,
      });
    }

    // Deploy facet to the diamond
    await diamond.connect(otherUser).deployFacet(facets, ["PassportFacet"]);
    const passport = await ethers.getContractAt("PassportFacet", diamond.address);

    // Define user metadata schema
    await passport.connect(otherUser).setGlobalUserMetadataTemplate(
      ["website", "bio"],
      ["https://drip.io", "early builder"],
      ["ipfs://website-meta", "ipfs://bio-meta"]
    );

    // Define passport attributes
    await passport.connect(otherUser).setGlobalAttributes(
      ["strength", "intelligence"],
      ["50", "70"],
      ["number", "number"],
      ["ipfs://strength-v1", "ipfs://intelligence-v1"]
    );

    // Mint passport
    await passport.connect(user).mint();
    const tokenId = await passport.getTokenIdForWallet(user.address);
    expect(tokenId.toNumber()).to.be.gt(0);

    // Verify initial user metadata
    const metadata = await passport.getUserMetadata(tokenId);
    expect(metadata.length).to.equal(2);
    expect(metadata[0].trait_type).to.equal("website");
    expect(metadata[0].value).to.equal("https://drip.io");
    expect(metadata[1].trait_type).to.equal("bio");
    expect(metadata[1].value).to.equal("early builder");

    // Verify initial attributes
    const attributes = await passport.getPassportAttributes(tokenId);
    expect(attributes.length).to.equal(2);
    expect(attributes[0].trait_type).to.equal("strength");
    expect(attributes[0].value).to.equal("50");
    expect(attributes[1].trait_type).to.equal("intelligence");
    expect(attributes[1].value).to.equal("70");

    // Prevent second mint
    await expectRevert(passport.connect(user).mint());

    // Allow dev to update attributes
    await passport.connect(otherUser).updatePassportAttributes(tokenId, [
      {
        trait_type: "strength",
        value: "95",
        display_type: "number",
        uri: "ipfs://strength-v2"
      },
      {
        trait_type: "intelligence",
        value: "80",
        display_type: "number",
        uri: "ipfs://intelligence-v2"
      }
    ]);

    const updatedAttrs = await passport.getPassportAttributes(tokenId);
    expect(updatedAttrs[0].value).to.equal("95");
    expect(updatedAttrs[1].value).to.equal("80");

    // Allow user to update their metadata
    await passport.connect(user).updateUserMetadata(tokenId, [
      {
        trait_type: "website",
        value: "https://theone.com",
        uri: "ipfs://updated-website"
      },
      {
        trait_type: "bio",
        value: "The One",
        uri: "ipfs://updated-bio"
      }
    ]);

    const updatedMetadata = await passport.getUserMetadata(tokenId);
    expect(updatedMetadata[0].value).to.equal("https://theone.com");
    expect(updatedMetadata[1].value).to.equal("The One");

    // ❌ Should reject metadata with unknown trait_type
    await expectRevert(
      passport.connect(user).updateUserMetadata(tokenId, [
        {
          trait_type: "twitter", // not defined in schema
          value: "@neo",
          uri: "ipfs://twitter"
        },
        {
          trait_type: "bio",
          value: "Override",
          uri: "ipfs://bio"
        }
      ])
    );

    // ❌ Should reject if number of fields doesn't match template
    await expectRevert(
      passport.connect(user).updateUserMetadata(tokenId, [
        {
          trait_type: "bio",
          value: "Neo",
          uri: "ipfs://bio"
        }
        // Missing 'website'
      ])
    );

    // Final checks
    const holders = await passport.getAllPassportHolders();
    expect(holders).to.include(user.address);

    const passports = await passport.getAllPassports();
    expect(passports.map(p => p.toString())).to.include(tokenId.toString());
  });



  it("should block metadata updates by unauthorized or with bad traits", async () => {
    const passport = await ethers.getContractAt("PassportFacet", diamond.address);
    const id = await passport.getTokenIdForWallet(user.address);

    await expectRevert(
      passport.connect(otherUser).updateUserMetadata(id, [])
    );

    await expectRevert(
      passport.connect(user).updateUserMetadata(id, [
        { trait_type: "wrong", value: "X", uri: "ipfs://x" }
      ])
    );
  });

  it("should update metadata, transfer passport, prevent duplicates, and correctly update holder state", async () => {
    const passport = await ethers.getContractAt("PassportFacet", diamond.address);

    // === 1. Setup: Mint passport for user ===
    const id = await passport.getTokenIdForWallet(user.address);
    expect(id.toNumber()).to.be.gt(0);

    // === 2. Fetch global metadata schema ===
    const globalMetadata = await passport.getGlobalUserMetadataTemplate();
    const updateData = globalMetadata.map((field) => {
      return {
        trait_type: field.trait_type,
        value:
          field.trait_type === "nickname"
            ? "NewName"
            : field.trait_type === "website"
            ? "https://new.com"
            : "updated", // fallback
        uri: `ipfs://updated-${field.trait_type}`,
      };
    });

    // === 3. Initial metadata update ===
    await passport.connect(user).updateUserMetadata(id, updateData);

    const metadata = await passport.getUserMetadata(id);
    for (let i = 0; i < updateData.length; i++) {
      expect(metadata[i].trait_type).to.equal(updateData[i].trait_type);
      expect(metadata[i].value).to.equal(updateData[i].value);
      expect(metadata[i].uri).to.equal(updateData[i].uri);
    }

    // === 4. Track holders before transfer ===
    const holdersBefore = await passport.getAllPassportHolders();
    expect(holdersBefore).to.include(user.address);
    expect(holdersBefore).to.not.include(otherUser.address);

    // === 5. Transfer to another user ===
    await passport.connect(user).transferFrom(user.address, otherUser.address, id);
    const newOwner = await passport.ownerOf(id);
    expect(newOwner).to.equal(otherUser.address);

    // === 6. Validate holder list updated ===
    const holdersAfter = await passport.getAllPassportHolders();
    expect(holdersAfter).to.include(otherUser.address);
    expect(holdersAfter).to.not.include(user.address);

    // === 7. Validate metadata still valid after transfer ===
    const metadataAfter = await passport.getUserMetadata(id);

    for (let i = 0; i < updateData.length; i++) {
      expect(metadataAfter[i][0]).to.equal(updateData[i].trait_type);
      expect(metadataAfter[i][1]).to.equal(updateData[i].value);
    }

    // === 8. Prevent original user from re-minting ===
    try {
      await passport.connect(user).mint();
    } catch (err) {
      expect(err.message).to.include("Already minted");
    }

    // === 9. Prevent transfer to user who already has a passport ===
    try {
      await passport.connect(otherUser).transferFrom(otherUser.address, user.address, id)
      expect.fail("Expected revert but did not happen");
    } catch (err) {
      expect(err.message).to.include("Recipient already has a passport");
    }


    // === 10. Validate getAllPassports reflects correct token ID ===
    const allPassports = await passport.getAllPassports();
    expect(allPassports.map((x) => x.toString())).to.include(id.toString());
    const normalized = metadataAfter.map(m => ({
      trait_type: m[0],
      value: m[1],
      uri: m[2]
    }));

    expect(normalized).to.deep.include.members([
      { trait_type: "website", value: "https://new.com", uri: "ipfs://updated-website" },
      { trait_type: "bio", value: "updated", uri: "ipfs://updated-bio" }
    ]);
    // === 11. Validate deep metadata integrity ===
  });



  it("should reject transferring passport to someone who already has one", async () => {
    const passport = await ethers.getContractAt("PassportFacet", diamond.address);

    // === 1. Mint a passport for `user` ===
    // try {
    //   await passport.connect(user).mint();
    //   assert.fail("Expected transaction to revert");
    // } catch (err) {
    //   expect(err.message).to.include("Already minted");
    // }

    // await passport.connect(user).mint();
    const userId = await passport.getTokenIdForWallet(user.address);
    expect(userId.toNumber()).to.be.gt(0);

    // === 2. Mint a passport for `otherUser` ===
    // await passport.connect(otherUser).mint();
    // const otherUserId = await passport.getTokenIdForWallet(otherUser.address);
    // expect(otherUserId.toNumber()).to.be.gt(0);

    // === 3. Try to transfer user’s passport to otherUser (should fail) ===


    try {
      await passport.connect(user).transferFrom(user.address, otherUser.address, userId)
      assert.fail("Expected transaction to revert");
    } catch (err) {
      expect(err.message).to.include("Recipient already has a passport");
    }

    try {
      await passport.connect(user).transferFrom(user.address, hehe.address, userId)
    } catch (err) {
      expect(err.message).to.include("Recipient already has a passport");
    }
    // === 4. Optional: confirm ownership remains unchanged ===
    const currentOwner = await passport.ownerOf(userId);
    expect(currentOwner).to.equal(hehe.address);
  });

  it("should deploy InventoryFacet and integrate", async () => {
    const seenSelectors = new Set();
    const facet_init = ["InventoryFacet"];
    const facets = [];

    for (const fname of facet_init) {
      const Facet = await ethers.getContractFactory(fname, otherUser);
      const facet = await Facet.deploy();
      await facet.deployed();

      const loupe = await ethers.getContractAt("DiamondLoupeFacet", diamond.address);
      const existingSelectors = (await loupe.facets()).flatMap(f => f.functionSelectors);
      const newSelectors = getUniqueSelectors(facet, seenSelectors).filter(s => !existingSelectors.includes(s));

      facets.push({
        facetAddress: facet.address,
        action: 0, // Add
        functionSelectors: newSelectors,
      });
    }

    // Deploy facet into the diamond
    await diamond.connect(otherUser).deployFacet(facets, ["InventoryFacet"]);

    const inventory = await ethers.getContractAt("InventoryFacet", diamond.address);

    // Optional smoke test: ensure contract responds
    const items = await inventory.getUserItems(otherUser.address);
    expect(items.itemIds).to.be.an("array");
  });

  it("should correctly mint, transfer, and remove inventory items", async () => {
    const inv = await ethers.getContractAt("InventoryFacet", diamond.address);
    const itemId = 999;


    // Step 1: Add item
    await inv.connect(otherUser).addItem(itemId, "Axe", "Chop trees", "ipfs://axe", [
      { trait_type: "power", value: "300", display_type: "number", uri: "ipfs://axe.png" }
    ]);

    // Step 2: Mint item
    await inv.connect(otherUser).mint(user.address, itemId, 5);
    let balance = await inv.balanceOf(user.address, itemId);
    expect(balance.toNumber()).to.equal(5, "Initial mint failed");

    // Step 3: Transfer 2 items
    await inv.connect(user).safeTransferFrom(user.address, owner.address, itemId, 2, "0x");
    balance = await inv.balanceOf(user.address, itemId);
    expect(balance.toNumber()).to.equal(3, "Transfer didn't update balance correctly");

    // Step 4: Attempt over-transfer (should revert)
    // await expectRevert(
    //   inv.connect(otherUser).safeTransferFrom(otherUser.address, owner.address, itemId, 999, "0x"),
    //   "ERC1155: insufficient balance"
    // );

    // // Step 5: Remove the item
    await inv.connect(otherUser).removeItem(itemId);
    balance2 = await inv.balanceOf(user.address, itemId);

    // // Step 6: Confirm item is deleted
    // await expectRevert(inv.getItem(itemId), "Item does not exist");
  });


    it("should list all user items and passport holders", async () => {
      const inv = await ethers.getContractAt("InventoryFacet", diamond.address);
      const result = await inv.getUserItems(otherUser.address);
      expect(result.itemIds.length).to.equal(result.balances.length);

      const passport = await ethers.getContractAt("PassportFacet", diamond.address);
      const holders = await passport.getAllPassportHolders();
      expect(holders).to.include(otherUser.address);
    });

    it("should reject passport transfer to zero address", async () => {
      const passport = await ethers.getContractAt("PassportFacet", diamond.address);
      const tokenId = await passport.getTokenIdForWallet(user.address);
      await expectRevert(
        passport.connect(user).transferFrom(user.address, ethers.constants.AddressZero, tokenId)
      );
    });

    it("should reject over-transfer of inventory", async () => {
      const inv = await ethers.getContractAt("InventoryFacet", diamond.address);
      const itemId = 1001;

      await inv.connect(otherUser).addItem(itemId, "Sword", "Sharp blade", "ipfs://sword.png", [
        { trait_type: "damage", value: "100", display_type: "number", uri: "ipfs://damage.png" }
      ]);

      await inv.connect(otherUser).mint(user.address, itemId, 5);

      await expectRevert(
        inv.connect(user).safeTransferFrom(user.address, otherUser.address, itemId, 999, "0x")
      );
    });

    it("should allow passport approval and delegated transfer", async () => {
      const passport = await ethers.getContractAt("PassportFacet", diamond.address);
      const tokenId = await passport.getTokenIdForWallet(hehe.address);
      const pass= await passport.getAllPassportHolders()
      await passport.connect(hehe).approve(owner.address, tokenId);

      await passport.connect(owner).transferFrom(hehe.address, owner.address, tokenId);

      const newOwner = await passport.ownerOf(tokenId);
      expect(newOwner).to.equal(owner.address);
    });

    it("should allow setApprovalForAll for inventory transfers", async () => {
      const inv = await ethers.getContractAt("InventoryFacet", diamond.address);
      const itemId = 1002;

      // Ensure the item exists
      await inv.connect(otherUser).addItem(itemId, "Bow", "Long-range weapon", "ipfs://bow.png", [
        { trait_type: "range", value: "250", display_type: "number", uri: "ipfs://bow.png" }
      ]);

      await inv.connect(otherUser).mint(user.address, itemId, 5);

      // User approves otherUser for all inventory
      await inv.connect(user).setApprovalForAll(otherUser.address, true);

      // Delegate transfer
      await inv.connect(otherUser).safeTransferFrom(user.address, otherUser.address, itemId, 2, "0x");

      const newBalance = await inv.balanceOf(otherUser.address, itemId);
      expect(newBalance.toNumber()).to.equal(2);
    });



});
