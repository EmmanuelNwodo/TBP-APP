import { randomUUID } from "node:crypto";
import { ensureSchema, getPool } from "@/lib/db";
import { storeResume } from "@/lib/resume-storage";

export const runtime = "nodejs";

const MAX_RESUME_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = String(formData.get("fullName") ?? "");
    const email = String(formData.get("email") ?? "");
    const phone = String(formData.get("phone") ?? "");
    const linkedin = String(formData.get("linkedin") ?? "");
    const portfolio = String(formData.get("portfolio") ?? "");
    const role = String(formData.get("role") ?? "");
    const coverLetter = String(formData.get("coverLetter") ?? "");
    const resume = formData.get("resume");

    if (!(resume instanceof File) || resume.size === 0) {
      return Response.json({ ok: false, error: "Resume file is required." }, { status: 400 });
    }
    if (resume.size > MAX_RESUME_BYTES) {
      return Response.json({ ok: false, error: "Resume must be 10MB or smaller." }, { status: 400 });
    }

    const id = `${Date.now()}-${randomUUID()}`;
    const uploaded = await storeResume(id, resume);

    await ensureSchema();
    await getPool().query(
      `INSERT INTO career_applications
        (id, submitted_at, full_name, email, phone, linkedin, portfolio, role, cover_letter, resume_original_name, resume_url, resume_mime_type, resume_size)
       VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        fullName,
        email,
        phone,
        linkedin,
        portfolio,
        role,
        coverLetter,
        uploaded.originalName,
        uploaded.url,
        uploaded.mimeType,
        uploaded.size,
      ]
    );

    return Response.json({ ok: true, id });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
