# Canonicalization Specification v1.0.0

## Purpose
This specification defines how academic credential data is transformed into a
deterministic byte representation before hashing and anchoring on the blockchain.

Goal:
Same credential data → same hash → forever.

---

## 1. Encoding
- All credential data MUST be encoded using **UTF-8**.
- Byte Order Mark (BOM) is NOT allowed.

---

## 2. JSON Canonicalization Rules

### 2.1 Object Keys
- JSON object keys MUST be **sorted lexicographically (ASCII order)**.
- Sorting MUST be applied recursively to all nested objects.

### 2.2 Whitespace
- No whitespace is allowed:
  - No spaces
  - No tabs
  - No newlines
- JSON MUST be serialized in a **fully minified form**.

### 2.3 Numbers
- Integers:
  - No leading zeros (e.g., `7`, not `007`)
- Floating-point numbers:
  - Fixed decimal precision (e.g., `3.50`)
  - Scientific notation is NOT allowed.

### 2.4 Dates
- All date fields MUST follow **ISO 8601** format:


- Timestamps and timezones are NOT permitted unless explicitly defined.

---

## 3. Required Metadata Field

Every credential MUST include the following field at the root level:

```json
"canonSpecVersion": "1.0.0"

4. Hashing Algorithm

Convert the canonicalized JSON string to UTF-8 bytes.

Compute a SHA-256 hash over the exact byte stream.

The resulting 32-byte digest:

Is stored on-chain as bytes32

Is used for verification and integrity checks.

5. Determinism Guarantee

If:

The credential data is semantically identical, and

This canonicalization specification is followed exactly,

Then:

hash(input A) == hash(input B)


This guarantees long-term, cross-system verifiability.

6. Example
Input (non-canonical)
{
  "name": "Alice",
  "cgpa": 3.5,
  "issuedOn": "2024-6-1"
}

Canonical Form
{"canonSpecVersion":"1.0.0","cgpa":3.50,"issuedOn":"2024-06-01","name":"Alice"}

Hash
SHA-256(canonical_bytes) → 0x…

7. Rationale

Canonicalization prevents:

Hash mismatches caused by formatting differences

Cross-language serialization issues

Malicious data manipulation through reordering or whitespace

This specification is a foundational requirement for blockchain-based credential
verification systems.


---

### ✅ After pasting
Run:
```bash
git add docs/canonicalization.md
git commit -m "Add canonicalization specification v1.0.0"