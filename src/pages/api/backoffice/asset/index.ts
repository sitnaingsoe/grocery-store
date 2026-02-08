import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
import fs from "fs";

// Disable default body parser for multer
export const config = { api: { bodyParser: false } };

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// TypeScript extension
export interface NextApiRequestWithFile extends NextApiRequest {
  file?: Express.Multer.File;
}

// Multer setup for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const upload = multer({ storage }).single("file");

export default function handler(req: NextApiRequestWithFile, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  upload(req as any, res as any, (err: any) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Build public URL for frontend
    const assetUrl = `/uploads/${req.file.filename}`;
    return res.status(200).json({ assetUrl });
  });
}
