import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Issue from "./pages/Issue";
import Verify from "./pages/Verify";
import Events from "./pages/Events";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/issue" />} />

        {/* Pages */}
        <Route path="/issue" element={<Issue />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}
