import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface FeatureFlag {
  key: string;
  value: boolean;
}

export async function GET() {
  try {
    const flags = await query<FeatureFlag>("SELECT key, value FROM feature_flag ORDER BY key");
    return NextResponse.json(flags);
  } catch (error) {
    console.error("Error fetching feature flags:", error);
    return NextResponse.json({ error: "Failed to fetch feature flags" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: "Key and value are required" }, { status: 400 });
    }

    const result = await query<FeatureFlag>(
      "UPDATE feature_flag SET value = $1 WHERE key = $2 RETURNING key, value",
      [value, key]
    );

    if (result.length === 0) {
      return NextResponse.json({ error: "Feature flag not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating feature flag:", error);
    return NextResponse.json({ error: "Failed to update feature flag" }, { status: 500 });
  }
}
