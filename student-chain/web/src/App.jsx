import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UniversityDashboard from "./pages/university/UniversityDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import VerifierDashboard from "./pages/verifier/VerifierDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/university" />} />
        <Route path="/university" element={<UniversityDashboard />} />
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/verifier" element={<VerifierDashboard />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/university" />} />
      </Routes>
    </Router>
  );
}
