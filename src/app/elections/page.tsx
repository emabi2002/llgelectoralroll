import TopMenu from "@/components/TopMenu";
import { Vote, FileCheck, MapPinned, Download } from "lucide-react";
import Link from "next/link";

export default function ElectionsPage() {
  const sections = [
    {
      title: "Roll Build",
      href: "/elections/roll-build",
      icon: Vote,
      count: 0,
      description: "Build election rolls by ward",
      color: "text-blue-600"
    },
    {
      title: "Eligibility Rules",
      href: "/elections/eligibility-rules",
      icon: FileCheck,
      count: 1,
      description: "Define voter eligibility criteria",
      color: "text-purple-600"
    },
    {
      title: "Polling Stations",
      href: "/elections/polling-stations",
      icon: MapPinned,
      count: 0,
      description: "Manage polling station locations",
      color: "text-green-600"
    },
    {
      title: "Exports",
      href: "/elections/exports",
      icon: Download,
      count: 0,
      description: "Export rolls and reports",
      color: "text-orange-600"
    },
  ];

  return (
    <>
      <TopMenu section="Elections" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Elections Management</h1>
          <p className="text-gray-600">Prepare election rolls for Presidents and Ward Councillors</p>
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
          <h3 className="font-semibold text-blue-800 mb-2">Election Roll Process</h3>
          <ol className="text-sm text-blue-700 space-y-2 list-decimal list-inside">
            <li>Define eligibility rules (age requirement, residency, etc.)</li>
            <li>Build roll by applying rules to verified citizen records</li>
            <li>Assign voters to polling stations within their wards</li>
            <li>Export rolls for Presidents and Ward Councillors separately</li>
            <li>Generate PDF summaries with official signatures</li>
          </ol>
        </div>
      </div>
    </>
  );
}
