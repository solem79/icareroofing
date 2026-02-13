exports.handler = async function (event, context) {
  // Log environment variables
  console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
  console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

  // Return a simple response
  return {
    statusCode: 200,
    body: JSON.stringify({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ? "OK ✅" : "MISSING ❌",
      apiKey: process.env.CLOUDINARY_API_KEY ? "OK ✅" : "MISSING ❌",
      apiSecret: process.env.CLOUDINARY_API_SECRET ? "OK ✅" : "MISSING ❌",
    }),
  };
};