import TopMenu from "@/components/TopMenu";
import { Flag, Smartphone, ClipboardList } from "lucide-react";
import Link from "next/link";

export default function SystemAdminPage() {
  const sections = [
    {
      title: "Feature Flags",
      href: "/system-admin/feature-flags",
      icon: Flag,
      count: 2,
      description: "Toggle system features on/off",
      color: "text-blue-600"
    },
    {
      title: "Device Profiles",
      href: "/system-admin/device-profiles",
      icon: Smartphone,
      count: 0,
      description: "Biometric device configurations",
      color: "text-purple-600"
    },
    {
      title: "Audit Log",
      href: "/system-admin/audit",
      icon: ClipboardList,
      count: 0,
      description: "System activity and changes",
      color: "text-green-600"
    },
  ];

  return (
    <>
      <TopMenu section="System Administration" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">System Administration</h1>
          <p className="text-gray-600">Configure system settings and monitor activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={section.color}>
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{section.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{section.description}</p>
                    <div className="text-2xl font-bold text-gray-800">{section.count}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Current Configuration</h3>
            <div className="text-sm text-yellow-700 space-y-1">
              <div className="flex items-center justify-between">
                <span>Authentication:</span>
                <span className="font-medium">Disabled (Development Mode)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Audit Logging:</span>
                <span className="font-medium">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database:</span>
                <span className="font-medium">PostgreSQL (Local)</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">System Information</h3>
            <p className="text-sm text-blue-700">
              This system is designed to run entirely offline on local infrastructure.
              All data is stored in a local PostgreSQL database with no cloud dependencies.
              Biometric files are stored on local file paths referenced in the database.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
