/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const fs = require("fs");
require("@nomiclabs/hardhat-ethers");
// Load private key from secret.json safely
let privateKey = "";
if (fs.existsSync("./secret.json")) {
    const secret = JSON.parse(fs.readFileSync("./secret.json", "utf8"));
    privateKey = secret.PrivateKey;
    console.log(privateKey)
}

module.exports = {
    defaultNetwork: "testnet",

    networks: {
      hardhat: {
          chainId: 1110, // Set this to match the network
      },
      localhost: {
        url: "http://127.0.0.1:8545", // or "http://localhost:8545"
      },
        testnet: {
            url: "https://rpc.test2.btcs.network",
            accounts: privateKey ? [privateKey] : [],
            chainId: 1114,
        },
    },

    solidity: {
        compilers: [
            {
                version: "0.8.28",
                settings: {
                    evmVersion: "paris",
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },

    paths: {
        sources: "./contracts",
        cache: "./cache",
        artifacts: "./artifacts",
    },

    mocha: {
        timeout: 20000,
    },
};
