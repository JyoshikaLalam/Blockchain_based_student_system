require("dotenv").config();
const { ethers } = require("ethers");
const path = require("path");

const abiPath = path.join(
  __dirname,
  "../contracts/artifacts/contracts/contracts/CredentialRegistry.sol/CredentialRegistry.json"
);

const abi = require(abiPath).abi;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.ISSUER_PRIVATE_KEY, provider);

const contract = new ethers.Contract(
  process.env.REGISTRY_ADDR,
  abi,
  wallet
);

module.exports = contract;
