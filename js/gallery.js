async function uploadGallery(fileInputId) {
  const fileInput = document.getElementById(fileInputId);
  const files = fileInput.files;

  if (!files.length) return alert("Select at least one file");

  const formData = new FormData();
  for (const file of files) {
    formData.append("image", file);
  }

  try {
    const res = await fetch("/.netlify/functions/uploadGallery", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");

    alert(`Gallery uploaded successfully! ${data.images.length} image(s)`);
    console.log("Gallery images:", data.images);
  } catch (err) {
    console.error("Upload error:", err.message);
    alert("Error uploading gallery: " + err.message);
  }
}