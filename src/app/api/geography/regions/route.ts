import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Region {
  id: number;
  code: string;
  name: string;
}

export async function GET() {
  try {
    const regions = await query<Region>("SELECT id, code, name FROM region ORDER BY code");
    return NextResponse.json(regions);
  } catch (error) {
    console.error("Error fetching regions:", error);
    return NextResponse.json({ error: "Failed to fetch regions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, name } = body;

    if (!code || !name) {
      return NextResponse.json({ error: "Code and name are required" }, { status: 400 });
    }

    const result = await query<Region>(
      "INSERT INTO region (code, name) VALUES ($1, $2) RETURNING id, code, name",
      [code, name]
    );

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating region:", error);
    return NextResponse.json({ error: "Failed to create region" }, { status: 500 });
  }
}
