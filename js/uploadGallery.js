async function uploadGallery(imageId, titleId, descId) {
  const fileInput = document.getElementById(imageId);
  const title = document.getElementById(titleId).value;
  const description = document.getElementById(descId).value;

  if (!fileInput.files.length) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("image", fileInput.files[0]); // must match function
  formData.append("title", title);
  formData.append("description", description);

  try {
    const res = await fetch("/.netlify/functions/uploadGallery", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Upload failed");

    alert("Gallery upload successful!");
    console.log(data);
  } catch (err) {
    alert("Something went wrong. Check console for details.");
    console.error(err);
  }
}
