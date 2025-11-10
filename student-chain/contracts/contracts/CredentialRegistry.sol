// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract CredentialRegistry is AccessControl {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    struct Credential {
        bytes32 recordHash;   // SHA-256 of canonical JSON/PDF bytes
        address issuer;
        string studentDid;    // pseudonymous DID/ID
        uint64 issuedAt;
        bool revoked;
    }

    mapping(bytes32 => Credential) private credentials;

    event Issued(bytes32 indexed credentialId, address indexed issuer, string studentDid, bytes32 recordHash);
    event Revoked(bytes32 indexed credentialId, address indexed issuer);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ISSUER_ROLE, admin);
    }

    function addIssuer(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ISSUER_ROLE, account);
    }

    function issueCredential(bytes32 credentialId, string calldata studentDid, bytes32 recordHash)
        external
        onlyRole(ISSUER_ROLE)
    {
        require(credentials[credentialId].issuedAt == 0, "Credential already exists");
        credentials[credentialId] = Credential({
            recordHash: recordHash,
            issuer: msg.sender,
            studentDid: studentDid,
            issuedAt: uint64(block.timestamp),
            revoked: false
        });
        emit Issued(credentialId, msg.sender, studentDid, recordHash);
    }

    function revokeCredential(bytes32 credentialId) external onlyRole(ISSUER_ROLE) {
        Credential storage c = credentials[credentialId];
        require(c.issuedAt != 0, "Credential not found");
        require(!c.revoked, "Already revoked");
        require(c.issuer == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not authorized");
        c.revoked = true;
        emit Revoked(credentialId, msg.sender);
    }

    function getCredential(bytes32 credentialId)
        external
        view
        returns (bytes32 recordHash, address issuer, string memory studentDid, uint64 issuedAt, bool revoked)
    {
        Credential storage c = credentials[credentialId];
        require(c.issuedAt != 0, "Credential not found");
        return (c.recordHash, c.issuer, c.studentDid, c.issuedAt, c.revoked);
    }
}
