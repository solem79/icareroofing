exports.handler = async (event) => {
  try {
    // Only allow POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    // Parse request body
    const data = JSON.parse(event.body || "{}");

    if (!data.image) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "No image provided" }),
      };
    }

    // TODO: Save image to storage/database here
    // For now just return success

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Upload successful",
        image: data.image,
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Server error",
        error: error.message,
      }),
    };
  }
};