// netlify/functions/uploadGallery.js
import { v2 as cloudinary } from "cloudinary";

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

    const data = JSON.parse(event.body);
    const { image } = data;

    if (!image) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No image provided" }),
      };
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "gallery",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        url: result.secure_url,
      }),
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Upload failed", details: error.message }),
    };
  }
};