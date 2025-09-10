import { NextResponse } from "next/server";
import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.select().from(campaigns).orderBy(desc(campaigns.id));
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}
