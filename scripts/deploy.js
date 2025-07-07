const { ethers } = require("ethers");
const fs = require("fs");

console.log(ethers.providers)

async function main() {
  // Load private key securely from the secret.json file
  const secret = JSON.parse(fs.readFileSync("./secret.json", "utf8"));
  const privateKey = secret.PrivateKey;

  if (!privateKey) {
    console.error("Private key is missing in secret.json!");
    process.exit(1);
  }
  console.log("Loaded private key successfully.");

  // Setup provider and wallet using ethers.js
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.test2.btcs.network");
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log("Using wallet address:", wallet.address);

  // Deploy the Diamond contract (replace with correct ABI & Bytecode)
  // const Diamond = new ethers.ContractFactory(
  //   // ABI of the Diamond contract
  //   [
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_contractOwner",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "_diamondCutFacet",
  //           "type": "address"
  //         },
  //         {
  //           "components": [
  //             {
  //               "internalType": "address",
  //               "name": "facetAddress",
  //               "type": "address"
  //             },
  //             {
  //               "internalType": "enum IDiamond.FacetCutAction",
  //               "name": "action",
  //               "type": "uint8"
  //             },
  //             {
  //               "internalType": "bytes4[]",
  //               "name": "functionSelectors",
  //               "type": "bytes4[]"
  //             }
  //           ],
  //           "internalType": "struct IDiamond.FacetCut[]",
  //           "name": "_facetCuts",
  //           "type": "tuple[]"
  //         },
  //         {
  //           "internalType": "string",
  //           "name": "_name",
  //           "type": "string"
  //         },
  //         {
  //           "internalType": "string",
  //           "name": "_description",
  //           "type": "string"
  //         },
  //         {
  //           "internalType": "string",
  //           "name": "_genre",
  //           "type": "string"
  //         },
  //         {
  //           "internalType": "string",
  //           "name": "_imageURI",
  //           "type": "string"
  //         },
  //         {
  //           "internalType": "address[]",
  //           "name": "_pubKeys",
  //           "type": "address[]"
  //         }
  //       ],
  //       "stateMutability": "payable",
  //       "type": "constructor"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4",
  //           "name": "_selector",
  //           "type": "bytes4"
  //         }
  //       ],
  //       "name": "CannotAddFunctionToDiamondThatAlreadyExists",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4[]",
  //           "name": "_selectors",
  //           "type": "bytes4[]"
  //         }
  //       ],
  //       "name": "CannotAddSelectorsToZeroAddress",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4",
  //           "name": "_selector",
  //           "type": "bytes4"
  //         }
  //       ],
  //       "name": "CannotRemoveFunctionThatDoesNotExist",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4",
  //           "name": "_selector",
  //           "type": "bytes4"
  //         }
  //       ],
  //       "name": "CannotRemoveImmutableFunction",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4",
  //           "name": "_selector",
  //           "type": "bytes4"
  //         }
  //       ],
  //       "name": "CannotReplaceFunctionThatDoesNotExists",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4",
  //           "name": "_selector",
  //           "type": "bytes4"
  //         }
  //       ],
  //       "name": "CannotReplaceFunctionWithTheSameFunctionFromTheSameFacet",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4[]",
  //           "name": "_selectors",
  //           "type": "bytes4[]"
  //         }
  //       ],
  //       "name": "CannotReplaceFunctionsFromFacetWithZeroAddress",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4",
  //           "name": "_selector",
  //           "type": "bytes4"
  //         }
  //       ],
  //       "name": "CannotReplaceImmutableFunction",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint8",
  //           "name": "_action",
  //           "type": "uint8"
  //         }
  //       ],
  //       "name": "IncorrectFacetCutAction",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_initializationContractAddress",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "bytes",
  //           "name": "_calldata",
  //           "type": "bytes"
  //         }
  //       ],
  //       "name": "InitializationFunctionReverted",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_contractAddress",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "string",
  //           "name": "_message",
  //           "type": "string"
  //         }
  //       ],
  //       "name": "NoBytecodeAtAddress",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_facetAddress",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "NoSelectorsProvidedForFacetForCut",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_user",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "_contractOwner",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "NotContractOwner",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_facetAddress",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "RemoveFacetAddressMustBeZeroAddress",
  //       "type": "error"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "components": [
  //             {
  //               "internalType": "address",
  //               "name": "facetAddress",
  //               "type": "address"
  //             },
  //             {
  //               "internalType": "enum IDiamond.FacetCutAction",
  //               "name": "action",
  //               "type": "uint8"
  //             },
  //             {
  //               "internalType": "bytes4[]",
  //               "name": "functionSelectors",
  //               "type": "bytes4[]"
  //             }
  //           ],
  //           "indexed": false,
  //           "internalType": "struct IDiamond.FacetCut[]",
  //           "name": "_diamondCut",
  //           "type": "tuple[]"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "address",
  //           "name": "_init",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "bytes",
  //           "name": "_calldata",
  //           "type": "bytes"
  //         }
  //       ],
  //       "name": "DiamondCut",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "previousOwner",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "newOwner",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "OwnershipTransferred",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "previousOwner",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "newOwner",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "OwnershipTransferred",
  //       "type": "event"
  //     },
  //     {
  //       "stateMutability": "payable",
  //       "type": "fallback"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "inventoryFacetAddress",
  //       "outputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "owner",
  //       "outputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "passportFacetAddress",
  //       "outputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4",
  //           "name": "_interfaceId",
  //           "type": "bytes4"
  //         }
  //       ],
  //       "name": "supportsInterface",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "_newOwner",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "transferOwnership",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "stateMutability": "payable",
  //       "type": "receive"
  //     }
  //   ],
  //   "0x608060405260405161177c38038061177c83398101604081905261002291610dc8565b61002b88610066565b61004c866000604051806020016040528060008152506100e960201b60201c565b6100598585858585610282565b5050505050505050611273565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f80546001600160a01b031981166001600160a01b038481169182179093556040516000805160206116d1833981519152939092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b60005b835181101561023757600084828151811061010957610109610f06565b6020026020010151602001519050600085838151811061012b5761012b610f06565b6020026020010151600001519050600086848151811061014d5761014d610f06565b6020026020010151604001519050805160000361018d5760405163e767f91f60e01b81526001600160a01b03831660048201526024015b60405180910390fd5b60008360028111156101a1576101a1610f1c565b036101b5576101b08282610422565b61022c565b60018360028111156101c9576101c9610f1c565b036101d8576101b082826105c8565b60028360028111156101ec576101ec610f1c565b036101fb576101b08282610755565b82600281111561020d5761020d610f1c565b604051633ff4d20f60e11b815260ff9091166004820152602401610184565b5050506001016100ec565b507f8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb67383838360405161026b93929190610fa4565b60405180910390a161027d82826109d4565b505050565b6040805160808101825286815260208101869052908101849052606081018390527f74280a4b4c55f9103e616849087d6b766bc3336a420e6c0dacf24ec2d7d7ef8f90819081806102d38a826110f7565b50602082015160018201906102e890826110f7565b50604082015160028201906102fd90826110f7565b506060820151600382019061031290826110f7565b5090505060005b83518110156104185782600401600085838151811061033a5761033a610f06565b6020908102919091018101516001600160a01b031682528101919091526040016000205460ff1661041057600183600401600086848151811061037f5761037f610f06565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff021916908315150217905550826005018482815181106103d4576103d4610f06565b60209081029190910181015182546001810184556000938452919092200180546001600160a01b0319166001600160a01b039092169190911790555b600101610319565b5050505050505050565b6001600160a01b03821661044b57806040516302b8da0760e21b815260040161018491906111b5565b60008051602061175c83398151915254604080516060810190915260218082526000805160206116d183398151915292916104909186919061173b6020830139610a9a565b60005b83518110156105c15760008482815181106104b0576104b0610f06565b6020908102919091018101516001600160e01b031981166000908152918690526040909120549091506001600160a01b03161561050c5760405163ebbf5d0760e01b81526001600160e01b031982166004820152602401610184565b6040805180820182526001600160a01b03808916825261ffff80871660208085019182526001600160e01b0319871660009081528a8252958620945185549251909316600160a01b026001600160b01b0319909216929093169190911717909155600180870180549182018155835291206008820401805460e084901c60046007909416939093026101000a92830263ffffffff9093021916919091179055826105b5816111e5565b93505050600101610493565b5050505050565b6001600160a01b0382166105f1578060405163cd98a96f60e01b815260040161018491906111b5565b60006000805160206116d183398151915290506106268360405180606001604052806025815260200161171660259139610a9a565b60005b825181101561074f57600083828151811061064657610646610f06565b6020908102919091018101516001600160e01b031981166000908152918590526040909120549091506001600160a01b0316806106a257604051637479f93960e01b81526001600160e01b031983166004820152602401610184565b856001600160a01b0316816001600160a01b0316036106e057604051631ac6ce8d60e11b81526001600160e01b031983166004820152602401610184565b306001600160a01b0382160361071557604051632901806d60e11b81526001600160e01b031983166004820152602401610184565b506001600160e01b031916600090815260208390526040902080546001600160a01b0319166001600160a01b038616179055600101610629565b50505050565b6001600160a01b038216156107885760405163d091bc8160e01b81526001600160a01b0383166004820152602401610184565b60008051602061175c833981519152546000805160206116d18339815191529060005b83518110156105c15760008482815181106107c8576107c8610f06565b6020908102919091018101516001600160e01b0319811660009081528683526040908190208151808301909252546001600160a01b038116808352600160a01b90910461ffff16938201939093529092509061084357604051637a08a22d60e01b81526001600160e01b031983166004820152602401610184565b8051306001600160a01b039091160361087b57604051630df5fd6160e31b81526001600160e01b031983166004820152602401610184565b8361088581611206565b94505083816020015161ffff16146109635760008560010185815481106108ae576108ae610f06565b90600052602060002090600891828204019190066004029054906101000a900460e01b90508086600101836020015161ffff16815481106108f1576108f1610f06565b600091825260208083206008830401805463ffffffff60079094166004026101000a938402191660e09590951c92909202939093179055838201516001600160e01b03199390931681529087905260409020805461ffff60a01b1916600160a01b61ffff909316929092029190911790555b846001018054806109765761097661121d565b60008281526020808220600860001990940193840401805463ffffffff600460078716026101000a0219169055919092556001600160e01b0319909316815291859052506040902080546001600160b01b03191690556001016107ab565b6001600160a01b0382166109e6575050565b610a08826040518060600160405280602581526020016116f160259139610a9a565b600080836001600160a01b031683604051610a239190611233565b600060405180830381855af49150503d8060008114610a5e576040519150601f19603f3d011682016040523d82523d6000602084013e610a63565b606091505b50915091508161074f57805115610a7d5780518060208301fd5b838360405163192105d760e01b815260040161018492919061124f565b813b600081900361027d57828260405163919834b960e01b815260040161018492919061124f565b80516001600160a01b0381168114610ad957600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b604051606081016001600160401b0381118282101715610b1657610b16610ade565b60405290565b604051601f8201601f191681016001600160401b0381118282101715610b4457610b44610ade565b604052919050565b60006001600160401b03821115610b6557610b65610ade565b5060051b60200190565b600082601f830112610b8057600080fd5b8151610b93610b8e82610b4c565b610b1c565b8082825260208201915060208360051b860101925085831115610bb557600080fd5b602085015b83811015610cca5780516001600160401b03811115610bd857600080fd5b86016060818903601f19011215610bee57600080fd5b610bf6610af4565b610c0260208301610ac2565b8152604082015160038110610c1657600080fd5b602082015260608201516001600160401b03811115610c3457600080fd5b60208184010192505088601f830112610c4c57600080fd5b8151610c5a610b8e82610b4c565b8082825260208201915060208360051b86010192508b831115610c7c57600080fd5b6020850194505b82851015610cb45784516001600160e01b031981168114610ca357600080fd5b825260209485019490910190610c83565b6040840152505084525060209283019201610bba565b5095945050505050565b60005b83811015610cef578181015183820152602001610cd7565b50506000910152565b600082601f830112610d0957600080fd5b81516001600160401b03811115610d2257610d22610ade565b610d35601f8201601f1916602001610b1c565b818152846020838601011115610d4a57600080fd5b610d5b826020830160208701610cd4565b949350505050565b600082601f830112610d7457600080fd5b8151610d82610b8e82610b4c565b8082825260208201915060208360051b860101925085831115610da457600080fd5b602085015b83811015610cca57610dba81610ac2565b835260209283019201610da9565b600080600080600080600080610100898b031215610de557600080fd5b610dee89610ac2565b9750610dfc60208a01610ac2565b60408a01519097506001600160401b03811115610e1857600080fd5b610e248b828c01610b6f565b60608b015190975090506001600160401b03811115610e4257600080fd5b610e4e8b828c01610cf8565b60808b015190965090506001600160401b03811115610e6c57600080fd5b610e788b828c01610cf8565b60a08b015190955090506001600160401b03811115610e9657600080fd5b610ea28b828c01610cf8565b60c08b015190945090506001600160401b03811115610ec057600080fd5b610ecc8b828c01610cf8565b60e08b015190935090506001600160401b03811115610eea57600080fd5b610ef68b828c01610d63565b9150509295985092959890939650565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b600081518084526020840193506020830160005b82811015610f6e5781516001600160e01b031916865260209586019590910190600101610f46565b5093949350505050565b60008151808452610f90816020860160208601610cd4565b601f01601f19169290920160200192915050565b6000606082016060835280865180835260808501915060808160051b86010192506020880160005b8281101561104757868503607f19018452815180516001600160a01b0316865260208101516003811061100f57634e487b7160e01b600052602160045260246000fd5b8060208801525060408101519050606060408701526110316060870182610f32565b9550506020938401939190910190600101610fcc565b5050506001600160a01b038616602085015250828103604084015261106c8185610f78565b9695505050505050565b600181811c9082168061108a57607f821691505b6020821081036110aa57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561027d57806000526020600020601f840160051c810160208510156110d75750805b601f840160051c820191505b818110156105c157600081556001016110e3565b81516001600160401b0381111561111057611110610ade565b6111248161111e8454611076565b846110b0565b6020601f82116001811461115857600083156111405750848201515b600019600385901b1c1916600184901b1784556105c1565b600084815260208120601f198516915b828110156111885787850151825560209485019460019092019101611168565b50848210156111a65786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6020815260006111c86020830184610f32565b9392505050565b634e487b7160e01b600052601160045260246000fd5b600061ffff821661ffff81036111fd576111fd6111cf565b60010192915050565b600081611215576112156111cf565b506000190190565b634e487b7160e01b600052603160045260246000fd5b60008251611245818460208701610cd4565b9190910192915050565b6001600160a01b0383168152604060208201819052600090610d5b90830184610f78565b61044f806112826000396000f3fe60806040526004361061004e5760003560e01c806301ffc9a71461010f5780637bf39e051461017d5780638da5cb5b146101b5578063f2fde38b146101ca578063fdd705b4146101ea57610055565b3661005557005b600080356001600160e01b03191681527fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c60205260409020546001600160a01b0316806100e95760405162461bcd60e51b815260206004820181905260248201527f4469616d6f6e643a2046756e6374696f6e20646f6573206e6f7420657869737460448201526064015b60405180910390fd5b3660008037600080366000845af43d6000803e808015610108573d6000f35b3d6000fd5b005b34801561011b57600080fd5b5061016861012a36600461039f565b6001600160e01b03191660009081527fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e602052604090205460ff1690565b60405190151581526020015b60405180910390f35b34801561018957600080fd5b5060015461019d906001600160a01b031681565b6040516001600160a01b039091168152602001610174565b3480156101c157600080fd5b5061019d61020a565b3480156101d657600080fd5b5061010d6101e53660046103d0565b610230565b3480156101f657600080fd5b5060005461019d906001600160a01b031681565b600061022b6000805160206103fa833981519152546001600160a01b031690565b905090565b6102386102a8565b60006102596000805160206103fa833981519152546001600160a01b031690565b90506102648261031c565b816001600160a01b0316816001600160a01b03167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c600301546001600160a01b0316331461031a576000805160206103fa83398151915254604051600162bed83560e01b031981523360048201526001600160a01b0390911660248201526044016100e0565b565b6000805160206103fa83398151915280546001600160a01b031981166001600160a01b038481169182179093556040517fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c939092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6000602082840312156103b157600080fd5b81356001600160e01b0319811681146103c957600080fd5b9392505050565b6000602082840312156103e257600080fd5b81356001600160a01b03811681146103c957600080fdfec8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131fa26469706673582212200ef7887c1160887e10645843115b7101da662416cc21728967ac019c496bb09764736f6c634300081c0033c8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c4c69624469616d6f6e643a205f696e6974206164647265737320686173206e6f20636f64654c69624469616d6f6e643a205265706c61636520666163657420686173206e6f20636f64654c69624469616d6f6e643a2041646420666163657420686173206e6f20636f6465c8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131d", // Bytecode of Diamond contract
  //   wallet
  // );

  // const diamond = await Diamond.deploy();
  // console.log("Diamond contract deployed at:", diamond.address);

  // Define Facet Details (Replace with correct ABI and Bytecode for each facet)
  const facets = [
    {
      name: "DiamondLoupeFacet",
      abi: [
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_functionSelector",
              "type": "bytes4"
            }
          ],
          "name": "facetAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "facetAddress_",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "facetAddresses",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "facetAddresses_",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_facet",
              "type": "address"
            }
          ],
          "name": "facetFunctionSelectors",
          "outputs": [
            {
              "internalType": "bytes4[]",
              "name": "_facetFunctionSelectors",
              "type": "bytes4[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "facets",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "facetAddress",
                  "type": "address"
                },
                {
                  "internalType": "bytes4[]",
                  "name": "functionSelectors",
                  "type": "bytes4[]"
                }
              ],
              "internalType": "struct IDiamondLoupe.Facet[]",
              "name": "facets_",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "_interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ],
      bytecode: "0x6080604052348015600f57600080fd5b50610a4e8061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806301ffc9a71461005c57806352ef6b2c146100bd5780637a0ed627146100d2578063adfca15e146100e7578063cdffacc614610107575b600080fd5b6100a861006a3660046107f8565b6001600160e01b03191660009081527fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131e602052604090205460ff1690565b60405190151581526020015b60405180910390f35b6100c561015f565b6040516100b49190610829565b6100da6102ec565b6040516100b491906108bb565b6100fa6100f5366004610940565b6106ba565b6040516100b49190610969565b6101476101153660046107f8565b6001600160e01b03191660009081526000805160206109f983398151915260205260409020546001600160a01b031690565b6040516001600160a01b0390911681526020016100b4565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131d546060906000805160206109f9833981519152908067ffffffffffffffff8111156101ad576101ad61097c565b6040519080825280602002602001820160405280156101d6578160200160208202803683370190505b5092506000805b828110156102e25760008460010182815481106101fc576101fc610992565b6000918252602080832060088304015460079092166004026101000a90910460e01b6001600160e01b0319811683529087905260408220549092506001600160a01b031690805b8581101561028e5788818151811061025d5761025d610992565b60200260200101516001600160a01b0316836001600160a01b031603610286576001915061028e565b600101610243565b50801561029e57506102da915050565b818886815181106102b1576102b1610992565b6001600160a01b0390921660209283029190910190910152846102d3816109be565b9550505050505b6001016101dd565b5080845250505090565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131d546060906000805160206109f9833981519152908067ffffffffffffffff81111561033a5761033a61097c565b60405190808252806020026020018201604052801561038057816020015b6040805180820190915260008152606060208201528152602001906001900390816103585790505b50925060008167ffffffffffffffff81111561039e5761039e61097c565b6040519080825280602002602001820160405280156103c7578160200160208202803683370190505b5090506000805b838110156106525760008560010182815481106103ed576103ed610992565b6000918252602080832060088304015460079092166004026101000a90910460e01b6001600160e01b0319811683529088905260408220549092506001600160a01b031690805b8581101561052057826001600160a01b03168a828151811061045857610458610992565b6020026020010151600001516001600160a01b03160361051857838a828151811061048557610485610992565b6020026020010151602001518883815181106104a3576104a3610992565b602002602001015161ffff16815181106104bf576104bf610992565b60200260200101906001600160e01b03191690816001600160e01b031916815250508681815181106104f3576104f3610992565b602002602001018051809190610508906109d7565b61ffff1690525060019150610520565b600101610434565b508015610530575061064a915050565b8189868151811061054357610543610992565b60209081029190910101516001600160a01b0390911690528667ffffffffffffffff8111156105745761057461097c565b60405190808252806020026020018201604052801561059d578160200160208202803683370190505b508986815181106105b0576105b0610992565b602002602001015160200181905250828986815181106105d2576105d2610992565b6020026020010151602001516000815181106105f0576105f0610992565b60200260200101906001600160e01b03191690816001600160e01b03191681525050600186868151811061062657610626610992565b61ffff9092166020928302919091019091015284610643816109be565b9550505050505b6001016103ce565b5060005b818110156106af57600083828151811061067257610672610992565b602002602001015161ffff169050600087838151811061069457610694610992565b60209081029190910181015101519190915250600101610656565b508085525050505090565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131d546060906000805160206109f98339815191529060008167ffffffffffffffff81111561070a5761070a61097c565b604051908082528060200260200182016040528015610733578160200160208202803683370190505b50935060005b828110156107ed57600084600101828154811061075857610758610992565b6000918252602080832060088304015460079092166004026101000a90910460e01b6001600160e01b031981168352908790526040909120549091506001600160a01b039081169088168190036107e357818785815181106107bc576107bc610992565b6001600160e01b031990921660209283029190910190910152836107df816109be565b9450505b5050600101610739565b508352509092915050565b60006020828403121561080a57600080fd5b81356001600160e01b03198116811461082257600080fd5b9392505050565b602080825282518282018190526000918401906040840190835b8181101561086a5783516001600160a01b0316835260209384019390920191600101610843565b509095945050505050565b600081518084526020840193506020830160005b828110156108b15781516001600160e01b031916865260209586019590910190600101610889565b5093949350505050565b6000602082016020835280845180835260408501915060408160051b86010192506020860160005b8281101561093457868503603f19018452815180516001600160a01b0316865260209081015160409187018290529061091e90870182610875565b95505060209384019391909101906001016108e3565b50929695505050505050565b60006020828403121561095257600080fd5b81356001600160a01b038116811461082257600080fd5b6020815260006108226020830184610875565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016109d0576109d06109a8565b5060010190565b600061ffff821661ffff81036109ef576109ef6109a8565b6001019291505056fec8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131ca264697066735822122010e202d9bacb2f082a2344ebc5d3786fd49bedadb8cd460b0514046c42b2094364736f6c634300081c0033", // Bytecode of FacetOne
    },
    {
      name: "FacetTwo",
      abi:[
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_contractOwner",
              "type": "address"
            }
          ],
          "name": "NotContractOwner",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "owner_",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      bytecode: "0x6080604052348015600f57600080fd5b506102458061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80638da5cb5b1461003b578063f2fde38b1461005f575b600080fd5b610043610074565b6040516001600160a01b03909116815260200160405180910390f35b61007261006d3660046101df565b6100ac565b005b60006100a77fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f546001600160a01b031690565b905090565b6100b46100c0565b6100bd8161014a565b50565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c600301546001600160a01b03163314610148577fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f5460408051600162bed83560e01b031981523360048201526001600160a01b039092166024830152519081900360440190fd5b565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f80546001600160a01b031981166001600160a01b038481169182179093556040517fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c939092169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3505050565b6000602082840312156101f157600080fd5b81356001600160a01b038116811461020857600080fd5b939250505056fea2646970667358221220f31134e05da5f1ccd94668c44eaeeba41402cd9b95304831311addb2c4108d0764736f6c634300081c0033", // Bytecode of FacetTwo
    },
    {
      name: "FacetThree",
      abi:[
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "BaseTokenURISet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [],
          "name": "GlobalAttributesSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [],
          "name": "GlobalUserMetadataTemplateSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "ItemTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "PassportApproved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "PassportAttributesUpdated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "PassportMinted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            }
          ],
          "name": "PassportMintedBatch",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "PassportTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            }
          ],
          "name": "PassportTransferredBatch",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "UserMetadataUpdated",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllPassportHolders",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllPassports",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getApproved",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getPassportAttributes",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "trait_type",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "display_type",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "uri",
                  "type": "string"
                }
              ],
              "internalType": "struct LibPassportStorage.Attribute[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getTokenIdForWallet",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getUserMetadata",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "trait_type",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "uri",
                  "type": "string"
                }
              ],
              "internalType": "struct LibPassportStorage.MetadataField[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            }
          ],
          "name": "mintBatch",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            }
          ],
          "name": "safeBatchTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "uri",
              "type": "string"
            }
          ],
          "name": "setBaseTokenURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string[]",
              "name": "trait_types",
              "type": "string[]"
            },
            {
              "internalType": "string[]",
              "name": "values",
              "type": "string[]"
            },
            {
              "internalType": "string[]",
              "name": "display_types",
              "type": "string[]"
            },
            {
              "internalType": "string[]",
              "name": "uris",
              "type": "string[]"
            }
          ],
          "name": "setGlobalAttributes",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string[]",
              "name": "trait_types",
              "type": "string[]"
            },
            {
              "internalType": "string[]",
              "name": "values",
              "type": "string[]"
            },
            {
              "internalType": "string[]",
              "name": "uris",
              "type": "string[]"
            }
          ],
          "name": "setGlobalUserMetadataTemplate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "pure",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "tokenURI",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "trait_type",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "display_type",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "uri",
                  "type": "string"
                }
              ],
              "internalType": "struct LibPassportStorage.Attribute[]",
              "name": "attrs",
              "type": "tuple[]"
            }
          ],
          "name": "updatePassportAttributes",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "trait_type",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "uri",
                  "type": "string"
                }
              ],
              "internalType": "struct LibPassportStorage.MetadataField[]",
              "name": "fields",
              "type": "tuple[]"
            }
          ],
          "name": "updateUserMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      bytecode: "0x6080604052348015600f57600080fd5b506136008061001f6000396000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c80636352211e116100de5780639c48774f11610097578063c87b56dd11610071578063c87b56dd1461036d578063cf86ea3914610380578063d69bcfea146103a0578063e985e9c5146103b557600080fd5b80639c48774f14610334578063a22cb46514610347578063b88d4fde1461035a57600080fd5b80636352211e146102bd5780636949a99f146102d057806370a08231146102e357806375ceb34114610304578063930f6fe71461031757806395d89b411461032c57600080fd5b806310ebab4b1161014b57806323b872dd1161012557806323b872dd1461026457806330176e131461027757806342842e0e1461028a578063619dd60b1461029d57600080fd5b806310ebab4b146102365780631249c58b14610249578063200125d21461025157600080fd5b80630193fd911461019357806301ffc9a7146101a8578063034601ec146101d057806306fdde03146101e3578063081812fc146101f8578063095ea7b314610223575b600080fd5b6101a66101a1366004612787565b6103c8565b005b6101bb6101b63660046127d2565b610510565b60405190151581526020015b60405180910390f35b6101a66101de36600461281f565b610547565b6101eb61063a565b6040516101c791906128cf565b61020b6102063660046128e2565b6106d2565b6040516001600160a01b0390911681526020016101c7565b6101a66102313660046128fb565b6106f9565b6101a6610244366004612925565b610810565b6101a6610a74565b6101a661025f3660046129c8565b610d65565b6101a6610272366004612a9b565b611049565b6101a6610285366004612b19565b61107f565b6101a6610298366004612a9b565b6110fb565b6102b06102ab3660046128e2565b611106565b6040516101c79190612b5a565b61020b6102cb3660046128e2565b6113c9565b6101a66102de366004612787565b6113f0565b6102f66102f1366004612c1a565b61163a565b6040519081526020016101c7565b6101a6610312366004612c35565b611666565b61031f6117f2565b6040516101c79190612c6e565b6101eb6118c6565b6102f6610342366004612c1a565b6118de565b6101a6610355366004612cb1565b61190a565b6101a6610368366004612ced565b61198d565b6101eb61037b3660046128e2565b61199f565b61039361038e3660046128e2565b611a34565b6040516101c79190612d5b565b6103a8611c5a565b6040516101c79190612df5565b6101bb6103c3366004612e36565b611cc4565b6103d133611d01565b6103f65760405162461bcd60e51b81526004016103ed90612e69565b60405180910390fd5b6000610401846113c9565b6001600160a01b0316036104475760405162461bcd60e51b815260206004820152600d60248201526c24b73b30b634b2103a37b5b2b760991b60448201526064016103ed565b61044f611d92565b60008481526009919091016020526040812061046a91612629565b60005b818110156104df5761047d611d92565b6000858152600991909101602052604090208383838181106104a1576104a1612e91565b90506020028101906104b39190612ea7565b8154600181018355600092835260209092209091600402016104d58282613072565b505060010161046d565b5060405183907f42aef131d28b92f4b4eb6c7395ca3cc94a817a2d9678bc46381bdd89c54f145590600090a2505050565b60006001600160e01b031982166380ac58cd60e01b148061054157506001600160e01b03198216635b5e139f60e01b145b92915050565b6000816001600160401b0381111561056157610561612f0d565b60405190808252806020026020018201604052801561058a578160200160208202803683370190505b50905060005b828110156105e75760008484838181106105ac576105ac612e91565b9050602002013590506105c0878783611db6565b808383815181106105d3576105d3612e91565b602090810291909101015250600101610590565b50836001600160a01b0316856001600160a01b03167f30238e16cd5f35581249dce1072ab9c2a32af3d4e781fd1f9c4832e54ca7dbf38360405161062b9190612c6e565b60405180910390a35050505050565b6060610644611d92565b805461064f90612f23565b80601f016020809104026020016040519081016040528092919081815260200182805461067b90612f23565b80156106c85780601f1061069d576101008083540402835291602001916106c8565b820191906000526020600020905b8154815290600101906020018083116106ab57829003601f168201915b5050505050905090565b60006106dc611d92565b60009283526006016020525060409020546001600160a01b031690565b6000610704826113c9565b905060006107128233611cc4565b9050816001600160a01b0316846001600160a01b0316036107755760405162461bcd60e51b815260206004820152601960248201527f417070726f76616c20746f2063757272656e74206f776e65720000000000000060448201526064016103ed565b336001600160a01b03831614806107895750805b6107a55760405162461bcd60e51b81526004016103ed90612e69565b836107ae611d92565b6000858152600691909101602052604080822080546001600160a01b0319166001600160a01b0394851617905551859287811692908616917fed07692b9e85f152a0d34191fb2c409c997274fcdce8df22565d530b55d4b0079190a450505050565b61081933611d01565b6108355760405162461bcd60e51b81526004016103ed90612e69565b600061083f611d92565b9050858414801561084f57508382145b6108865760405162461bcd60e51b815260206004820152600860248201526709ad2e6dac2e8c6d60c31b60448201526064016103ed565b60005b86811015610a415760008888838181106108a5576108a5612e91565b90506020028101906108b79190612ec7565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505060408051606081019091528381529293505060208201905088888581811061091357610913612e91565b90506020028101906109259190612ec7565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525050509082525060200186868581811061097157610971612e91565b90506020028101906109839190612ec7565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050915250604051600d8501906109cc90849061318e565b908152604051908190036020019020815181906109e990826131a0565b50602082015160018201906109fe90826131a0565b5060408201516002820190610a1390826131a0565b505050600e830180546001810182556000918252602090912001610a3782826131a0565b5050600101610889565b506040517f4bfaecb7d94b190b9c0b18ae6017d714df44399b57eebc5da4b663db8397b04490600090a150505050505050565b6000610a7e611d92565b33600090815260088201602052604090205490915015610ad15760405162461bcd60e51b815260206004820152600e60248201526d105b1c9958591e481b5a5b9d195960921b60448201526064016103ed565b60008160030160008154610ae49061326e565b9182905550336000818152600885016020908152604080832085905584835260048701825280832080546001600160a01b03191685179055928252600586019052908120805492935090610b378361326e565b9091555050600f820180546001818101835560008381526020902090910180546001600160a01b031916331790559054610b719190613287565b3360009081526010840160205260408120919091555b600b830154811015610c4c5760008281526009840160205260409020600b84018054600a8601919084908110610bbf57610bbf612e91565b90600052602060002001604051610bd6919061330c565b90815260405160209181900382019020825460018101845560009384529190922060049091020180610c088382613318565b50600181810190610c1b90840182613318565b50600281810190610c2e90840182613318565b50600381810190610c4190840182613318565b505050600101610b87565b5060005b600e830154811015610d02576000828152600c840160205260409020600e84018054600d8601919084908110610c8857610c88612e91565b90600052602060002001604051610c9f919061330c565b90815260405160209181900382019020825460018101845560009384529190922060039091020180610cd18382613318565b50600181810190610ce490840182613318565b50600281810190610cf790840182613318565b505050600101610c50565b506001610d0d611d92565b33600081815260079290920160209081526040808420909152808320805460ff19169415159490941790935591518392917f2cf689e09cb05e7e71be603090df76ef66fdfd5f723f4086dd4b3d6eee5c43d991a35050565b610d6e33611d01565b610d8a5760405162461bcd60e51b81526004016103ed90612e69565b6000610d94611d92565b90508786148015610da457508584145b8015610daf57508382145b610de65760405162461bcd60e51b815260206004820152600860248201526709ad2e6dac2e8c6d60c31b60448201526064016103ed565b60005b888110156110145760008a8a83818110610e0557610e05612e91565b9050602002810190610e179190612ec7565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250506040805160808101909152838152929350506020820190508a8a85818110610e7357610e73612e91565b9050602002810190610e859190612ec7565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250602001888885818110610ed157610ed1612e91565b9050602002810190610ee39190612ec7565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250505090825250602001868685818110610f2f57610f2f612e91565b9050602002810190610f419190612ec7565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050915250604051600a850190610f8a90849061318e565b90815260405190819003602001902081518190610fa790826131a0565b5060208201516001820190610fbc90826131a0565b5060408201516002820190610fd190826131a0565b5060608201516003820190610fe690826131a0565b505050600b83018054600181018255600091825260209091200161100a82826131a0565b5050600101610de9565b506040517fabdbf9347315322cea948f32e317868e586cc48b7b5cc90c756c9f9ac00e302f90600090a1505050505050505050565b611053338261216c565b61106f5760405162461bcd60e51b81526004016103ed90612e69565b61107a838383611db6565b505050565b61108833611d01565b6110a45760405162461bcd60e51b81526004016103ed90612e69565b81816110ae611d92565b600201916110bd919083612fb9565b507f2e9b34e5ec7377754a85ec13c1e9a442a00db0c46dbdefbb143dd0371fd20c1c82826040516110ef9291906133df565b60405180910390a15050565b61107a838383611049565b6060611110611d92565b6009016000838152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b828210156113be578382906000526020600020906004020160405180608001604052908160008201805461117790612f23565b80601f01602080910402602001604051908101604052809291908181526020018280546111a390612f23565b80156111f05780601f106111c5576101008083540402835291602001916111f0565b820191906000526020600020905b8154815290600101906020018083116111d357829003601f168201915b5050505050815260200160018201805461120990612f23565b80601f016020809104026020016040519081016040528092919081815260200182805461123590612f23565b80156112825780601f1061125757610100808354040283529160200191611282565b820191906000526020600020905b81548152906001019060200180831161126557829003601f168201915b5050505050815260200160028201805461129b90612f23565b80601f01602080910402602001604051908101604052809291908181526020018280546112c790612f23565b80156113145780601f106112e957610100808354040283529160200191611314565b820191906000526020600020905b8154815290600101906020018083116112f757829003601f168201915b5050505050815260200160038201805461132d90612f23565b80601f016020809104026020016040519081016040528092919081815260200182805461135990612f23565b80156113a65780601f1061137b576101008083540402835291602001916113a6565b820191906000526020600020905b81548152906001019060200180831161138957829003601f168201915b50505050508152505081526020019060010190611144565b505050509050919050565b60006113d3611d92565b60009283526004016020525060409020546001600160a01b031690565b336113fa846113c9565b6001600160a01b0316146114415760405162461bcd60e51b815260206004820152600e60248201526d2737ba103cb7bab9103a37b5b2b760911b60448201526064016103ed565b600061144b611d92565b600e81015490915082146114ab5760405162461bcd60e51b815260206004820152602160248201527f496e76616c6964206e756d626572206f66206d65746164617461206669656c646044820152607360f81b60648201526084016103ed565b60005b828110156115835781600e0181815481106114cb576114cb612e91565b906000526020600020016040516114e2919061330c565b60405180910390208484838181106114fc576114fc612e91565b905060200281019061150e919061340e565b6115189080612ec7565b604051611526929190613424565b60405180910390201461157b5760405162461bcd60e51b815260206004820152601760248201527f4d69736d617463686564206d65746164617461206b657900000000000000000060448201526064016103ed565b6001016114ae565b506000848152600c82016020526040812061159d9161264d565b60005b82811015611608576000858152600c8301602052604090208484838181106115ca576115ca612e91565b90506020028101906115dc919061340e565b8154600181018355600092835260209092209091600302016115fe8282613434565b50506001016115a0565b5060405184907f662ddeed9d1d8fc9e230542912ab9401ea29ff1e9d9e5a57231cbd8e70b6bb6490600090a250505050565b6000611644611d92565b6001600160a01b03909216600090815260059290920160205250604090205490565b61166f33611d01565b61168b5760405162461bcd60e51b81526004016103ed90612e69565b6000816001600160401b038111156116a5576116a5612f0d565b6040519080825280602002602001820160405280156116ce578160200160208202803683370190505b50905060005b828110156117aa5760008484838181106116f0576116f0612e91565b905060200201359050611701611d92565b6001600160a01b038716600090815260089190910160205260409020541561175c5760405162461bcd60e51b815260206004820152600e60248201526d105b1c9958591e481b5a5b9d195960921b60448201526064016103ed565b8083838151811061176f5761176f612e91565b60200260200101818152505080611784611d92565b6001600160a01b03881660009081526008919091016020526040902055506001016116d4565b50836001600160a01b03167f5a62a4466f80690d19fa0d0ecbd2bb4458dbf361563b6ef1d08414e0639148f2826040516117e49190612c6e565b60405180910390a250505050565b606060006117fe611d92565b600f8101549091506000816001600160401b0381111561182057611820612f0d565b604051908082528060200260200182016040528015611849578160200160208202803683370190505b50905060005b828110156118be5783600801600085600f01838154811061187257611872612e91565b60009182526020808320909101546001600160a01b0316835282019290925260400190205482518390839081106118ab576118ab612e91565b602090810291909101015260010161184f565b509392505050565b60606118d0611d92565b600101805461064f90612f23565b60006118e8611d92565b6001600160a01b03909216600090815260089290920160205250604090205490565b80611913611d92565b336000818152600792909201602090815260408084206001600160a01b038816808652925292839020805494151560ff199095169490941790935590517f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319061198190851515815260200190565b60405180910390a35050565b611998858585611049565b5050505050565b606060006119ac836113c9565b6001600160a01b0316036119f95760405162461bcd60e51b8152602060048201526014602482015273151bdad95b88191bd95cc81b9bdd08195e1a5cdd60621b60448201526064016103ed565b611a01611d92565b600201611a0d836121cb565b604051602001611a1e929190613527565b6040516020818303038152906040529050919050565b6060611a3e611d92565b600c016000838152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b828210156113be5783829060005260206000209060030201604051806060016040529081600082018054611aa590612f23565b80601f0160208091040260200160405190810160405280929190818152602001828054611ad190612f23565b8015611b1e5780601f10611af357610100808354040283529160200191611b1e565b820191906000526020600020905b815481529060010190602001808311611b0157829003601f168201915b50505050508152602001600182018054611b3790612f23565b80601f0160208091040260200160405190810160405280929190818152602001828054611b6390612f23565b8015611bb05780601f10611b8557610100808354040283529160200191611bb0565b820191906000526020600020905b815481529060010190602001808311611b9357829003601f168201915b50505050508152602001600282018054611bc990612f23565b80601f0160208091040260200160405190810160405280929190818152602001828054611bf590612f23565b8015611c425780601f10611c1757610100808354040283529160200191611c42565b820191906000526020600020905b815481529060010190602001808311611c2557829003601f168201915b50505050508152505081526020019060010190611a72565b6060611c64611d92565b600f018054806020026020016040519081016040528092919081815260200182805480156106c857602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311611c9d575050505050905090565b6000611cce611d92565b6001600160a01b039384166000908152600791909101602090815260408083209490951682529290925250205460ff1690565b6000611d347fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f546001600160a01b031690565b6001600160a01b0316826001600160a01b031603611d5457506001919050565b506001600160a01b031660009081527f74280a4b4c55f9103e616849087d6b766bc3336a420e6c0dacf24ec2d7d7ef93602052604090205460ff1690565b7fa94ee65e5cde08120007cf11724b7ceacd0a62f5c31251df347a1ebf372267ae90565b6000611dc0611d92565b9050836001600160a01b0316611dd5836113c9565b6001600160a01b031614611e175760405162461bcd60e51b81526020600482015260096024820152682737ba1037bbb732b960b91b60448201526064016103ed565b6001600160a01b038316611e6d5760405162461bcd60e51b815260206004820152601f60248201527f43616e6e6f74207472616e7366657220746f207a65726f20616464726573730060448201526064016103ed565b6001600160a01b038316600090815260088201602052604090205415611ed55760405162461bcd60e51b815260206004820181905260248201527f526563697069656e7420616c72656164792068617320612070617373706f727460448201526064016103ed565b7ff7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a769458054604080516020808402820181019092528281527ff7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a76943936000939192909190830182828015611f6457602002820191906000526020600020905b815481526020019060010190808311611f50575b5050505050905060005b8151811015612014576001600160a01b0386166000908152600384016020526040812083518290859085908110611fa757611fa7612e91565b6020026020010151815260200190815260200160002054111561200c5760405162461bcd60e51b815260206004820152601f60248201527f526563697069656e7420616c72656164792068617320696e76656e746f72790060448201526064016103ed565b600101611f6e565b506000848152600484016020908152604080832080546001600160a01b0319166001600160a01b038a8116919091179091558916835260058601909152812080549161205f8361354c565b90915550506001600160a01b0385166000908152600584016020526040812080549161208a8361326e565b90915550506001600160a01b0380871660009081526008850160205260408082208290559187168152208490556120c0866122cb565b600f830180546001808201835560008381526020902090910180546001600160a01b0319166001600160a01b03891617905590546120fe9190613287565b6001600160a01b038616600090815260108501602052604090205561212386866123e3565b83856001600160a01b0316876001600160a01b03167f8a2c16349b369bbd51ff2ba33654eafdf9baf937815ec1d57d2ae858bf0b75e860405160405180910390a4505050505050565b600080612178836113c9565b9050806001600160a01b0316846001600160a01b031614806121b35750836001600160a01b03166121a8846106d2565b6001600160a01b0316145b806121c357506121c38185611cc4565b949350505050565b6060816000036121f25750506040805180820190915260018152600360fc1b602082015290565b8160005b811561221c57806122068161326e565b91506122159050600a83613579565b91506121f6565b6000816001600160401b0381111561223657612236612f0d565b6040519080825280601f01601f191660200182016040528015612260576020820181803683370190505b5090505b84156121c357612275600183613287565b9150612282600a8661358d565b61228d9060306135a1565b60f81b8183815181106122a2576122a2612e91565b60200101906001600160f81b031916908160001a9053506122c4600a86613579565b9450612264565b60006122d5611d92565b6001600160a01b0383166000908152601082016020526040812054600f8301549293509161230590600190613287565b9050600083600f01828154811061231e5761231e612e91565b600091825260209091200154600f850180546001600160a01b03909216925082918590811061234f5761234f612e91565b600091825260208083209190910180546001600160a01b0319166001600160a01b0394851617905591831681526010860190915260409020839055600f840180548061239d5761239d6135b4565b60008281526020808220830160001990810180546001600160a01b03191690559092019092556001600160a01b0396909616815260109094019094525050604081205550565b7ff7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a769458054604080516020808402820181019092528281527ff7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a7694393600093919290919083018282801561247257602002820191906000526020600020905b81548152602001906001019080831161245e575b5050505050905060005b8151811015612522576001600160a01b03841660009081526003840160205260408120835182908590859081106124b5576124b5612e91565b6020026020010151815260200190815260200160002054111561251a5760405162461bcd60e51b815260206004820152601f60248201527f526563697069656e7420616c72656164792068617320696e76656e746f72790060448201526064016103ed565b60010161247c565b5060005b815181101561199857600082828151811061254357612543612e91565b6020908102919091018101516001600160a01b038816600090815260038701835260408082208383529093529190912054909150801561261f576001600160a01b03808816600090815260038701602081815260408084208785528252808420849055938a168352908152828220858352905290812080548392906125c99084906135a1565b9250508190555081866001600160a01b0316886001600160a01b03167f51e866c8533d4385f872db5ecbbc78914e718cec9fa5481105c30369d8c22e7f8460405161261691815260200190565b60405180910390a45b5050600101612526565b508054600082556004029060005260206000209081019061264a919061266e565b50565b508054600082556003029060005260206000209081019061264a91906126b9565b808211156126b557600061268282826126f2565b6126906001830160006126f2565b61269e6002830160006126f2565b6126ac6003830160006126f2565b5060040161266e565b5090565b808211156126b55760006126cd82826126f2565b6126db6001830160006126f2565b6126e96002830160006126f2565b506003016126b9565b5080546126fe90612f23565b6000825580601f1061270e575050565b601f01602090049060005260206000209081019061264a91905b808211156126b55760008155600101612728565b60008083601f84011261274e57600080fd5b5081356001600160401b0381111561276557600080fd5b6020830191508360208260051b850101111561278057600080fd5b9250929050565b60008060006040848603121561279c57600080fd5b8335925060208401356001600160401b038111156127b957600080fd5b6127c58682870161273c565b9497909650939450505050565b6000602082840312156127e457600080fd5b81356001600160e01b0319811681146127fc57600080fd5b9392505050565b80356001600160a01b038116811461281a57600080fd5b919050565b6000806000806060858703121561283557600080fd5b61283e85612803565b935061284c60208601612803565b925060408501356001600160401b0381111561286757600080fd5b6128738782880161273c565b95989497509550505050565b60005b8381101561289a578181015183820152602001612882565b50506000910152565b600081518084526128bb81602086016020860161287f565b601f01601f19169290920160200192915050565b6020815260006127fc60208301846128a3565b6000602082840312156128f457600080fd5b5035919050565b6000806040838503121561290e57600080fd5b61291783612803565b946020939093013593505050565b6000806000806000806060878903121561293e57600080fd5b86356001600160401b0381111561295457600080fd5b61296089828a0161273c565b90975095505060208701356001600160401b0381111561297f57600080fd5b61298b89828a0161273c565b90955093505060408701356001600160401b038111156129aa57600080fd5b6129b689828a0161273c565b979a9699509497509295939492505050565b6000806000806000806000806080898b0312156129e457600080fd5b88356001600160401b038111156129fa57600080fd5b612a068b828c0161273c565b90995097505060208901356001600160401b03811115612a2557600080fd5b612a318b828c0161273c565b90975095505060408901356001600160401b03811115612a5057600080fd5b612a5c8b828c0161273c565b90955093505060608901356001600160401b03811115612a7b57600080fd5b612a878b828c0161273c565b999c989b5096995094979396929594505050565b600080600060608486031215612ab057600080fd5b612ab984612803565b9250612ac760208501612803565b929592945050506040919091013590565b60008083601f840112612aea57600080fd5b5081356001600160401b03811115612b0157600080fd5b60208301915083602082850101111561278057600080fd5b60008060208385031215612b2c57600080fd5b82356001600160401b03811115612b4257600080fd5b612b4e85828601612ad8565b90969095509350505050565b6000602082016020835280845180835260408501915060408160051b86010192506020860160005b82811015612c0e57603f198786030184528151805160808752612ba860808801826128a3565b905060208201518782036020890152612bc182826128a3565b91505060408201518782036040890152612bdb82826128a3565b915050606082015191508681036060880152612bf781836128a3565b965050506020938401939190910190600101612b82565b50929695505050505050565b600060208284031215612c2c57600080fd5b6127fc82612803565b600080600060408486031215612c4a57600080fd5b612c5384612803565b925060208401356001600160401b038111156127b957600080fd5b602080825282518282018190526000918401906040840190835b81811015612ca6578351835260209384019390920191600101612c88565b509095945050505050565b60008060408385031215612cc457600080fd5b612ccd83612803565b915060208301358015158114612ce257600080fd5b809150509250929050565b600080600080600060808688031215612d0557600080fd5b612d0e86612803565b9450612d1c60208701612803565b93506040860135925060608601356001600160401b03811115612d3e57600080fd5b612d4a88828901612ad8565b969995985093965092949392505050565b6000602082016020835280845180835260408501915060408160051b86010192506020860160005b82811015612c0e57603f198786030184528151805160608752612da960608801826128a3565b905060208201518782036020890152612dc282826128a3565b915050604082015191508681036040880152612dde81836128a3565b965050506020938401939190910190600101612d83565b602080825282518282018190526000918401906040840190835b81811015612ca65783516001600160a01b0316835260209384019390920191600101612e0f565b60008060408385031215612e4957600080fd5b612e5283612803565b9150612e6060208401612803565b90509250929050565b6020808252600e908201526d139bdd08185d5d1a1bdc9a5e995960921b604082015260600190565b634e487b7160e01b600052603260045260246000fd5b60008235607e19833603018112612ebd57600080fd5b9190910192915050565b6000808335601e19843603018112612ede57600080fd5b8301803591506001600160401b03821115612ef857600080fd5b60200191503681900382131561278057600080fd5b634e487b7160e01b600052604160045260246000fd5b600181811c90821680612f3757607f821691505b602082108103612f5757634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561107a57806000526020600020601f840160051c81016020851015612f845750805b601f840160051c820191505b818110156119985760008155600101612f90565b600019600383901b1c191660019190911b1790565b6001600160401b03831115612fd057612fd0612f0d565b612fe483612fde8354612f23565b83612f5d565b6000601f84116001811461301257600085156130005750838201355b61300a8682612fa4565b845550611998565b600083815260209020601f19861690835b828110156130435786850135825560209485019460019092019101613023565b50868210156130605760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b61307c8283612ec7565b6001600160401b0381111561309357613093612f0d565b6130a7816130a18554612f23565b85612f5d565b6000601f8211600181146130d557600083156130c35750838201355b6130cd8482612fa4565b86555061312f565b600085815260209020601f19841690835b8281101561310657868501358255602094850194600190920191016130e6565b50848210156131235760001960f88660031b161c19848701351681555b505060018360011b0185555b505050506131406020830183612ec7565b61314e818360018601612fb9565b505061315d6040830183612ec7565b61316b818360028601612fb9565b505061317a6060830183612ec7565b613188818360038601612fb9565b50505050565b60008251612ebd81846020870161287f565b81516001600160401b038111156131b9576131b9612f0d565b6131cd816131c78454612f23565b84612f5d565b6020601f8211600181146131fb57600083156131e95750848201515b6131f38482612fa4565b855550611998565b600084815260208120601f198516915b8281101561322b578785015182556020948501946001909201910161320b565b50848210156132495786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b60006001820161328057613280613258565b5060010190565b8181038181111561054157610541613258565b600081546132a781612f23565b6001821680156132be57600181146132d357613303565b60ff1983168652811515820286019350613303565b84600052602060002060005b838110156132fb578154888201526001909101906020016132df565b505081860193505b50505092915050565b60006127fc828461329a565b818103613323575050565b61332d8254612f23565b6001600160401b0381111561334457613344612f0d565b613352816131c78454612f23565b6000601f82116001811461337757600083156131e95750848201546131f38482612fa4565b600085815260209020601f19841690600086815260209020845b838110156133b15782860154825560019586019590910190602001613391565b50858310156133cf5781850154600019600388901b60f8161c191681555b5050505050600190811b01905550565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b60008235605e19833603018112612ebd57600080fd5b8183823760009101908152919050565b61343e8283612ec7565b6001600160401b0381111561345557613455612f0d565b613463816130a18554612f23565b6000601f821160018114613491576000831561347f5750838201355b6134898482612fa4565b8655506134eb565b600085815260209020601f19841690835b828110156134c257868501358255602094850194600190920191016134a2565b50848210156134df5760001960f88660031b161c19848701351681555b505060018360011b0185555b505050506134fc6020830183612ec7565b61350a818360018601612fb9565b50506135196040830183612ec7565b613188818360028601612fb9565b6000613533828561329a565b835161354381836020880161287f565b01949350505050565b60008161355b5761355b613258565b506000190190565b634e487b7160e01b600052601260045260246000fd5b60008261358857613588613563565b500490565b60008261359c5761359c613563565b500690565b8082018082111561054157610541613258565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220288040a28be0be4499df0ef36880f78d0940fb4f0c707938bb6d85af0f25c50464736f6c634300081c0033", // Bytecode of FacetThree
    },
    {
      name: "FacetFour",
      abi: [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "ApprovalForAll",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "BalanceSet",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "ItemAdded",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "ItemMinted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ItemRemoved",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "ItemTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "name": "ItemTransferredBatch",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "ItemUpdated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "name": "ItemsMinted",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "ids",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "internalType": "uint256[]",
              "name": "values",
              "type": "uint256[]"
            }
          ],
          "name": "TransferBatch",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "TransferSingle",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "value",
              "type": "string"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            }
          ],
          "name": "URI",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imageURI",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "trait_type",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "display_type",
                  "type": "string"
                }
              ],
              "internalType": "struct LibInventoryStorage.Attribute[]",
              "name": "attributes",
              "type": "tuple[]"
            }
          ],
          "name": "addItem",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "accounts",
              "type": "address[]"
            },
            {
              "internalType": "uint256[]",
              "name": "ids",
              "type": "uint256[]"
            }
          ],
          "name": "balanceOfBatch",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "balances",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "getItem",
          "outputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imageURI",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "trait_type",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "display_type",
                  "type": "string"
                }
              ],
              "internalType": "struct LibInventoryStorage.Attribute[]",
              "name": "attributes",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "getUserItems",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "itemIds",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "balances",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            }
          ],
          "name": "isApprovedForAll",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "mint",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "tokenIds",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            }
          ],
          "name": "mintBatch",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "removeItem",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256[]",
              "name": "ids",
              "type": "uint256[]"
            },
            {
              "internalType": "uint256[]",
              "name": "amounts",
              "type": "uint256[]"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "safeBatchTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "operator",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
            }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
            }
          ],
          "name": "supportsInterface",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imageURI",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "trait_type",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "value",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "display_type",
                  "type": "string"
                }
              ],
              "internalType": "struct LibInventoryStorage.Attribute[]",
              "name": "attributes",
              "type": "tuple[]"
            }
          ],
          "name": "updateItem",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "uri",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ],
      bytecode: "0x6080604052348015600f57600080fd5b506126b98061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c80633129e77311610097578063ce6019b411610066578063ce6019b414610219578063d81d0a151461023a578063e985e9c51461024d578063f242432a146102a857600080fd5b80633129e773146101b05780634e1273f4146101d357806371329171146101f3578063a22cb4651461020657600080fd5b80630e89341c116100d35780630e89341c146101575780631164776e14610177578063156e29f61461018a5780632eb2c2d61461019d57600080fd5b8062fdd58e146100f957806301ffc9a71461011f5780630a78803f14610142575b600080fd5b61010c6101073660046119c3565b6102bb565b6040519081526020015b60405180910390f35b61013261012d366004611a03565b6102f3565b6040519015158152602001610116565b610155610150366004611ab3565b610344565b005b61016a610165366004611b92565b610544565b6040516101169190611bfb565b610155610185366004611ab3565b6105a7565b610155610198366004611c0e565b6106f8565b6101556101ab366004611c41565b61085c565b6101c36101be366004611b92565b6109d9565b6040516101169493929190611d05565b6101e66101e1366004611de7565b610e11565b6040516101169190611e92565b610155610201366004611b92565b610f19565b610155610214366004611ea5565b6110cd565b61022c610227366004611ee1565b611166565b604051610116929190611efc565b610155610248366004611f2a565b6112c8565b61013261025b366004611fae565b6001600160a01b0391821660009081527ff7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a769476020908152604080832093909416825291909152205460ff1690565b6101556102b6366004611fe1565b611476565b6001600160a01b0382166000908152600080516020612644833981519152602090815260408083208484529091529020545b92915050565b60006001600160e01b03198216636cdb3d1360e11b148061032457506001600160e01b031982166301ffc9a760e01b145b806102ed57506001600160e01b031982166303a24d0760e21b1492915050565b61034d33611607565b6103725760405162461bcd60e51b815260040161036990612058565b60405180910390fd5b806103bf5760405162461bcd60e51b815260206004820152601a60248201527f417474726962757465732063616e6e6f7420626520656d7074790000000000006044820152606401610369565b600089815260008051602061262483398151915260205260409020546000805160206126648339815191529060ff16156104315760405162461bcd60e51b81526020600482015260136024820152724974656d20616c72656164792065786973747360681b6044820152606401610369565b60008a81526020829052604090208061044b8a8c8361211f565b506001810161045b888a8361211f565b506002810161046b86888361211f565b5060005b838110156104cb578160030185858381811061048d5761048d6121de565b905060200281019061049f91906121f4565b8154600181018355600092835260209092209091600302016104c1828261225a565b505060010161046f565b5060008b8152600183810160209081526040808420805460ff191684179055600286018054938401815584529220018c9055518b907f78d68ba0e8c23b92e7c700d99efed2719520cbd4af845b2c03ae251f9cdf3d529061052f908d908d90612388565b60405180910390a25050505050505050505050565b60606000805160206126648339815191527ff7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a7694861057f84611698565b60405160200161059092919061239c565b604051602081830303815290604052915050919050565b6105b033611607565b6105cc5760405162461bcd60e51b815260040161036990612058565b600089815260008051602061262483398151915260205260409020546000805160206126648339815191529060ff166106175760405162461bcd60e51b815260040161036990612422565b60008a8152602082905260409020806106318a8c8361211f565b5060018101610641888a8361211f565b506002810161065186888361211f565b506106606003820160006118f7565b60005b838110156106bf5781600301858583818110610681576106816121de565b905060200281019061069391906121f4565b8154600181018355600092835260209092209091600302016106b5828261225a565b5050600101610663565b506040518b907f5e58dfa592b09c585a4ab7ef8158d20b1e52e9897f3095dbe1df700853905c2f90600090a25050505050505050505050565b61070133611607565b61071d5760405162461bcd60e51b815260040161036990612058565b6001600160a01b038316600090815260008051602061264483398151915260209081526040808320858452909152812080546000805160206126648339815191529284929161076d908490612464565b9091555050600083815260018201602052604090205460ff166107c85760405162461bcd60e51b81526020600482015260136024820152724974656d20616c72656164792065786973747360681b6044820152606401610369565b600083815260018201602052604090205460ff166108125760008381526001828101602090815260408320805460ff19168317905560028401805492830181558352909120018390555b82846001600160a01b03167fd9be9c40c7e99dfc974fa3fe3b790af02afd2939b5dedfccb1ba12933eb27a8e8460405161084e91815260200190565b60405180910390a350505050565b8483146108a65760405162461bcd60e51b8152602060048201526018602482015277092c8e640c2dcc840c2dadeeadce8e640dad2e6dac2e8c6d60431b6044820152606401610369565b60005b858110156108f7576108ef89898989858181106108c8576108c86121de565b905060200201358888868181106108e1576108e16121de565b905060200201358787611476565b6001016108a9565b50863b1561097e5760405163bc197c8160e01b81526001600160a01b0388169063bc197c81906109399033908c908b908b908b908b908b908b906004016124a9565b6020604051808303816000875af1158015610958573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061097c919061250d565b505b866001600160a01b0316886001600160a01b03167f7c9d74fc6f4301b51a77f302f08e20812a5e96b0575d4427ba96d6c37c9ca30b888888886040516109c7949392919061252a565b60405180910390a35050505050505050565b600081815260008051602061262483398151915260205260409020546060908190819081906000805160206126648339815191529060ff16610a2d5760405162461bcd60e51b815260040161036990612422565b6000868152602082905260409020805481906001820190600283019060038401908490610a5990612096565b80601f0160208091040260200160405190810160405280929190818152602001828054610a8590612096565b8015610ad25780601f10610aa757610100808354040283529160200191610ad2565b820191906000526020600020905b815481529060010190602001808311610ab557829003601f168201915b50505050509350828054610ae590612096565b80601f0160208091040260200160405190810160405280929190818152602001828054610b1190612096565b8015610b5e5780601f10610b3357610100808354040283529160200191610b5e565b820191906000526020600020905b815481529060010190602001808311610b4157829003601f168201915b50505050509250818054610b7190612096565b80601f0160208091040260200160405190810160405280929190818152602001828054610b9d90612096565b8015610bea5780601f10610bbf57610100808354040283529160200191610bea565b820191906000526020600020905b815481529060010190602001808311610bcd57829003601f168201915b5050505050915080805480602002602001604051908101604052809291908181526020016000905b82821015610dfa5783829060005260206000209060030201604051806060016040529081600082018054610c4590612096565b80601f0160208091040260200160405190810160405280929190818152602001828054610c7190612096565b8015610cbe5780601f10610c9357610100808354040283529160200191610cbe565b820191906000526020600020905b815481529060010190602001808311610ca157829003601f168201915b50505050508152602001600182018054610cd790612096565b80601f0160208091040260200160405190810160405280929190818152602001828054610d0390612096565b8015610d505780601f10610d2557610100808354040283529160200191610d50565b820191906000526020600020905b815481529060010190602001808311610d3357829003601f168201915b50505050508152602001600282018054610d6990612096565b80601f0160208091040260200160405190810160405280929190818152602001828054610d9590612096565b8015610de25780601f10610db757610100808354040283529160200191610de2565b820191906000526020600020905b815481529060010190602001808311610dc557829003601f168201915b50505050508152505081526020019060010190610c12565b505050509050955095509550955050509193509193565b6060838214610e545760405162461bcd60e51b815260206004820152600f60248201526e098cadccee8d040dad2e6dac2e8c6d608b1b6044820152606401610369565b836001600160401b03811115610e6c57610e6c612080565b604051908082528060200260200182016040528015610e95578160200160208202803683370190505b50905060005b84811015610f1057610eeb868683818110610eb857610eb86121de565b9050602002016020810190610ecd9190611ee1565b858584818110610edf57610edf6121de565b905060200201356102bb565b828281518110610efd57610efd6121de565b6020908102919091010152600101610e9b565b50949350505050565b610f2233611607565b610f3e5760405162461bcd60e51b815260040161036990612058565b600081815260008051602061262483398151915260205260409020546000805160206126648339815191529060ff16610f895760405162461bcd60e51b815260040161036990612422565b600082815260208290526040812090610fa2828261191b565b610fb060018301600061191b565b610fbe60028301600061191b565b610fcc6003830160006118f7565b505060008281526001820160205260408120805460ff191690555b600282015481101561109d5782826002018281548110611009576110096121de565b9060005260206000200154036110955760028201805461102b9060019061255c565b8154811061103b5761103b6121de565b906000526020600020015482600201828154811061105b5761105b6121de565b6000918252602090912001556002820180548061107a5761107a61256f565b6001900381819060005260206000200160009055905561109d565b600101610fe7565b5060405182907fa54eda4149a0fb9258911733973ecf1f6762357ed371fc6d1e63123bbce23bed90600090a25050565b3360008181527ff7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a76947602090815260408083206001600160a01b03871680855290835292819020805460ff19168615159081179091558151908152905160008051602061266483398151915294927f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31928290030190a3505050565b7ff7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a7694554606090819060008051602061266483398151915290806001600160401b038111156111b5576111b5612080565b6040519080825280602002602001820160405280156111de578160200160208202803683370190505b509350806001600160401b038111156111f9576111f9612080565b604051908082528060200260200182016040528015611222578160200160208202803683370190505b50925060005b818110156112c0576000836002018281548110611247576112476121de565b9060005260206000200154905080868381518110611267576112676121de565b6020908102919091018101919091526001600160a01b03881660009081526003860182526040808220848352909252205485518690849081106112ac576112ac6121de565b602090810291909101015250600101611228565b505050915091565b6112d133611607565b6112ed5760405162461bcd60e51b815260040161036990612058565b8281146113375760405162461bcd60e51b8152602060048201526018602482015277092c8e640c2dcc840c2dadeeadce8e640dad2e6dac2e8c6d60431b6044820152606401610369565b60005b8381101561146e576000858583818110611356576113566121de565b9050602002013590506000848484818110611373576113736121de565b905060200201359050600061139360008051602061266483398151915290565b6001600160a01b038a16600090815260038201602090815260408083208784529091528120805492935084929091906113cd908490612464565b9091555050600083815260018201602052604090205460ff1661141c5760008381526001828101602090815260408320805460ff19168317905560028401805492830181558352909120018390555b886001600160a01b03167f23519238b590c499a2abcf44a33b5f431ac6ca51c22fad26bc2c3d08b97eaa218989898960405161145b949392919061252a565b60405180910390a250505060010161133a565b505050505050565b6001600160a01b0386166114cc5760405162461bcd60e51b815260206004820152601b60248201527f46726f6d20616464726573732063616e6e6f74206265207a65726f00000000006044820152606401610369565b6001600160a01b0385166115225760405162461bcd60e51b815260206004820152601960248201527f546f20616464726573732063616e6e6f74206265207a65726f000000000000006044820152606401610369565b600083116115725760405162461bcd60e51b815260206004820152601c60248201527f56616c7565206d7573742062652067726561746572207468616e2030000000006044820152606401610369565b61157e868686866117a0565b843b1561146e5760405163f23a6e6160e01b81526001600160a01b0386169063f23a6e61906115bb9033908a908990899089908990600401612585565b6020604051808303816000875af11580156115da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115fe919061250d565b50505050505050565b600061163a7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f546001600160a01b031690565b6001600160a01b0316826001600160a01b03160361165a57506001919050565b506001600160a01b031660009081527f74280a4b4c55f9103e616849087d6b766bc3336a420e6c0dacf24ec2d7d7ef93602052604090205460ff1690565b6060816000036116bf5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156116e957806116d3816125cc565b91506116e29050600a836125fb565b91506116c3565b6000816001600160401b0381111561170357611703612080565b6040519080825280601f01601f19166020018201604052801561172d576020820181803683370190505b5090505b84156117985761174260018361255c565b915061174f600a8661260f565b61175a906030612464565b60f81b81838151811061176f5761176f6121de565b60200101906001600160f81b031916908160001a905350611791600a866125fb565b9450611731565b949350505050565b6001600160a01b0384166000908152600080516020612644833981519152602090815260408083208584529091529020548111156118175760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b6044820152606401610369565b6001600160a01b0384166000908152600080516020612644833981519152602090815260408083208584529091528120805483929061185790849061255c565b90915550506001600160a01b0383166000908152600080516020612644833981519152602090815260408083208584529091528120805483929061189c908490612464565b9250508190555081836001600160a01b0316856001600160a01b03167f51e866c8533d4385f872db5ecbbc78914e718cec9fa5481105c30369d8c22e7f846040516118e991815260200190565b60405180910390a450505050565b50805460008255600302906000526020600020908101906119189190611955565b50565b50805461192790612096565b6000825580601f10611937575050565b601f0160209004906000526020600020908101906119189190611992565b8082111561198e576000611969828261191b565b61197760018301600061191b565b61198560028301600061191b565b50600301611955565b5090565b5b8082111561198e5760008155600101611993565b80356001600160a01b03811681146119be57600080fd5b919050565b600080604083850312156119d657600080fd5b6119df836119a7565b946020939093013593505050565b6001600160e01b03198116811461191857600080fd5b600060208284031215611a1557600080fd5b8135611a20816119ed565b9392505050565b60008083601f840112611a3957600080fd5b5081356001600160401b03811115611a5057600080fd5b602083019150836020828501011115611a6857600080fd5b9250929050565b60008083601f840112611a8157600080fd5b5081356001600160401b03811115611a9857600080fd5b6020830191508360208260051b8501011115611a6857600080fd5b600080600080600080600080600060a08a8c031215611ad157600080fd5b8935985060208a01356001600160401b03811115611aee57600080fd5b611afa8c828d01611a27565b90995097505060408a01356001600160401b03811115611b1957600080fd5b611b258c828d01611a27565b90975095505060608a01356001600160401b03811115611b4457600080fd5b611b508c828d01611a27565b90955093505060808a01356001600160401b03811115611b6f57600080fd5b611b7b8c828d01611a6f565b915080935050809150509295985092959850929598565b600060208284031215611ba457600080fd5b5035919050565b60005b83811015611bc6578181015183820152602001611bae565b50506000910152565b60008151808452611be7816020860160208601611bab565b601f01601f19169290920160200192915050565b602081526000611a206020830184611bcf565b600080600060608486031215611c2357600080fd5b611c2c846119a7565b95602085013595506040909401359392505050565b60008060008060008060008060a0898b031215611c5d57600080fd5b611c66896119a7565b9750611c7460208a016119a7565b965060408901356001600160401b03811115611c8f57600080fd5b611c9b8b828c01611a6f565b90975095505060608901356001600160401b03811115611cba57600080fd5b611cc68b828c01611a6f565b90955093505060808901356001600160401b03811115611ce557600080fd5b611cf18b828c01611a27565b999c989b5096995094979396929594505050565b608081526000611d186080830187611bcf565b8281036020840152611d2a8187611bcf565b90508281036040840152611d3e8186611bcf565b9050828103606084015280845180835260208301915060208160051b8401016020870160005b83811015611dd757601f198684030185528151805160608552611d8a6060860182611bcf565b905060208201518582036020870152611da38282611bcf565b915050604082015191508481036040860152611dbf8183611bcf565b60209788019790955093909301925050600101611d64565b50909a9950505050505050505050565b60008060008060408587031215611dfd57600080fd5b84356001600160401b03811115611e1357600080fd5b611e1f87828801611a6f565b90955093505060208501356001600160401b03811115611e3e57600080fd5b611e4a87828801611a6f565b95989497509550505050565b600081518084526020840193506020830160005b82811015611e88578151865260209586019590910190600101611e6a565b5093949350505050565b602081526000611a206020830184611e56565b60008060408385031215611eb857600080fd5b611ec1836119a7565b915060208301358015158114611ed657600080fd5b809150509250929050565b600060208284031215611ef357600080fd5b611a20826119a7565b604081526000611f0f6040830185611e56565b8281036020840152611f218185611e56565b95945050505050565b600080600080600060608688031215611f4257600080fd5b611f4b866119a7565b945060208601356001600160401b03811115611f6657600080fd5b611f7288828901611a6f565b90955093505060408601356001600160401b03811115611f9157600080fd5b611f9d88828901611a6f565b969995985093965092949392505050565b60008060408385031215611fc157600080fd5b611fca836119a7565b9150611fd8602084016119a7565b90509250929050565b60008060008060008060a08789031215611ffa57600080fd5b612003876119a7565b9550612011602088016119a7565b9450604087013593506060870135925060808701356001600160401b0381111561203a57600080fd5b61204689828a01611a27565b979a9699509497509295939492505050565b6020808252600e908201526d139bdd08185d5d1a1bdc9a5e995960921b604082015260600190565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806120aa57607f821691505b6020821081036120ca57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561211a57806000526020600020601f840160051c810160208510156120f75750805b601f840160051c820191505b818110156121175760008155600101612103565b50505b505050565b6001600160401b0383111561213657612136612080565b61214a836121448354612096565b836120d0565b6000601f84116001811461217e57600085156121665750838201355b600019600387901b1c1916600186901b178355612117565b600083815260209020601f19861690835b828110156121af578685013582556020948501946001909201910161218f565b50868210156121cc5760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b634e487b7160e01b600052603260045260246000fd5b60008235605e1983360301811261220a57600080fd5b9190910192915050565b6000808335601e1984360301811261222b57600080fd5b8301803591506001600160401b0382111561224557600080fd5b602001915036819003821315611a6857600080fd5b6122648283612214565b6001600160401b0381111561227b5761227b612080565b61228f816122898554612096565b856120d0565b6000601f8211600181146122c357600083156122ab5750838201355b600019600385901b1c1916600184901b17855561231d565b600085815260209020601f19841690835b828110156122f457868501358255602094850194600190920191016122d4565b50848210156123115760001960f88660031b161c19848701351681555b505060018360011b0185555b5050505061232e6020830183612214565b61233c81836001860161211f565b505061234b6040830183612214565b61235981836002860161211f565b50505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b60208152600061179860208301848661235f565b60008084546123aa81612096565b6001821680156123c157600181146123d657612406565b60ff1983168652811515820286019350612406565b87600052602060002060005b838110156123fe578154888201526001909101906020016123e2565b505081860193505b5050508351612419818360208801611bab565b01949350505050565b602080825260129082015271125d195b48191bd95cdb89dd08195e1a5cdd60721b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b808201808211156102ed576102ed61244e565b81835260006001600160fb1b0383111561249057600080fd5b8260051b80836020870137939093016020019392505050565b6001600160a01b0389811682528816602082015260a0604082018190526000906124d6908301888a612477565b82810360608401526124e9818789612477565b905082810360808401526124fe81858761235f565b9b9a5050505050505050505050565b60006020828403121561251f57600080fd5b8151611a20816119ed565b60408152600061253e604083018688612477565b8281036020840152612551818587612477565b979650505050505050565b818103818111156102ed576102ed61244e565b634e487b7160e01b600052603160045260246000fd5b6001600160a01b03878116825286166020820152604081018590526060810184905260a0608082018190526000906125c0908301848661235f565b98975050505050505050565b6000600182016125de576125de61244e565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261260a5761260a6125e5565b500490565b60008261261e5761261e6125e5565b50069056fef7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a76944f7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a76946f7a4cc25de86b3d5d2cd09869dfdab61b73ade0ec7b7207aea84cf74e0a76943a2646970667358221220e8fe6da107567562f1dd77c76855047c07c8699573d9717819654386101501b064736f6c634300081c0033", // Bytecode of FacetThree
    },
    {
      name: "FacetFive",
      abi:[
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_user",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_contractOwner",
              "type": "address"
            }
          ],
          "name": "NotContractOwner",
          "type": "error"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "isAuthorized",
              "type": "bool"
            }
          ],
          "name": "AuthorizedUserUpdated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "genre",
              "type": "string"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "imageURI",
              "type": "string"
            }
          ],
          "name": "GameMetadataUpdated",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "addAuthorizedUser",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAuthorizedUsers",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getGameMetadata",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "isAuthorized",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "user",
              "type": "address"
            }
          ],
          "name": "removeAuthorizedUser",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "genre",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imageURI",
              "type": "string"
            }
          ],
          "name": "setGameMetadata",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      bytecode: "0x6080604052348015600f57600080fd5b50610bae8061001f6000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c8063177d2a74146100675780631ba7214c1461007c5780634021f3c61461009a578063560df1ba146100b257806389fabc80146100c5578063fe9fbb80146100d8575b600080fd5b61007a610075366004610798565b6100fb565b005b6100846101e2565b60405161009191906107c1565b60405180910390f35b6100a2610254565b6040516100919493929190610853565b61007a6100c0366004610950565b610514565b61007a6100d3366004610798565b6105e0565b6100eb6100e6366004610798565b61068c565b6040519015158152602001610091565b61010361070e565b6001600160a01b03811660009081527f74280a4b4c55f9103e616849087d6b766bc3336a420e6c0dacf24ec2d7d7ef936020526040902054600080516020610b598339815191529060ff1661019e576001600160a01b038216600081815260048301602090815260408220805460ff191660019081179091556005850180549182018155835291200180546001600160a01b03191690911790555b604051600181526001600160a01b038316907fb9cefd74712192cc74681712dfb0226300e9103056f862d2faec198f0932b829906020015b60405180910390a25050565b6060600080516020610b5983398151915260050180548060200260200160405190810160405280929190818152602001828054801561024a57602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161022c575b5050505050905090565b600080516020610b59833981519152805460609182918291829181907f74280a4b4c55f9103e616849087d6b766bc3336a420e6c0dacf24ec2d7d7ef90907f74280a4b4c55f9103e616849087d6b766bc3336a420e6c0dacf24ec2d7d7ef91907f74280a4b4c55f9103e616849087d6b766bc3336a420e6c0dacf24ec2d7d7ef929084906102e190610a10565b80601f016020809104026020016040519081016040528092919081815260200182805461030d90610a10565b801561035a5780601f1061032f5761010080835404028352916020019161035a565b820191906000526020600020905b81548152906001019060200180831161033d57829003601f168201915b5050505050935082805461036d90610a10565b80601f016020809104026020016040519081016040528092919081815260200182805461039990610a10565b80156103e65780601f106103bb576101008083540402835291602001916103e6565b820191906000526020600020905b8154815290600101906020018083116103c957829003601f168201915b505050505092508180546103f990610a10565b80601f016020809104026020016040519081016040528092919081815260200182805461042590610a10565b80156104725780601f1061044757610100808354040283529160200191610472565b820191906000526020600020905b81548152906001019060200180831161045557829003601f168201915b5050505050915080805461048590610a10565b80601f01602080910402602001604051908101604052809291908181526020018280546104b190610a10565b80156104fe5780601f106104d3576101008083540402835291602001916104fe565b820191906000526020600020905b8154815290600101906020018083116104e157829003601f168201915b5050505050905094509450945094505090919293565b61051c61070e565b604080516080810182528581526020810185905290810183905260608101829052600080516020610b598339815191529081806105598882610a99565b506020820151600182019061056e9082610a99565b50604082015160028201906105839082610a99565b50606082015160038201906105989082610a99565b509050507f787f014054d672eb89679fb7e2a7389c8ebf300b3ee8e6cbab77449fc0473752858585856040516105d19493929190610853565b60405180910390a15050505050565b6105e861070e565b6001600160a01b03811660009081527f74280a4b4c55f9103e616849087d6b766bc3336a420e6c0dacf24ec2d7d7ef936020526040902054600080516020610b598339815191529060ff161561019e576001600160a01b0382166000818152600483016020908152604091829020805460ff191690559051600181527fb9cefd74712192cc74681712dfb0226300e9103056f862d2faec198f0932b82991016101d6565b6000600080516020610b598339815191526106ce7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f546001600160a01b031690565b6001600160a01b0316836001600160a01b0316148061070757506001600160a01b038316600090815260048201602052604090205460ff165b9392505050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c600301546001600160a01b03163314610796577fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131f5460408051600162bed83560e01b031981523360048201526001600160a01b039092166024830152519081900360440190fd5b565b6000602082840312156107aa57600080fd5b81356001600160a01b038116811461070757600080fd5b602080825282518282018190526000918401906040840190835b818110156108025783516001600160a01b03168352602093840193909201916001016107db565b509095945050505050565b6000815180845260005b8181101561083357602081850181015186830182015201610817565b506000602082860101526020601f19601f83011685010191505092915050565b608081526000610866608083018761080d565b8281036020840152610878818761080d565b9050828103604084015261088c818661080d565b905082810360608401526108a0818561080d565b979650505050505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126108d257600080fd5b813567ffffffffffffffff8111156108ec576108ec6108ab565b604051601f8201601f19908116603f0116810167ffffffffffffffff8111828210171561091b5761091b6108ab565b60405281815283820160200185101561093357600080fd5b816020850160208301376000918101602001919091529392505050565b6000806000806080858703121561096657600080fd5b843567ffffffffffffffff81111561097d57600080fd5b610989878288016108c1565b945050602085013567ffffffffffffffff8111156109a657600080fd5b6109b2878288016108c1565b935050604085013567ffffffffffffffff8111156109cf57600080fd5b6109db878288016108c1565b925050606085013567ffffffffffffffff8111156109f857600080fd5b610a04878288016108c1565b91505092959194509250565b600181811c90821680610a2457607f821691505b602082108103610a4457634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610a9457806000526020600020601f840160051c81016020851015610a715750805b601f840160051c820191505b81811015610a915760008155600101610a7d565b50505b505050565b815167ffffffffffffffff811115610ab357610ab36108ab565b610ac781610ac18454610a10565b84610a4a565b6020601f821160018114610afb5760008315610ae35750848201515b600019600385901b1c1916600184901b178455610a91565b600084815260208120601f198516915b82811015610b2b5787850151825560209485019460019092019101610b0b565b5084821015610b495786840151600019600387901b60f8161c191681555b50505050600190811b0190555056fe74280a4b4c55f9103e616849087d6b766bc3336a420e6c0dacf24ec2d7d7ef8fa26469706673582212205d4eec17fa215153ea9003a29c6b2442675a2645df4d0bee79a27c34ed20979964736f6c634300081c0033", // Bytecode of FacetThree
    }
  ];

  const facetAddresses = [];
  const seenSelectors = new Set();

  // Deploy each facet
  for (const facet of facets) {
    console.log(`Starting deployment for: ${facet.name}`);

    // Create the contract factory using ABI and Bytecode
    const FacetContract = new ethers.ContractFactory(facet.abi, facet.bytecode, wallet);

    try {
      // Deploy the contract
      const deployedFacet = await FacetContract.deploy({
        gasLimit: 3000000,  // Set a reasonable gas limit for deployment
        gasPrice: ethers.utils.parseUnits("20", "gwei"),  // Customize your gas price if needed
      });

      console.log(`Waiting for contract ${facet.name} to be mined...`);

      // Wait until the contract is mined (transaction is confirmed)
      await deployedFacet.deployed();
      console.log(`${facet.name} deployed at: ${deployedFacet.address}`);

      // Add deployed facet details to the facetAddresses array
      facetAddresses.push({
        facetAddress: deployedFacet.address,
        abi: facet.abi,
        bytecode: facet.bytecode,
      });

    } catch (error) {
      console.error(`Error deploying ${facet.name}:`, error);
      // Optional: Retry logic or fallback if deployment fails
      continue; // Continue with the next facet if there's an error
    }
  }

  console.log("Deployment complete. All facets deployed.");
  console.log(facetAddresses);  // Print the deployed facet addresses and metadata

  const facetData = facetAddresses.map(facet => {
     return {
       facetAddress: facet.facetAddress,
       action: 0, // Add facet
       functionSelectors: getUniqueSelectors(facet.facetAddress,facet.abi,seenSelectors),

     };
   });

  console.log(facetData,"WORKS DUDE")

  // Update Diamond contract with facets
  // const tx = await diamond.diamondCut(facetData, ethers.constants.AddressZero, []);
  // const receipt = await tx.wait();
  // console.log("Diamond contract updated with facets. Transaction Hash:", receipt.transactionHash);

  // Use the deployed factory contract to create a CoreGameDiamond
  const factoryAddress = "0x8Ce2F11d5ec258b8a1960588AADf4230C6967035"; // Replace with your actual deployed CoreGameFactory address
  const Factory = new ethers.Contract(factoryAddress,  [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "developer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "coreGameDiamond",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "diamondCutFacet",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "genre",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address[]",
          "name": "pubKeys",
          "type": "address[]"
        }
      ],
      "name": "CoreGameCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "allGames",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_pubKeys",
          "type": "address[]"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_genre",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "address",
              "name": "facetAddress",
              "type": "address"
            },
            {
              "internalType": "enum IDiamond.FacetCutAction",
              "name": "action",
              "type": "uint8"
            },
            {
              "internalType": "bytes4[]",
              "name": "functionSelectors",
              "type": "bytes4[]"
            }
          ],
          "internalType": "struct IDiamond.FacetCut[]",
          "name": "_facetCuts",
          "type": "tuple[]"
        },
        {
          "internalType": "string",
          "name": "_imageURI",
          "type": "string"
        }
      ],
      "name": "createCoreGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "developerToGames",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gameId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "games",
      "outputs": [
        {
          "internalType": "address",
          "name": "developer",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "coreGameDiamond",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllGames",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_dev",
          "type": "address"
        }
      ],
      "name": "getGamesByDeveloper",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ], wallet);
  console.log("ALL GOOD HERE")

  const gameName = "MyNewGame";  // Example game name
  const pubKeys = [wallet.address]; // Example pubKey for the creator
  const gasPrice = ethers.utils.parseUnits("20", "gwei"); // 20 Gwei = 20 * 10^9 wei
  const oneEthInWei = ethers.utils.parseEther("1.0");

  // Calculate gas limit based on 1 ETH and the current gas price
  const gasLimit = oneEthInWei.div(gasPrice);  // gasLimit in terms of gas units

  console.log("Setting gas limit to:", gasLimit.toString());  // Check gas limit

  // Send the transaction with the custom gas limit
  const tx2 = await Factory.createCoreGame(pubKeys, gameName, "An RPG game", "RPG", facetData, "ipfs://mynewgame.png", {
    gasLimit: gasLimit,  // Set the custom gas limit
    maxFeePerGas: ethers.utils.parseUnits("20", "gwei"),  // You can set your own max fee per gas (adjustable)
    maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei"), // Adjust priority fee per gas
  });
  console.log("MAYBE ISSUE HERE")

  const gameReceipt = await tx2.wait();
  console.log("GG")

  console.log("CoreGameDiamond created at:", gameReceipt.address);
}

// Helper function to get unique selectors from a facet
function getUniqueSelectors(facetAddress, abi, seenSelectors) {
  const facet = new ethers.Contract(facetAddress, abi);

  const selectors = [];
  for (const fn of Object.keys(facet.interface.functions)) {
    const selector = facet.interface.getSighash(fn); // Get the function's selector
    if (!seenSelectors.has(selector)) {
      selectors.push(selector);
      seenSelectors.add(selector);
    }
  }

  return selectors;
}


// Error handling
main()
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;  // Non-zero exit code to signal failure
  });
