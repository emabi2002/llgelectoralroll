import TopMenu from "@/components/TopMenu";
import {
  Users,
  CheckSquare,
  FileSpreadsheet,
  MapPinned,
  HeartPulse,
  Vote,
  AlertCircle,
  TrendingUp
} from "lucide-react";

export default function Home() {
  const cards = [
    { title: "Registered Persons", value: "0", icon: Users, color: "text-blue-600" },
    { title: "Pending Verifications", value: "0", icon: CheckSquare, color: "text-yellow-600" },
    { title: "Baseline Surveys", value: "0", icon: FileSpreadsheet, color: "text-green-600" },
    { title: "Polling Stations", value: "0", icon: MapPinned, color: "text-purple-600" },
    { title: "Vital Events (30d)", value: "0", icon: HeartPulse, color: "text-red-600" },
    { title: "Election Roll Entries", value: "0", icon: Vote, color: "text-indigo-600" },
    { title: "Data Quality Alerts", value: "0", icon: AlertCircle, color: "text-orange-600" },
    { title: "Coverage Rate", value: "0%", icon: TrendingUp, color: "text-teal-600" },
  ];

  const recentActivity = [
    { action: "System initialized", time: "Just now", user: "System" },
  ];

  const quickActions = [
    { label: "Add Person", href: "/registry/persons" },
    { label: "Record Birth", href: "/vital-events/births" },
    { label: "Import CSV", href: "/data-admin/imports" },
    { label: "Start Roll Build", href: "/elections/roll-build" },
  ];

  return (
    <>
      <TopMenu section="Dashboard" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Provincial & LLG Citizen Registry Overview</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-white rounded-lg shadow p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`${card.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-sm text-gray-600">{card.title}</div>
                </div>
                <div className="text-3xl font-bold text-gray-800">{card.value}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-center"
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-5 lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{activity.action}</div>
                    <div className="text-xs text-gray-500">{activity.user}</div>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-blue-800">System Information</h3>
              <p className="text-sm text-blue-700 mt-1">
                This registry system runs on a local PostgreSQL database. Authentication is currently disabled for development.
                To enable authentication, update the feature flag in System Administration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
