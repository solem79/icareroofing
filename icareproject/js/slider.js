async function uploadSlider(fileInputId, titleId, descriptionId) {
  const fileInput = document.getElementById(fileInputId);
  const title = document.getElementById(titleId).value;
  const description = document.getElementById(descriptionId).value;

  const file = fileInput.files[0];
  if (!file) return alert("Select a file");

  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("description", description);

  try {
    const res = await fetch("/.netlify/functions/uploadSlider", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");

    alert("Slider uploaded successfully!");
    console.log("Slider URL:", data.url);
  } catch (err) {
    console.error("Upload error:", err.message);
    alert("Error uploading slider: " + err.message);
  }
}