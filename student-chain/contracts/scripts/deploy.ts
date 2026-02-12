import { network } from "hardhat";
import { ethers } from "ethers";

async function main() {
  console.log("Deploying on network:", network.name);

  // connect to local hardhat node manually
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  // use first hardhat account private key
  const wallet = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );

  const artifact = await import("../artifacts/contracts/CredentialRegistry.sol/CredentialRegistry.json");

  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    wallet
  );

  const contract = await factory.deploy();
  await contract.waitForDeployment();

  console.log("✅ Contract deployed at:", contract.target);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exit(1);
});
