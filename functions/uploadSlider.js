// functions/uploadSlider.js
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.handler = async function (event, context) {
  try {
    // Only accept POST requests
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    // Parse the request body
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (err) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON body" }),
      };
    }

    const { base64, title, description } = body;

    if (!base64) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No base64 image provided" }),
      };
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64, {
      folder: "slider",
      resource_type: "auto", // supports images and videos
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Slider uploaded successfully",
        url: uploadResponse.secure_url,
        title: title || null,
        description: description || null,
      }),
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};