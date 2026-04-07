import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Layout from "../components/Layout";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const ClientGallery = () => {
  const { id } = useParams();

  const [currentClient, setCurrentClient] = useState(null);
  const [entered, setEntered] = useState("");
  const [access, setAccess] = useState(false);

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    axios.get(`${API}/api/clients/${id}`)
      .then(res => setCurrentClient(res.data));
  }, [id]);

  if (!currentClient) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  // ZIP DOWNLOAD
  const downloadAll = async () => {
    const zip = new JSZip();

    for (let i = 0; i < currentClient.images.length; i++) {
      const response = await fetch(currentClient.images[i]);
      const blob = await response.blob();
      zip.file(`image-${i + 1}.jpg`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${currentClient.name}.zip`);
  };

  // SINGLE DOWNLOAD
  const downloadSingle = async (url, index) => {
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, `image-${index + 1}.jpg`);
  };

  // DELETE
  const handleDelete = async (index) => {
    const updatedImages = currentClient.images.filter((_, i) => i !== index);

    await axios.put(`${API}/api/clients/${id}`, {
      ...currentClient,
      images: updatedImages,
      coverImage: updatedImages[0] || "",
    });

    setCurrentClient({
      ...currentClient,
      images: updatedImages,
    });
  };

  //  PASSWORD UI 
  if (!access) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0B0F19] text-white px-4">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-2xl shadow-2xl text-center w-full max-w-sm">

          <h2 className="text-2xl font-playfair mb-4">
            Secure Access
          </h2>

          <p className="text-gray-400 text-sm mb-6">
            Enter password to view gallery
          </p>

          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setEntered(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-[#D4AF37]"
          />

          <button
            onClick={() => {
              if (entered === currentClient.password) setAccess(true);
              else alert("Wrong password");
            }}
            className="w-full bg-[#D4AF37] text-black py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            Unlock Gallery
          </button>

        </div>

      </div>
    );
  }

  return (
    <Layout>
      <div className="bg-[#0B0F19] text-white min-h-screen py-20 px-6">

        <h1 className="text-4xl md:text-5xl text-center mb-10 font-playfair">
          {currentClient.name}
        </h1>

        <div className="text-center mb-10">
          <button
            onClick={downloadAll}
            className="bg-green-600 px-6 py-2 rounded-lg hover:scale-105 transition"
          >
            Download All
          </button>
        </div>

        {/* IMAGE GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {currentClient.images.map((img, i) => (
            <div key={i} className="group relative rounded-xl overflow-hidden bg-black flex items-center justify-center p-2">

              {/* IMAGE FULL VIEW */}
              <img
                src={img}
                className="w-full max-h-72 object-contain group-hover:scale-105 transition"
              />

              {/* HOVER */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-4 transition">

                <button
                  onClick={() => downloadSingle(img, i)}
                  className="bg-white text-black px-4 py-2 rounded hover:scale-105"
                >
                  Download
                </button>

                {isAdmin && (
                  <button
                    onClick={() => handleDelete(i)}
                    className="bg-red-500 px-4 py-2 rounded hover:scale-105"
                  >
                    Delete
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>
    </Layout>
  );
};

export default ClientGallery;