import TopMenu from "@/components/TopMenu";
import { Users, Home, TreeDeciduous, Fingerprint } from "lucide-react";
import Link from "next/link";

export default function RegistryPage() {
  const sections = [
    {
      title: "Persons",
      href: "/registry/persons",
      icon: Users,
      count: 0,
      description: "Individual citizen records with personal details and identifiers"
    },
    {
      title: "Households",
      href: "/registry/households",
      icon: Home,
      count: 0,
      description: "Family units linked to villages with household codes"
    },
    {
      title: "Family Tree",
      href: "/registry/family-tree",
      icon: TreeDeciduous,
      count: 0,
      description: "Genealogical relationships between persons"
    },
    {
      title: "Biometrics",
      href: "/registry/biometrics",
      icon: Fingerprint,
      count: 0,
      description: "Captured biometric data for identity verification"
    },
  ];

  return (
    <>
      <TopMenu section="Registry" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Citizen Registry</h1>
          <p className="text-gray-600">Manage person records, households, family relationships, and biometric data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Ward Recorder Responsibilities</h3>
          <p className="text-sm text-yellow-700">
            Ward Recorders are the primary data source for citizen records. They maintain comprehensive family trees,
            vital event records, and household information. All data should be verified by local officials
            (Pastor, Magistrate, Councillor, or President) before being marked as official.
          </p>
        </div>
      </div>
    </>
  );
}
