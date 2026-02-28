// js/upload.js

alert("upload.js loaded");

// Supabase client
const supabaseUrl = "https://hcsnwwlukslzoytfnygo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjc253d2x1a3Nsem95dGZueWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMjUxMjEsImV4cCI6MjA4NjkwMTEyMX0.0mhlz6voMx0-xSL6PfhBlUI1fNIC_dbE_GYWSzz7la0";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Upload function (used for both slider and gallery)
async function uploadToSupabase(fileInputId, type) {
  const fileInput = document.getElementById(fileInputId);
  if (!fileInput.files.length) {
    alert("Select a file first");
    return null;
  }

  const file = fileInput.files[0];
  const fileName = Date.now() + "-" + file.name;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    alert(`${type} upload failed!`);
    return null;
  }

  const imageUrl = supabaseUrl + "/storage/v1/object/public/uploads/" + fileName;
  console.log(`${type} URL:`, imageUrl);
  alert(`${type} uploaded successfully!`);
  return imageUrl;
}

// Slider upload button
const sliderBtn = document.getElementById("sliderUploadBtn");
sliderBtn.addEventListener("click", async () => {
  const imageUrl = await uploadToSupabase("sliderInput", "Slider");
  if (!imageUrl) return;

  const title = document.getElementById("sliderTitle").value;
  const desc = document.getElementById("sliderDesc").value;
  console.log("Slider data:", { title, desc, imageUrl });

  // TODO: Save slider info to your DB or JSON if needed
});

// Gallery upload button
const galleryBtn = document.getElementById("galleryUploadBtn");
galleryBtn.addEventListener("click", async () => {
  const imageUrl = await uploadToSupabase("galleryInput", "Gallery");
  if (!imageUrl) return;

  const title = document.getElementById("galleryTitle").value;
  console.log("Gallery data:", { title, imageUrl });

  // TODO: Save gallery info to your DB or JSON if needed
});