export default function Card({ title, children }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
