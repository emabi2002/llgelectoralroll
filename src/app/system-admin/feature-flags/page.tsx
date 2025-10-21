"use client";

import { useState, useEffect } from "react";
import TopMenu from "@/components/TopMenu";
import { Flag } from "lucide-react";

interface FeatureFlag {
  key: string;
  value: boolean;
}

const flagDescriptions: Record<string, string> = {
  auth_enabled: "Enable authentication and user login system",
  audit_enabled: "Enable audit logging for all database changes",
};

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlags();
  }, []);

  const fetchFlags = async () => {
    try {
      const response = await fetch("/api/system-admin/feature-flags");
      const data = await response.json();
      setFlags(data);
    } catch (error) {
      console.error("Error fetching feature flags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key: string, currentValue: boolean) => {
    try {
      await fetch("/api/system-admin/feature-flags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: !currentValue }),
      });
      fetchFlags();
    } catch (error) {
      console.error("Error toggling feature flag:", error);
    }
  };

  return (
    <>
      <TopMenu section="System Administration" />
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Feature Flags</h1>
          <p className="text-gray-600">Enable or disable system features</p>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : (
              <div className="space-y-4">
                {flags.map((flag) => (
                  <div key={flag.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Flag className="text-blue-600 mt-1" size={20} />
                      <div>
                        <div className="font-medium text-gray-800">{flag.key}</div>
                        <div className="text-sm text-gray-600">{flagDescriptions[flag.key] || "No description"}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(flag.key, flag.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        flag.value ? "bg-green-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          flag.value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
          <p className="text-sm text-yellow-700">
            Changing feature flags may affect system functionality. Authentication is currently disabled for development purposes.
            Enable it when deploying to production environments.
          </p>
        </div>
      </div>
    </>
  );
}
