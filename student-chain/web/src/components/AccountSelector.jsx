export default function AccountSelector({ accounts, setSelected }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Select Account (Issuer)
      </label>
      <select
        onChange={(e) => setSelected(e.target.value)}
        className="input"
      >
        {accounts.map((acc, i) => (
          <option key={i} value={acc.privateKey}>
            {acc.address}
          </option>
        ))}
      </select>
    </div>
  );
}
