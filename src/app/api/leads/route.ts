import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 0;
  const limit = 10;

  const data = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.id))
    .limit(limit)
    .offset(page * limit);

  return NextResponse.json(data);
}
