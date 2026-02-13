  const uploadBtn = document.getElementById("uploadBtn");
  const input = document.getElementById("imageInput");
  const uploadTypeSelect = document.getElementById("uploadType");
  const previewContainer = document.getElementById("previewContainer");

  // Convert file to Base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // Show preview
  input.addEventListener("change", () => {
    previewContainer.innerHTML = ""; // Clear previous previews
    const files = Array.from(input.files);
    files.forEach(file => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style.width = "100px";
      img.style.height = "100px";
      img.style.objectFit = "cover";
      img.style.border = "1px solid #ccc";
      previewContainer.appendChild(img);
    });
  });

  uploadBtn.addEventListener("click", async () => {
    const files = Array.from(input.files);
    if (!files.length) return alert("Select images first!");

    const type = uploadTypeSelect.value; // slider or gallery
    let payload;

    if (type === "slider") {
      payload = { image: await fileToBase64(files[0]) };
    } else {
      const images = await Promise.all(files.map(fileToBase64));
      payload = { images };
    }

    const endpoint = `https://inspiring-alpaca-756667.netlify.app/.netlify/functions/${
      type === "slider" ? "uploadSlider" : "uploadGallery"
    }`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(`${type} upload result:`, data);
      alert(`${type} upload result:\n` + JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed! Check console for details.");
    }
  });