export default function Topbar() {
  return (
    <div className="bg-gray-900 border-b border-gray-800 p-5 flex justify-between items-center">
      <h1 className="text-xl font-semibold tracking-wide">
        Credential Management Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400">Demo Admin</div>
        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  );
}
