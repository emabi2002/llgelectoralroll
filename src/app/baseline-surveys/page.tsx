import TopMenu from "@/components/TopMenu";
import { Home, Building2 } from "lucide-react";
import Link from "next/link";

export default function BaselineSurveysPage() {
  const sections = [
    {
      title: "Household Surveys",
      href: "/baseline-surveys/household",
      icon: Home,
      count: 0,
      description: "Water, sanitation, lighting, income sources",
      color: "text-blue-600"
    },
    {
      title: "Village Facilities",
      href: "/baseline-surveys/facilities",
      icon: Building2,
      count: 0,
      description: "Clinics, schools, markets, infrastructure",
      color: "text-green-600"
    },
  ];

  return (
    <>
      <TopMenu section="Baseline Surveys" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Baseline Surveys</h1>
          <p className="text-gray-600">Collect household and community infrastructure data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className={section.color}>
                    <Icon size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{section.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{section.description}</p>
                    <div className="text-2xl font-bold text-gray-800">{section.count}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Household Survey Data Points</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Water source (tap, well, river, rainwater)</li>
              <li>Sanitation facilities (flush toilet, pit latrine, none)</li>
              <li>Lighting (electricity, solar, kerosene, none)</li>
              <li>Income sources (agriculture, wage labor, business)</li>
              <li>Number of males and females in household</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">Village Facilities Survey</h3>
            <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
              <li>Health clinic availability and condition</li>
              <li>School facilities (primary, secondary)</li>
              <li>Market or trade store access</li>
              <li>Road access (all-weather, seasonal, footpath only)</li>
              <li>Mobile network coverage (provider and quality)</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Survey Purpose</h3>
            <p className="text-sm text-yellow-700">
              Baseline surveys provide essential data for resource allocation, development planning, and service delivery.
              Ward Recorders should conduct surveys regularly and update data as infrastructure changes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
