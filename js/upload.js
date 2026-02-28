alert("upload.js loaded");

// Wait for page to fully load
document.addEventListener("DOMContentLoaded", () => {

  const supabaseUrl = "https://hcsnwwlukslzoytfnygo.supabase.co";
  const supabaseKey = "YOUR_ANON_KEY_HERE"; // keep your key
  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  async function uploadToSupabase(fileInputId, type) {
    const fileInput = document.getElementById(fileInputId);

    if (!fileInput || !fileInput.files.length) {
      alert("Select a file first");
      return;
    }

    const file = fileInput.files[0];
    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabaseClient.storage
      .from("uploads")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      alert(type + " upload failed");
      return;
    }

    const imageUrl =
      supabaseUrl + "/storage/v1/object/public/uploads/" + fileName;

    alert(type + " uploaded successfully!");
    console.log(imageUrl);

    return imageUrl;
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