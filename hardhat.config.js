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
                chainId: 1337,
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
          version: "0.8.26",
          settings: {
            evmVersion: "shanghai",
            optimizer: {
              enabled: true,
              runs: 200,
            },
            outputSelection: {
              "*": {
                "*": [
                  "abi",
                  "evm.bytecode.object",
                  "evm.deployedBytecode.object",
                  "metadata"
                ]
              }
            }
          }
        }
      ]
    }
,

    paths: {
        sources: "./contracts",
        cache: "./cache",
        artifacts: "./artifacts",
    },

    mocha: {
        timeout: 20000,
    },
};
