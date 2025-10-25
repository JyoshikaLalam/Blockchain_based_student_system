# Blockchain_based_student_system
This project leverages blockchain technology to create a secure transparent and tamperproof system for managing student academic records It ensures data integrity decentralization and controlled access for institutions students and employers.


# Blockchain-Based Student Information Management System
A decentralized registry for academic credentials using Ethereum and AI for validation.

## MVP Features
- Smart-contract credential registry
- REST API gateway
- AI service for canonicalization and risk detection
- Event indexer for audit logs
- Minimal web demo
- Full documentation and tests

## Quick Start
```bash
make up   # run everything locally
make down # stop all services
make test # run smart-contract tests



---

### 3️⃣  Add a `Makefile`
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
