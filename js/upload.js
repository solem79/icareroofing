alert("upload.js loaded");

// Wait for page to fully load
document.addEventListener("DOMContentLoaded", () => {

  const supabaseUrl = "https://hcsnwwlukslzoytfnygo.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjc253d2x1a3Nsem95dGZueWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMjUxMjEsImV4cCI6MjA4NjkwMTEyMX0.0mhlz6voMx0-xSL6PfhBlUI1fNIC_dbE_GYWSzz7la0";
  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  async function uploadToSupabase(fileInputId, type) {
  const fileInput = document.getElementById(fileInputId);

  if (!fileInput.files.length) {
    alert("Select a file first");
    return;
  }

  const file = fileInput.files[0];
  const fileName = Date.now() + "-" + file.name;

  const { data, error } = await supabaseClient.storage
    .from("uploads")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) {
    console.error("Upload error:", error);
    alert("Upload failed: " + error.message);
    return null;
  }

  const publicUrl =
    supabaseUrl + "/storage/v1/object/public/uploads/" + fileName;

  alert("Upload successful!");
  console.log(publicUrl);

  return publicUrl;
}
  
  // SLIDER BUTTON
  const sliderBtn = document.getElementById("sliderUploadBtn");
  if (sliderBtn) {
    sliderBtn.addEventListener("click", async () => {
      await uploadToSupabase("sliderInput", "Slider");
    });
  }

  // GALLERY BUTTON
  const galleryBtn = document.getElementById("galleryUploadBtn");
  if (galleryBtn) {
    galleryBtn.addEventListener("click", async () => {
      await uploadToSupabase("galleryInput", "Gallery");
    });
  }

});