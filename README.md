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
