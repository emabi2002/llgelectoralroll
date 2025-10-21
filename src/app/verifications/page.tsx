import TopMenu from "@/components/TopMenu";
import { CheckSquare, Clock, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export default function VerificationsPage() {
  const sections = [
    {
      title: "New Verification",
      href: "/verifications/new",
      icon: CheckSquare,
      count: "-",
      description: "Create a new verification request",
      color: "text-blue-600"
    },
    {
      title: "Pending",
      href: "/verifications/pending",
      icon: Clock,
      count: 0,
      description: "Verifications awaiting approval",
      color: "text-yellow-600"
    },
    {
      title: "Verified",
      href: "/verifications/verified",
      icon: CheckCircle2,
      count: 0,
      description: "Approved verifications",
      color: "text-green-600"
    },
    {
      title: "Rejected",
      href: "/verifications/rejected",
      icon: XCircle,
      count: 0,
      description: "Rejected verifications",
      color: "text-red-600"
    },
  ];

  return (
    <>
      <TopMenu section="Verifications" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Verifications</h1>
          <p className="text-gray-600">Manage official attestations and biometric verifications</p>
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
            <h3 className="font-semibold text-blue-800 mb-2">Verification Methods</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li><strong>Biometric:</strong> Fingerprint, face, iris, or voice capture</li>
              <li><strong>Attestation:</strong> Signed verification by Pastor, Magistrate, Councillor, or President</li>
              <li><strong>Both:</strong> Combined biometric and official attestation</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Authorized Verifiers</h3>
            <p className="text-sm text-yellow-700">
              Only registered Pastors, Magistrates, Ward Councillors, and LLG Presidents can perform official verifications.
              Each verifier must be registered in the system with their ward/village assignment.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
