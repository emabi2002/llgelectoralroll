import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Person {
  id: number;
  household_id: number | null;
  given_names: string;
  surname: string;
  other_names: string | null;
  sex: string;
  date_of_birth: string | null;
  nid_number: string | null;
  civil_status: string | null;
  occupation: string | null;
  ward_id: number | null;
  village_id: number | null;
  is_alive: boolean;
  created_at: string;
  village_name?: string;
  ward_name?: string;
}

export async function GET() {
  try {
    const persons = await query<Person>(`
      SELECT
        p.*,
        v.name as village_name,
        w.name as ward_name
      FROM person p
      LEFT JOIN village v ON p.village_id = v.id
      LEFT JOIN ward w ON p.ward_id = w.id
      ORDER BY p.surname, p.given_names
      LIMIT 100
    `);
    return NextResponse.json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    return NextResponse.json({ error: "Failed to fetch persons" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      household_id,
      given_names,
      surname,
      other_names,
      sex,
      date_of_birth,
      nid_number,
      civil_status,
      occupation,
      ward_id,
      village_id,
      is_alive
    } = body;

    if (!given_names || !surname || !sex) {
      return NextResponse.json({ error: "Given names, surname and sex are required" }, { status: 400 });
    }

    const result = await query<Person>(
      `INSERT INTO person (
        household_id, given_names, surname, other_names, sex,
        date_of_birth, nid_number, civil_status, occupation,
        ward_id, village_id, is_alive
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *`,
      [
        household_id || null,
        given_names,
        surname,
        other_names || null,
        sex,
        date_of_birth || null,
        nid_number || null,
        civil_status || null,
        occupation || null,
        ward_id || null,
        village_id || null,
        is_alive !== undefined ? is_alive : true
      ]
    );

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating person:", error);
    return NextResponse.json({ error: "Failed to create person" }, { status: 500 });
  }
}
