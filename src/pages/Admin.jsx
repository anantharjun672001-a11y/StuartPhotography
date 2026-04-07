import { useState, useEffect } from "react";
import { uploadToCloudinary } from "../utils/cloudinary";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Admin = () => {
  const isAuth = localStorage.getItem("isAdmin");

  if (!isAuth) {
    return <Navigate to="/admin-login" />;
  }

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [images, setImages] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const editId = params.get("edit");

  useEffect(() => {
    if (editId) {
      axios.get(`${API}/api/clients/${editId}`)
        .then(res => {
          setName(res.data.name);
          setPassword(res.data.password);
        });
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

    try {
      await axios.post(`${API}/api/clients`, {
        name,
        password,
        coverImage: uploadedUrls[0],
        images: uploadedUrls,
      });

      alert(editId ? "Updated " : "Saved ");

      setName("");
      setPassword("");
      setImages([]);

    } catch (err) {
      console.log(err);
      alert("Upload failed ");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0B0F19] to-black text-white flex items-center justify-center px-4">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl shadow-2xl hover:shadow-[#D4AF37]/20 transition">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-playfair">
            {editId ? "Edit Client" : "Upload Client"}
          </h2>

          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              navigate("/admin-login");
            }}
            className="bg-red-500/80 px-4 py-1 rounded-full text-sm hover:bg-red-600 hover:scale-105 transition shadow-md"
          >
            Logout
          </button>
        </div>

        <div className="space-y-5">

          {/* NAME */}
          <input
            type="text"
            placeholder="Client Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg focus:outline-none focus:border-[#D4AF37] placeholder-gray-400"
          />

          {/* PASSWORD */}
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-gray-600 rounded-lg focus:outline-none focus:border-[#D4AF37] placeholder-gray-400"
          />

          {/* FILE INPUT */}
          <div className="bg-black/40 border border-gray-600 rounded-lg p-4 text-center hover:border-[#D4AF37] transition">
            <input
              type="file"
              multiple
              onChange={(e) => setImages([...e.target.files])}
              className="hidden"
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="cursor-pointer">
              📁 Select Images
            </label>

            {images.length > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                {images.length} file(s) selected
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpload}
            className="w-full bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-black py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg hover:shadow-[#D4AF37]/40 transition"
          >
            {editId ? "Update Client" : "Upload Client"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Admin;