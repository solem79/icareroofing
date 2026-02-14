const uploadFile = async (file, functionUrl) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const base64Image = reader.result;
    const res = await fetch(functionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success) alert("Upload successful! URL: " + data.url);
    else alert("Upload failed: " + data.error);
  };
};

// Example usage:
const sliderInput = document.querySelector("#sliderInput");
sliderInput.addEventListener("change", () => {
  const file = sliderInput.files[0];
  uploadFile(file, "https://inspiring-alpaca-756667.netlify.app/.netlify/functions/uploadSlider");
});

const galleryInput = document.querySelector("#galleryInput");
galleryInput.addEventListener("change", () => {
  const file = galleryInput.files[0];
  uploadFile(file, "https://inspiring-alpaca-756667.netlify.app/.netlify/functions/uploadGallery");
});