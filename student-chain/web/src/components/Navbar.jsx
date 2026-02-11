import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-6">
      <Link to="/issue">Issue</Link>
      <Link to="/verify">Verify</Link>
      <Link to="/events">Events</Link>
    </nav>
  );
}
