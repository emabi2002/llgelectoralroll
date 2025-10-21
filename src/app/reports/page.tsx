import TopMenu from "@/components/TopMenu";
import { FileText, BarChart3, AlertCircle, Users } from "lucide-react";
import Link from "next/link";

export default function ReportsPage() {
  const sections = [
    {
      title: "Roll Extracts",
      href: "/reports/roll-extracts",
      icon: FileText,
      count: 0,
      description: "Election roll reports by ward",
      color: "text-blue-600"
    },
    {
      title: "Coverage",
      href: "/reports/coverage",
      icon: BarChart3,
      count: 0,
      description: "Registration coverage statistics",
      color: "text-green-600"
    },
    {
      title: "Duplicates",
      href: "/reports/duplicates",
      icon: AlertCircle,
      count: 0,
      description: "Potential duplicate records",
      color: "text-orange-600"
    },
    {
      title: "Demographics",
      href: "/reports/demographics",
      icon: Users,
      count: 0,
      description: "Age and gender statistics",
      color: "text-purple-600"
    },
  ];

  return (
    <>
      <TopMenu section="Reports" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-600">Generate and export system reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Report Formats</h3>
          <p className="text-sm text-blue-700">
            Reports can be exported in CSV format for analysis or PDF format with official signatures for distribution.
            All reports include filters for region, province, district, LLG, and ward levels.
          </p>
        </div>
      </div>
    </>
  );
}
