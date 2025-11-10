import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Factory = await ethers.getContractFactory("CredentialRegistry");
  const registry = await Factory.deploy(deployer.address);
  await registry.waitForDeployment();

  console.log("CredentialRegistry:", await registry.getAddress());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

