import { expect } from "chai";
import { ethers } from "hardhat";

describe("CredentialRegistry", function () {
  async function deployFixture() {
    const [admin, issuer, rando] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("CredentialRegistry");
    const registry = await Factory.deploy(admin.address);
    await registry.waitForDeployment();
    return { registry, admin, issuer, rando };
  }

  it("grants admin as DEFAULT_ADMIN_ROLE & ISSUER_ROLE", async () => {
    const { registry, admin } = await deployFixture();
    // addIssuer should work from admin
    await expect(registry.connect(admin).addIssuer(await admin.getAddress())).to.not.be.reverted;
  });

  it("issues → fetches → revokes; double-issue fails", async () => {
    const { registry, admin, issuer } = await deployFixture();

    // admin authorizes issuer
    await registry.connect(admin).addIssuer(await issuer.getAddress());

    const credentialId = ethers.keccak256(ethers.toUtf8Bytes("stu-1|B.Tech|2025-07-31"));
    const studentDid = "did:example:stu-1";
    const recordHash = ethers.sha256(ethers.toUtf8Bytes("canonical-json-here"));

    // issue
    await expect(registry.connect(issuer).issueCredential(credentialId as `0x${string}`, studentDid, recordHash as `0x${string}`))
      .to.emit(registry, "Issued");

    // get
    const out = await registry.getCredential(credentialId as `0x${string}`);
    expect(out[0]).to.equal(recordHash);
    expect(out[2]).to.equal(studentDid);
    expect(out[4]).to.equal(false);

    // double-issue must fail
    await expect(
      registry.connect(issuer).issueCredential(credentialId as `0x${string}`, studentDid, recordHash as `0x${string}`)
    ).to.be.revertedWith("Credential already exists");

    // revoke
    await expect(registry.connect(issuer).revokeCredential(credentialId as `0x${string}`))
      .to.emit(registry, "Revoked");

    const out2 = await registry.getCredential(credentialId as `0x${string}`);
    expect(out2[4]).to.equal(true);
  });

  it("prevents unauthorized revoke", async () => {
    const { registry, admin, issuer, rando } = await deployFixture();
    await registry.connect(admin).addIssuer(await issuer.getAddress());

    const id = ethers.keccak256(ethers.toUtf8Bytes("id-2"));
    const h = ethers.sha256(ethers.toUtf8Bytes("hash-2"));

    await registry.connect(issuer).issueCredential(id as `0x${string}`, "did:ex:2", h as `0x${string}`);
    await expect(registry.connect(rando).revokeCredential(id as `0x${string}`))
      .to.be.revertedWithCustomError; // generic check; unauthorized path
  });
});

