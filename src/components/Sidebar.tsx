"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Users,
  HeartPulse,
  FileSpreadsheet,
  Vote,
  CheckSquare,
  FileText,
  Database,
  Settings
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Geography", href: "/geography", icon: MapPin },
  { label: "Registry", href: "/registry", icon: Users },
  { label: "Vital Events", href: "/vital-events", icon: HeartPulse },
  { label: "Baseline Surveys", href: "/baseline-surveys", icon: FileSpreadsheet },
  { label: "Elections", href: "/elections", icon: Vote },
  { label: "Verifications", href: "/verifications", icon: CheckSquare },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Data Admin", href: "/data-admin", icon: Database },
  { label: "System Administration", href: "/system-admin", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-4 flex-shrink-0">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Provincial & LLG</h1>
        <p className="text-sm text-gray-500">Citizen Registry</p>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                active
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
