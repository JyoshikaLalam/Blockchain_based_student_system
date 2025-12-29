# Blockchain_based_student_system

This project leverages **blockchain technology** to create a secure, transparent, and tamper-proof system for managing student academic records.
It ensures **data integrity, decentralization, and controlled access** for institutions, students, and employers.

---

# Blockchain-Based Student Information Management System

A decentralized registry for academic credentials using **Ethereum smart contracts** and **AI-based validation**.

---

## 🚀 MVP Features

* Smart-contract based credential registry
* REST API gateway
* AI service for canonicalization and risk detection
* Event indexer for audit logs
* Minimal web demonstration
* Full documentation and automated tests

---

## 📁 Project Structure

```text
Blockchain_based_student_system/
├─ student-chain/
│  ├─ contracts/          ← Hardhat project root
│  │  ├─ contracts/
│  │  ├─ ignition/
│  │  ├─ scripts/
│  │  ├─ test/
│  │  ├─ hardhat.config.ts
│  │  ├─ package.json
│  │  ├─ package-lock.json
│  │  ├─ tsconfig.json
│  │  └─ .gitignore
│  └─ docs/
├─ README.md
└─ package-lock.json
```

✅ **Hardhat root directory:**
`student-chain/contracts/`

---

## ⚙️ Quick Start

> Make sure Node.js and npm are installed.

```bash
make up    # run all services locally
make down  # stop all running services
make test  # run smart-contract tests
```

---

## 🧱 Hardhat Setup & Compilation

Navigate to the Hardhat project root:

```bash
cd student-chain/contracts
```

Install dependencies:

```bash
npm install
```

Compile smart contracts:

```bash
npx hardhat compile
```

**Expected output:**

```text
Compiled X Solidity files successfully
```

---

## 📦 Makefile

The project includes a `Makefile` to simplify local development and testing.

```makefile
up:
	npx hardhat node --prefix contracts &
	npm run dev --prefix api &
	uvicorn ai.main:app --reload --port 8081 &

down:
	pkill -f hardhat || true
	pkill -f uvicorn || true

test:
	npx hardhat test --prefix contracts
```

---

## 🚫 Ignored Files and Directories

The following directories are **not pushed to GitHub by design**:

```text
node_modules/
artifacts/
cache/
types/
```

**Reason:**

* Auto-generated during build and compilation
* Increase repository size unnecessarily
* Can be regenerated using:

```bash
npm install
npx hardhat compile
```

Verify ignored files with:

```bash
git status --ignored
```

---

## ✅ Repository Status

