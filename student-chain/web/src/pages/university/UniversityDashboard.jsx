import DashboardLayout from "../../layouts/DashboardLayout";
import StatBox from "../../components/StatBox";

export default function UniversityDashboard() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">
          University Overview
        </h2>
        <p className="text-gray-400">
          Monitor credential issuance and verification metrics.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <StatBox title="Total Students" value="1,240" color="text-blue-500" />
        <StatBox title="Credentials Issued" value="3,820" color="text-green-500" />
        <StatBox title="Revoked Credentials" value="12" color="text-red-500" />
      </div>
    </DashboardLayout>
  );
}
