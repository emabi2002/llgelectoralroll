"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubMenuItem {
  label: string;
  href: string;
}

interface TopMenuProps {
  section: string;
  items?: SubMenuItem[];
}

const sectionMenus: Record<string, SubMenuItem[]> = {
  "Geography": [
    { label: "Regions", href: "/geography/regions" },
    { label: "Provinces", href: "/geography/provinces" },
    { label: "Districts", href: "/geography/districts" },
    { label: "LLGs", href: "/geography/llgs" },
    { label: "Wards", href: "/geography/wards" },
    { label: "Villages", href: "/geography/villages" },
  ],
  "Registry": [
    { label: "Persons", href: "/registry/persons" },
    { label: "Households", href: "/registry/households" },
    { label: "Family Tree", href: "/registry/family-tree" },
    { label: "Biometrics", href: "/registry/biometrics" },
  ],
  "Vital Events": [
    { label: "Births", href: "/vital-events/births" },
    { label: "Deaths", href: "/vital-events/deaths" },
  ],
  "Baseline Surveys": [
    { label: "Household", href: "/baseline-surveys/household" },
    { label: "Facilities", href: "/baseline-surveys/facilities" },
  ],
  "Elections": [
    { label: "Roll Build", href: "/elections/roll-build" },
    { label: "Eligibility Rules", href: "/elections/eligibility-rules" },
    { label: "Polling Stations", href: "/elections/polling-stations" },
    { label: "Exports", href: "/elections/exports" },
  ],
  "Verifications": [
    { label: "New", href: "/verifications/new" },
    { label: "Pending", href: "/verifications/pending" },
    { label: "Verified", href: "/verifications/verified" },
    { label: "Rejected", href: "/verifications/rejected" },
  ],
  "Reports": [
    { label: "Roll Extracts", href: "/reports/roll-extracts" },
    { label: "Coverage", href: "/reports/coverage" },
    { label: "Duplicates", href: "/reports/duplicates" },
    { label: "Demographics", href: "/reports/demographics" },
  ],
  "Data Admin": [
    { label: "Imports", href: "/data-admin/imports" },
    { label: "Exports", href: "/data-admin/exports" },
    { label: "Code Tables", href: "/data-admin/code-tables" },
    { label: "Data Quality", href: "/data-admin/data-quality" },
  ],
  "System Administration": [
    { label: "Feature Flags", href: "/system-admin/feature-flags" },
    { label: "Device Profiles", href: "/system-admin/device-profiles" },
    { label: "Audit", href: "/system-admin/audit" },
  ],
};

export default function TopMenu({ section, items }: TopMenuProps) {
  const pathname = usePathname();
  const menuItems = items || sectionMenus[section] || [];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center gap-4">
      <div className="text-sm font-medium text-gray-700">{section}</div>
      {menuItems.length > 0 && (
        <>
          <div className="h-4 w-px bg-gray-300" />
          <div className="flex gap-1 flex-wrap">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
