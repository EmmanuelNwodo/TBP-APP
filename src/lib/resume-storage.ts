import { put } from "@vercel/blob";

export type UploadedResume = {
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
};

/**
 * Stores a resume upload in Vercel Blob and returns its public URL plus
 * metadata for the career_applications row. Kept behind this module so the
 * API route doesn't depend on @vercel/blob directly — swappable storage
 * backend without touching the route handler.
 */
export async function storeResume(id: string, file: File): Promise<UploadedResume> {
  const blob = await put(`resumes/${id}-${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return {
    url: blob.url,
    originalName: file.name,
    mimeType: file.type,
    size: file.size,
  };
}
