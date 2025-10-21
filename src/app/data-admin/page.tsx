import TopMenu from "@/components/TopMenu";
import { Upload, Download, Table2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DataAdminPage() {
  const sections = [
    {
      title: "Imports",
      href: "/data-admin/imports",
      icon: Upload,
      count: 0,
      description: "Import data from CSV/Excel",
      color: "text-blue-600"
    },
    {
      title: "Exports",
      href: "/data-admin/exports",
      icon: Download,
      count: 0,
      description: "Export data to CSV/PDF",
      color: "text-green-600"
    },
    {
      title: "Code Tables",
      href: "/data-admin/code-tables",
      icon: Table2,
      count: 10,
      description: "Manage lookup values",
      color: "text-purple-600"
    },
    {
      title: "Data Quality",
      href: "/data-admin/data-quality",
      icon: AlertTriangle,
      count: 0,
      description: "Check for issues",
      color: "text-orange-600"
    },
  ];

  return (
    <>
      <TopMenu section="Data Admin" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Data Administration</h1>
          <p className="text-gray-600">Import, export, and maintain data quality</p>
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

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Import Templates Available</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Persons (given_names, surname, sex, date_of_birth, ward_code, village_name)</li>
              <li>Households (village_name, household_code, head_full_name, gps_lat, gps_lng)</li>
              <li>Villages (ward_code, village_name, latitude, longitude)</li>
              <li>Vital Events (event_type, event_date, person_nid, ward_code, recorded_by)</li>
              <li>Baseline Surveys (household_code, survey_date, water_source, sanitation)</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Data Quality Checks</h3>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
              <li>Duplicate person records (same name + date of birth)</li>
              <li>Missing ward or village assignments</li>
              <li>Invalid NID numbers</li>
              <li>Orphaned biometric records</li>
              <li>Households without persons</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
