# Core Game Engine – Diamond-Based Modular Architecture

This repository hosts the smart contract implementation for **Core Game Engine**, a modular, upgradeable, and extensible on-chain gaming infrastructure built on the [EIP-2535 Diamond Standard](https://eips.ethereum.org/EIPS/eip-2535). Inspired by `diamond-1-hardhat`, this framework supports **modular game protocols**, **per-game deployments**, and **custom extension modules** such as **inventory**, **passport**, and **game tokens**.

> **Live Deployment:**
> 🏭 **CoreGameFactory** (Main Deployment Address): `0x0F1C75b8aA1A294C52F6F120d73F33A75bd92BDB`
> 💠 **Example CoreGameProtocol Diamond (Agario)**: `0x9316626e8dED3409Caaaf4c2e7a46b2d5bb68f7A`


---

## 🧱 Motivation

Traditional monolithic smart contract systems make it hard to:

- Upgrade individual components without redeploying the whole system.
- Allow developers to create and manage game-specific logic with isolated modules.
- Extend games with user identities, inventories, or other mechanics without bloating the core protocol.

**CoreGameEngine** solves this via:

- A **Factory pattern** to deploy per-game diamonds (`CoreGameProtocol`) on demand.
- A **modular facet system** where each game or module (e.g., Inventory, Passport) is a plug-and-play facet.
- Built-in support for ERC721 (for user identities) and ERC1155 (for inventories, game items).

---

## 🗂️ Contract Structure

```
contracts/
├── CoreGameFactory.sol                # Main factory that deploys per-game diamonds
├── CoreGameProtocol.sol              # The core Diamond contract for each game
├── facets/
│   ├── DiamondCutFacet.sol           # Required facet for diamond upgrades
│   ├── DiamondLoupeFacet.sol        # Required for EIP-2535 inspection
│   ├── GameLogicFacet.sol            # Game-specific logic (e.g., Agario tick/update loop)
│   ├── InventoryFacet.sol            # ERC-1155-based inventory system
│   ├── PassportFacet.sol             # ERC-721-based identity/passport system
│   └── RolesFacet.sol                # Assign roles (Player, Admin, Moderator) per game
├── libraries/
│   └── LibDiamond.sol                # Diamond storage & internal logic
├── modules/
│   ├── ERC1155Inventory.sol          # Optional off-facet module (can also be a facet)
│   └── ERC721Passport.sol            # Identity NFT module
```

---

## 🚀 Deployment

1. Clone the repo:
```bash
git clone https://github.com/your-username/core-game-engine.git
cd core-game-engine
```

2. Install dependencies:
```bash
npm install
```

3. Deploy factory and diamond example:
```bash
npx hardhat run scripts/deployFactory.js --network <your-network>
npx hardhat run scripts/deployGame.js --network <your-network>
```

> Add your RPC or Hardhat network config in `hardhat.config.js`.

---

## 🧪 Testing

Run all unit tests:

```bash
npx hardhat test
```

---

## 🧩 Adding and Upgrading Facets

All facets can be dynamically added, replaced, or removed using the DiamondCutFacet.

```js
const diamondCut = await ethers.getContractAt("DiamondCutFacet", diamondAddress);
await diamondCut.diamondCut(
  [/* facet cuts */],
  ethers.constants.AddressZero,
  "0x"
);
```

Each facet must follow EIP-2535 and define function selectors using the `IDiamondCut.FacetCut` format.

---

## 📦 How to Use in Your Game

1. Deploy your own `CoreGameProtocol` via the factory.
2. Attach your game-specific logic (e.g., player updates, tick loop) as a facet.
3. Optionally attach Passport, Inventory, or new custom modules.
4. Use `ethers.getContractAt(facetName, gameAddress)` to call facet methods.

Example:
```js
const game = await ethers.getContractAt("GameLogicFacet", yourGameAddress);
await game.startTickLoop();
```

---

## 📘 Learn More About Diamonds

- [EIP-2535 Diamonds](https://eips.ethereum.org/EIPS/eip-2535)
- [Diamond Intro (Substack)](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard)
- [Awesome Diamonds](https://github.com/mudgen/awesome-diamonds)

---

## 📤 Community and Support

This implementation was inspired by [@mudgen](https://twitter.com/mudgen)'s work.

If you're building a game or module and want to integrate with the Core Game Engine, feel free to:

- Open an issue
- Submit a PR
- Reach out via Telegram or Twitter *(add your links if available)*

---

## 🪪 License

MIT — Use freely, modify extensively, attribute responsibly.
