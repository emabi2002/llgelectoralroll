import TopMenu from "@/components/TopMenu";
import { MapPin, Building2, Map, Users2, Milestone, Home } from "lucide-react";
import Link from "next/link";

export default function GeographyPage() {
  const sections = [
    { title: "Regions", href: "/geography/regions", icon: Map, count: 4, description: "Top-level regional divisions" },
    { title: "Provinces", href: "/geography/provinces", icon: MapPin, count: 0, description: "Provincial boundaries" },
    { title: "Districts", href: "/geography/districts", icon: Building2, count: 0, description: "District-level divisions" },
    { title: "LLGs", href: "/geography/llgs", icon: Users2, count: 0, description: "Local-Level Governments" },
    { title: "Wards", href: "/geography/wards", icon: Milestone, count: 0, description: "Electoral wards" },
    { title: "Villages", href: "/geography/villages", icon: Home, count: 0, description: "Village communities" },
  ];

  return (
    <>
      <TopMenu section="Geography" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Geography Management</h1>
          <p className="text-gray-600">Manage the hierarchical geography structure: Regions, Provinces, Districts, LLGs, Wards, and Villages</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="text-blue-600">
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
      </div>
    </>
  );
}
