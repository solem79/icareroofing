// netlify/functions/uploadGallery.js
import { v2 as cloudinary } from "cloudinary";

// Load environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" }),
      };
    }

    // Parse incoming JSON (expects array of images)
    const data = JSON.parse(event.body);
    const { images } = data; // images should be an array of base64 strings or URLs

    if (!images || !Array.isArray(images) || images.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No images provided" }),
      };
    }

    // Upload all images to Cloudinary
    const uploadPromises = images.map((img) =>
      cloudinary.uploader.upload(img, { folder: "gallery" })
    );
    const results = await Promise.all(uploadPromises);

    const urls = results.map((res) => res.secure_url);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        urls,
      }),
    };
  } catch (error) {
    console.error("Cloudinary gallery upload error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Upload failed", details: error.message }),
    };
  }
};