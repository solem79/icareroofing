// SLIDER UPLOAD
document.getElementById("sliderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.getElementById("sliderImage").files[0];
  const title = document.getElementById("sliderTitle").value;
  const description = document.getElementById("sliderDesc").value;

  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);
  formData.append("description", description);

  try {
    const res = await fetch("/.netlify/functions/uploadSlider", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    alert("Slider uploaded!");
    console.log(data);

  } catch (err) {
    alert("Upload failed");
    console.error(err);
  }
});


// GALLERY UPLOAD
document.getElementById("galleryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = document.getElementById("galleryImage").files[0];
  const title = document.getElementById("galleryTitle").value;

  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", title);

  try {
    const res = await fetch("/.netlify/functions/uploadGallery", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    alert("Gallery uploaded!");
    console.log(data);

  } catch (err) {
    alert("Upload failed");
    console.error(err);
  }
});