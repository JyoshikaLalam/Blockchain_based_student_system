import { useState } from "react";

async function generateHash(data) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(JSON.stringify(data));
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function Issue() {
  const [form, setForm] = useState({
    studentDid: "",
    program: "",
    degree: "",
    cgpa: "",
    issueDate: "",
  });

  const [issuedId, setIssuedId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentialId = "CID-" + Date.now();

    const credentialData = {
      ...form,
      issuer: "0xABC123DEMO",
      issuedAt: new Date().toISOString(),
      revoked: false,
    };

    const hash = await generateHash(credentialData);

    const storedData = {
      ...credentialData,
      hash
    };

    localStorage.setItem(credentialId, JSON.stringify(storedData));

    const events = JSON.parse(localStorage.getItem("events") || "[]");
    events.push({
      credentialId,
      type: "Issued",
      timestamp: new Date().toLocaleString(),
    });
    localStorage.setItem("events", JSON.stringify(events));

    setIssuedId(credentialId);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Issue Credential</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="studentDid" placeholder="Student DID" className="input" onChange={handleChange} />
        <input name="program" placeholder="Program" className="input" onChange={handleChange} />
        <input name="degree" placeholder="Degree" className="input" onChange={handleChange} />
        <input name="cgpa" placeholder="CGPA" className="input" onChange={handleChange} />
        <input type="date" name="issueDate" className="input" onChange={handleChange} />

        <button className="btn-primary w-full">Issue Credential</button>
      </form>

      {issuedId && (
        <div className="mt-6 p-4 border rounded bg-green-100">
          <p className="font-semibold">Credential Issued!</p>
          <p>ID: {issuedId}</p>
        </div>
      )}
    </div>
  );
}
