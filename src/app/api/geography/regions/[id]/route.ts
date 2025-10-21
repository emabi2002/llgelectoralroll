import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface Region {
  id: number;
  code: string;
  name: string;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { code, name } = body;

    if (!code || !name) {
      return NextResponse.json({ error: "Code and name are required" }, { status: 400 });
    }

    const result = await query<Region>(
      "UPDATE region SET code = $1, name = $2 WHERE id = $3 RETURNING id, code, name",
      [code, name, id]
    );

    if (result.length === 0) {
      return NextResponse.json({ error: "Region not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating region:", error);
    return NextResponse.json({ error: "Failed to update region" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await query("DELETE FROM region WHERE id = $1", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting region:", error);
    return NextResponse.json({ error: "Failed to delete region" }, { status: 500 });
  }
}
