async function uploadSlider(fileInput, title, description) {
  const file = fileInput.files[0];
  if (!file) return alert("Select a file");

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const base64 = reader.result;
    const res = await fetch("/.netlify/functions/uploadSlider", {
      method: "POST",
      body: JSON.stringify({ base64, title, description }),
    });

    const data = await res.json();
    alert(data.message);
    console.log("Uploaded Slider URL:", data.url);
  };
}