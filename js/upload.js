/**
 * uploadImage - Uploads a file to Netlify function `uploadImage.js`
 * type: "slider" or "gallery"
 * imageId: ID of <input type="file">
 * titleId: ID of title input
 * descId: ID of description input
 */
async function uploadImage(type, imageId, titleId, descId) {
  const imageInput = document.getElementById(imageId);
  const titleInput = document.getElementById(titleId);
  const descInput = document.getElementById(descId);

  if (!imageInput.files.length) {
    alert("Please select an image to upload");
    return;
  }

  const formData = new FormData();
  formData.append("type", type); // tells backend slider or gallery
  formData.append("title", titleInput.value);
  formData.append("description", descInput.value);
  formData.append("image", imageInput.files[0]);

  try {
    const response = await fetch("/.netlify/functions/uploadImage", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`);

      // Clear inputs
      imageInput.value = "";
      titleInput.value = "";
      descInput.value = "";

      // Optional: show uploaded image preview
      const previewContainer = document.getElementById(`${type}Preview`);
      if (previewContainer) {
        const img = document.createElement("img");
        img.src = data.url;
        img.alt = data.title;
        img.style.maxWidth = "150px";
        img.style.margin = "5px";
        previewContainer.appendChild(img);
      }

    } else {
      alert(`Upload failed: ${data.error}`);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Check console for details.");
  }
}