export default function StatBox({ title, value, color }) {
  return (
    <div className="card">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );
}
