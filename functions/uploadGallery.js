import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const config = { api: { bodyParser: false } };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true; // allow multiple files

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Error parsing form data" });

    const fileArray = Array.isArray(files.image) ? files.image : [files.image];

    if (!fileArray || !fileArray[0]) return res.status(400).json({ error: "No files uploaded" });

    try {
      const uploadResults = [];

      for (const file of fileArray) {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "icare-gallery",
        });
        fs.unlinkSync(file.filepath);
        uploadResults.push({
          url: result.secure_url,
          originalName: file.originalFilename,
        });
      }

      return res.status(200).json({
        message: "Gallery uploaded successfully!",
        images: uploadResults,
      });
    } catch (uploadErr) {
      console.error(uploadErr);
      return res.status(500).json({ error: "Cloudinary upload failed" });
    }
  });
}