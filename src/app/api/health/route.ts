import { ensureSchema, getPool } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    await ensureSchema();
    await getPool().query("SELECT 1");
    return Response.json({ ok: true, db: "connected" });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
