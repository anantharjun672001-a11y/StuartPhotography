import { useState, useEffect } from "react";
import { uploadToCloudinary } from "../utils/cloudinary";
import { useLocation, useNavigate } from "react-router-dom";

const Admin = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [images, setImages] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const editId = params.get("edit");

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) navigate("/admin-login");
  }, []);

  useEffect(() => {
    if (editId) {
      const stored = JSON.parse(localStorage.getItem("clients")) || [];
      const found = stored.find((c) => c.id === editId);

      if (found) {
        setName(found.name);
        setPassword(found.password);
      }
    }
  }, [editId]);

  const handleUpload = async () => {
    if (!name || !password) {
      alert("Fill all fields");
      return;
    }

    let uploadedUrls = [];

    for (let img of images) {
      const url = await uploadToCloudinary(img);
      uploadedUrls.push(url);
    }

    const existing = JSON.parse(localStorage.getItem("clients")) || [];

    if (editId) {
      const updated = existing.map((c) =>
        c.id === editId
          ? {
              ...c,
              name,
              password,
              images:
                uploadedUrls.length > 0
                  ? [...c.images, ...uploadedUrls]
                  : c.images,
            }
          : c
      );

      localStorage.setItem("clients", JSON.stringify(updated));
      alert("Updated 🔥");
    } else {
      const newClient = {
        id: name.toLowerCase().replace(/\s/g, ""),
        name,
        password,
        coverImage: uploadedUrls[0],
        images: uploadedUrls,
      };

      existing.push(newClient);
      localStorage.setItem("clients", JSON.stringify(existing));

      alert("Saved 🔥");
    }

    setName("");
    setPassword("");
    setImages([]);
  };

  return (
    <div className="p-6 max-w-md mx-auto">

      <button
        onClick={() => {
          localStorage.removeItem("adminAuth");
          navigate("/admin-login");
        }}
        className="mb-4 bg-red-500 text-white px-4 py-2 w-full"
      >
        Logout
      </button>

      <h2 className="text-xl font-bold mb-4">Admin Upload</h2>

      <input
        placeholder="Client Name"
        className="border p-2 mb-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Password"
        className="border p-2 mb-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="file"
        multiple
        className="mb-4"
        onChange={(e) => setImages([...e.target.files])}
      />

      <button
        onClick={handleUpload}
        className="bg-black text-white px-4 py-2 w-full"
      >
        {editId ? "Update Client" : "Upload Client"}
      </button>
    </div>
  );
};

export default Admin;