<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
const supabaseUrl = "https://hcsnwwlukslzoytfnygo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhjc253d2x1a3Nsem95dGZueWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMjUxMjEsImV4cCI6MjA4NjkwMTEyMX0.0mhlz6voMx0-xSL6PfhBlUI1fNIC_dbE_GYWSzz7la0";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Generic function to upload any file to Supabase bucket
async function uploadToSupabase(fileInputId, type) {
  const fileInput = document.getElementById(fileInputId);
  if (!fileInput.files.length) {
    alert("Select a file first");
    return;
  }

  const file = fileInput.files[0];
  const fileName = Date.now() + "-" + file.name;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    alert(`${type} upload failed!`);
    return;
  }

  const imageUrl = supabaseUrl + "/storage/v1/object/public/uploads/" + fileName;
  console.log(`${type} URL:`, imageUrl);
  alert(`${type} uploaded successfully!`);
  return imageUrl;
}

// Slider upload
document.getElementById("sliderUploadBtn").addEventListener("click", async () => {
  const url = await uploadToSupabase("sliderInput", "Slider");
  // You can now save 'url', title, description in your database or JSON
});

// Gallery upload
document.getElementById("galleryUploadBtn").addEventListener("click", async () => {
  const url = await uploadToSupabase("galleryInput", "Gallery");
  // You can now save 'url', title in your database or JSON
});
</script>