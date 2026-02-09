// JS/gallery.js

async function uploadGallery(fileInput, title, description) {
  const file = fileInput.files[0];
  if (!file) return alert("Please select a file to upload");

  const button = document.querySelector("#galleryUploadButton");
  if (button) button.disabled = true;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64 = reader.result;

    try {
      const res = await fetch("/.netlify/functions/uploadGallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64, title, description }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      alert(data.message);
      console.log("Uploaded Gallery URL:", data.url);

      // Clear inputs
      fileInput.value = "";
      document.getElementById("galleryTitle").value = "";
      document.getElementById("galleryDesc").value = "";

      // Display uploaded image immediately
      const container = document.getElementById("galleryContainer");
      const imgDiv = document.createElement("div");
      imgDiv.style.marginBottom = "15px";

      imgDiv.innerHTML = `
        <img src="${data.url}" alt="${data.title}" style="max-width:200px; display:block; margin-bottom:5px;">
        <strong>${data.title}</strong><br>
        <em>${data.description}</em>
      `;

      container.prepend(imgDiv);

    } catch (err) {
      alert("Error uploading gallery image: " + err.message);
      console.error(err);
    } finally {
      if (button) button.disabled = false;
    }
  };

  reader.onerror = () => {
    alert("Failed to read file");
    if (button) button.disabled = false;
  };
}