export const uploadToCloudinary = async (file) => {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "stuart_upload"); // preset name
  data.append("cloud_name", "dfy8zww89"); // replace

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dfy8zww89/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const result = await res.json();

  return result.secure_url;
};