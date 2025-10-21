import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface VitalEvent {
  id: number;
  person_id: number | null;
  event_type: string;
  event_date: string;
  ward_id: number | null;
  village_id: number | null;
  notes: string | null;
  recorded_by: string | null;
  supporting_doc_path: string | null;
  person_name?: string;
  village_name?: string;
  ward_name?: string;
}

export async function GET() {
  try {
    const births = await query<VitalEvent>(`
      SELECT
        ve.*,
        CONCAT(p.given_names, ' ', p.surname) as person_name,
        v.name as village_name,
        w.name as ward_name
      FROM vital_event ve
      LEFT JOIN person p ON ve.person_id = p.id
      LEFT JOIN village v ON ve.village_id = v.id
      LEFT JOIN ward w ON ve.ward_id = w.id
      WHERE ve.event_type = 'BIRTH'
      ORDER BY ve.event_date DESC
      LIMIT 100
    `);
    return NextResponse.json(births);
  } catch (error) {
    console.error("Error fetching births:", error);
    return NextResponse.json({ error: "Failed to fetch births" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { person_id, event_date, ward_id, village_id, notes, recorded_by, supporting_doc_path } = body;

    if (!event_date) {
      return NextResponse.json({ error: "Event date is required" }, { status: 400 });
    }

    const result = await query<VitalEvent>(
      `INSERT INTO vital_event (
        person_id, event_type, event_date, ward_id, village_id,
        notes, recorded_by, supporting_doc_path
      ) VALUES ($1, 'BIRTH', $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [person_id || null, event_date, ward_id || null, village_id || null, notes || null, recorded_by || null, supporting_doc_path || null]
    );

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating birth record:", error);
    return NextResponse.json({ error: "Failed to create birth record" }, { status: 500 });
  }
}
