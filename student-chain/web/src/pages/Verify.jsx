import { useState } from "react";

async function generateHash(data) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(JSON.stringify(data));
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function Verify() {
  const [credentialId, setCredentialId] = useState("");
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    const stored = localStorage.getItem(credentialId);

    if (!stored) {
      setResult({ valid: false });
      return;
    }

    const data = JSON.parse(stored);

    const { hash, ...originalData } = data;

    const recalculatedHash = await generateHash(originalData);

    const hashMatches = hash === recalculatedHash;

    setResult({
      valid: hashMatches && !data.revoked,
      issuer: data.issuer,
      issuedAt: data.issuedAt,
      revoked: data.revoked,
      hashMatches
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Verify Credential</h1>

      <input
        placeholder="Enter Credential ID"
        className="input"
        value={credentialId}
        onChange={(e) => setCredentialId(e.target.value)}
      />

      <button onClick={handleVerify} className="btn-primary w-full mt-4">
        Verify
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded">
          <p className={`font-bold ${result.valid ? "text-green-600" : "text-red-600"}`}>
            {result.valid ? "VALID" : "INVALID"}
          </p>

          <p>Hash Match: {result.hashMatches ? "Yes" : "No"}</p>
          <p>Revoked: {result.revoked ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}