```text
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

✔ Repository fully synchronized
✔ No missing files
✔ No further push required

---

## 📘 Key Learnings

* Git commands must be run inside the directory containing `.git`
* `npm install` only works where `package.json` exists
* Hardhat commands must be executed from the Hardhat project root
* Ignored folders not appearing on GitHub is expected behavior
* Re-cloning is the safest recovery method if `.git` is missing

---

## 🏁 Conclusion

The repository was successfully recovered, synchronized, and verified.
The Hardhat project is correctly configured and compiles without errors.
GitHub reflects the intended and clean project state.

---







Great idea 👍 — documenting this properly will **upgrade your repo instantly**.

Below is a **ready-to-paste README section** that:

1. **Clearly documents what is already implemented**
2. **Explains the smart contract in a professional way**
3. **Lists concrete “Next to Implement” steps** (so evaluators know the roadmap)

You can paste this directly into your `README.md` (or split into sections if you want).

---

# 📜 Blockchain-Based Student Credential System

This project implements a **blockchain-backed credential registry** for issuing, revoking, and verifying academic credentials in a secure, tamper-proof, and privacy-preserving way.

The current implementation focuses on the **core blockchain layer**, which serves as the single source of truth for credential integrity.

---

## ✅ What Is Implemented (Current Status)

### 🔗 Smart Contract: `CredentialRegistry.sol`

A fully implemented and tested Ethereum smart contract that manages academic credentials.

#### Key Features

* **Role-based access control** using OpenZeppelin `AccessControl`

  * `DEFAULT_ADMIN_ROLE` → University / Authority
  * `ISSUER_ROLE` → Authorized credential issuers
* **Credential issuance**
* **Credential revocation**
* **Public credential verification**
* **Event emission** for indexing and auditing

#### Credential Data Model

```solidity
struct Credential {
    bytes32 recordHash;   // Hash of canonical academic record
    address issuer;       // Issuing authority
    string studentDid;    // Pseudonymous student identifier
    uint64 issuedAt;      // Block timestamp
    bool revoked;         // Revocation status
}
```

> ⚠️ No raw student data is stored on-chain. Only cryptographic hashes are recorded to preserve privacy.

---

### 🔐 Access Control

* Only admins can add new issuers
* Only issuers can issue credentials
* Only the original issuer or an admin can revoke credentials

This mirrors real-world academic governance models.

---

### 🧾 Core Contract Functions

| Function             | Description                        |
| -------------------- | ---------------------------------- |
| `addIssuer(address)` | Admin authorizes an issuer         |
| `issueCredential()`  | Issuer registers a credential hash |
| `revokeCredential()` | Issuer/Admin revokes a credential  |
| `getCredential()`    | Public verification of credential  |

---

### 📢 Events

```solidity
event Issued(bytes32 credentialId, address issuer, string studentDid, bytes32 recordHash);
event Revoked(bytes32 credentialId, address issuer);
```

Used for:

* Off-chain indexing
* Audit trails
* Frontend updates

---

### 🧪 Automated Testing

The contract is thoroughly tested using **Hardhat + Chai**.

Implemented tests include:

* Role assignment validation
* Full lifecycle test (issue → verify → revoke)
* Prevention of duplicate credential issuance
* Unauthorized revocation protection

This ensures correctness of **business rules**, not just function calls.

---

### 🚀 Deployment

A deployment script is implemented using **ethers v6**:

* Deploys the contract to a local Hardhat network
* Sets the initial admin during deployment
* Outputs deployed contract address

---

## 🧩 What This Project Currently Represents

> A complete and tested blockchain credential registry that can securely issue, revoke, and verify academic credentials using hash-based integrity and role-based governance.

This constitutes a **production-ready blockchain core**.

---

## ❌ What Is Not Implemented Yet

The following layers are planned but **not yet coded**:

* ❌ API backend (Express / FastAPI)
* ❌ Off-chain document storage (IPFS / database)
* ❌ AI-based canonicalization & risk analysis
* ❌ Blockchain event indexer
* ❌ Frontend web interface

---

## 🚧 What to Implement Next (Roadmap)

### 1️⃣ Backend API (Highest Priority)

Implement an API service that interacts with the smart contract:

**Endpoints:**

* `POST /issue`
* `POST /verify`
* `POST /revoke`

**Responsibilities:**

* Accept credential documents
* Canonicalize data
* Generate SHA-256 hash
* Call smart contract functions via ethers.js

---

### 2️⃣ Off-Chain Storage

Store full credential documents off-chain:

* Local storage (initial)
* IPFS / cloud storage (later)

Only the **hash reference** will be stored on-chain.

---

### 3️⃣ Canonicalization & AI Service

Implement a microservice that:

* Converts credential data into canonical JSON
* Ensures deterministic hashing
* Flags anomalies (missing fields, invalid dates, outliers)

---

### 4️⃣ Blockchain Indexer

Listen to smart contract events:

* `Issued`
* `Revoked`

Store indexed data in a database for:

* Dashboards
* Analytics
* Audit logs

---

### 5️⃣ Frontend Application

A minimal web UI for:

* Issuing credentials (admin/issuer)
* Verifying credentials (public)
* Viewing revocation status

---

## 🏁 Final Notes

The blockchain layer is **complete, secure, and tested**.
Future work focuses on **integration, usability, and scalability**.

---

If you want next, I can:

* Rewrite this README to sound **more academic / final-year-project style**
* Help you write the **API folder structure**
* Convert this into **resume-ready bullet points**
* Add a **system architecture diagram section**

Just tell me what you want next 🚀
