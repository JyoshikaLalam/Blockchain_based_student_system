import hre from "hardhat";
import { ethers } from "ethers";

async function main() {
  // Connect to local Hardhat node
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  // Get signer (first account)
  const signer = await provider.getSigner(0);
  const adminAddress = await signer.getAddress();

  // Load compiled contract artifact
  const artifact = await hre.artifacts.readArtifact("CredentialRegistry");

  // Create a ContractFactory using ethers v6
  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    signer
  );

  // Deploy with constructor argument (admin address)
  const contract = await factory.deploy(adminAddress);

  console.log("CredentialRegistry deployed at:", await contract.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
