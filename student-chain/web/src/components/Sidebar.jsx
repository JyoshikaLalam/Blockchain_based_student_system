import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItem = (path, label, icon) => (
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        location.pathname === path
          ? "bg-blue-600 text-white"
          : "text-gray-400 hover:bg-gray-800 hover:text-white"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="w-72 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-blue-500">
        🎓 UniChain
      </h2>

      <div className="space-y-2">
        {navItem("/university", "University", "🏛")}
        {navItem("/faculty", "Faculty", "👨‍🏫")}
        {navItem("/student", "Student", "🎓")}
        {navItem("/verifier", "Verifier", "🔍")}
      </div>

      <div className="mt-auto text-xs text-gray-500 pt-10">
        Blockchain Credential System v1.0
      </div>
    </div>
  );
}
