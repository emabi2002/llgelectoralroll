import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Ward {
  id: number;
  llg_id: number;
  code: string;
  name: string;
  llg_name?: string;
  district_name?: string;
  province_name?: string;
}

export async function GET() {
  try {
    const wards = await query<Ward>(`
      SELECT
        w.id, w.llg_id, w.code, w.name,
        l.name as llg_name,
        d.name as district_name,
        p.name as province_name
      FROM ward w
      LEFT JOIN llg l ON w.llg_id = l.id
      LEFT JOIN district d ON l.district_id = d.id
      LEFT JOIN province p ON d.province_id = p.id
      ORDER BY w.code
    `);
    return NextResponse.json(wards);
  } catch (error) {
    console.error("Error fetching wards:", error);
    return NextResponse.json({ error: "Failed to fetch wards" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { llg_id, code, name } = body;

    if (!llg_id || !code || !name) {
      return NextResponse.json({ error: "LLG, code and name are required" }, { status: 400 });
    }

    const result = await query<Ward>(
      "INSERT INTO ward (llg_id, code, name) VALUES ($1, $2, $3) RETURNING id, llg_id, code, name",
      [llg_id, code, name]
    );

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating ward:", error);
    return NextResponse.json({ error: "Failed to create ward" }, { status: 500 });
  }
}
