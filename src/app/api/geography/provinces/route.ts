import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Province {
  id: number;
  region_id: number;
  code: string;
  name: string;
  region_name?: string;
}

export async function GET() {
  try {
    const provinces = await query<Province>(`
      SELECT p.id, p.region_id, p.code, p.name, r.name as region_name
      FROM province p
      LEFT JOIN region r ON p.region_id = r.id
      ORDER BY p.code
    `);
    return NextResponse.json(provinces);
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return NextResponse.json({ error: "Failed to fetch provinces" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { region_id, code, name } = body;

    if (!region_id || !code || !name) {
      return NextResponse.json({ error: "Region, code and name are required" }, { status: 400 });
    }

    const result = await query<Province>(
      "INSERT INTO province (region_id, code, name) VALUES ($1, $2, $3) RETURNING id, region_id, code, name",
      [region_id, code, name]
    );

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating province:", error);
    return NextResponse.json({ error: "Failed to create province" }, { status: 500 });
  }
}
