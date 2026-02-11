import { ethers } from "ethers";

const contractAddress = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS";

const abi = [
  "function issueCredential(bytes32 credentialId, string studentDid, bytes32 recordHash)",
  "function revokeCredential(bytes32 credentialId)",
  "function getCredential(bytes32 credentialId) view returns (bytes32, address, string, uint64, bool)"
];

export async function getContract() {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  return new ethers.Contract(contractAddress, abi, signer);
}
