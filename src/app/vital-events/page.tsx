import TopMenu from "@/components/TopMenu";
import { Baby, Cross } from "lucide-react";
import Link from "next/link";

export default function VitalEventsPage() {
  const sections = [
    {
      title: "Births",
      href: "/vital-events/births",
      icon: Baby,
      count: 0,
      description: "Birth registrations and certificates",
      color: "text-green-600"
    },
    {
      title: "Deaths",
      href: "/vital-events/deaths",
      icon: Cross,
      count: 0,
      description: "Death registrations and records",
      color: "text-gray-600"
    },
  ];

  return (
    <>
      <TopMenu section="Vital Events" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Vital Events</h1>
          <p className="text-gray-600">Manage birth and death registrations</p>
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

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Registration Process</h3>
          <p className="text-sm text-blue-700">
            Vital events should be recorded by Ward Recorders and verified by local officials.
            Supporting documentation (hospital records, burial permits, etc.) should be attached to each registration.
          </p>
        </div>
      </div>
    </>
  );
}
