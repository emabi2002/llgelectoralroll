import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface LLG {
  id: number;
  district_id: number;
  code: string;
  name: string;
  type: string;
  district_name?: string;
  province_name?: string;
}

export async function GET() {
  try {
    const llgs = await query<LLG>(`
      SELECT
        l.id, l.district_id, l.code, l.name, l.type,
        d.name as district_name,
        p.name as province_name
      FROM llg l
      LEFT JOIN district d ON l.district_id = d.id
      LEFT JOIN province p ON d.province_id = p.id
      ORDER BY l.code
    `);
    return NextResponse.json(llgs);
  } catch (error) {
    console.error("Error fetching LLGs:", error);
    return NextResponse.json({ error: "Failed to fetch LLGs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { district_id, code, name, type } = body;

    if (!district_id || !code || !name) {
      return NextResponse.json({ error: "District, code and name are required" }, { status: 400 });
    }

    const result = await query<LLG>(
      "INSERT INTO llg (district_id, code, name, type) VALUES ($1, $2, $3, $4) RETURNING id, district_id, code, name, type",
      [district_id, code, name, type || 'Rural']
    );

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating LLG:", error);
    return NextResponse.json({ error: "Failed to create LLG" }, { status: 500 });
  }
}
