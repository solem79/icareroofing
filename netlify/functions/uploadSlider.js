import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const config = { api: { bodyParser: false } };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Form error" });

    const file = files.image;
    if (!file) return res.status(400).json({ error: "No image" });

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: "icare-slider"
      });

      fs.unlinkSync(file.filepath);

      res.status(200).json({
        message: "Uploaded",
        url: result.secure_url,
        title: fields.title,
        description: fields.description
      });

    } catch (e) {
      res.status(500).json({ error: "Upload failed" });
    }
  });
};