import { useState } from "react";
import { useParams } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const ClientGallery = () => {
  const { id } = useParams();

  const storedClients = JSON.parse(localStorage.getItem("clients")) || [];
  const currentClient = storedClients.find((c) => c.id === id);

  const [entered, setEntered] = useState("");
  const [access, setAccess] = useState(false);

  // 🔥 Download All
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

  // 🔥 Delete Image
  const handleDeleteImage = (indexToDelete) => {
    const storedClients = JSON.parse(localStorage.getItem("clients")) || [];

    const updated = storedClients.map((c) => {
      if (c.id === id) {
        const newImages = c.images.filter((_, i) => i !== indexToDelete);

        return {
          ...c,
          images: newImages,
          coverImage: newImages[0] || "",
        };
      }
      return c;
    });

    localStorage.setItem("clients", JSON.stringify(updated));
    window.location.reload();
  };

  if (!currentClient) return <p>Client Not Found</p>;

  // 🔐 Password screen
  if (!access) {
    return (
      <div className="p-6">
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setEntered(e.target.value)}
          className="border p-2 mb-4"
        />
        <button
          onClick={() => {
            if (entered === currentClient.password) setAccess(true);
            else alert("Wrong password");
          }}
          className="bg-black text-white px-4 py-2"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* 🔥 Download All */}
      <button
        onClick={downloadAll}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download All
      </button>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentClient.images.map((img, i) => (
          <div key={i} className="relative group">
            {/* Image */}
            <img
              src={img}
              className="w-full h-60 object-cover rounded transform group-hover:scale-105 transition duration-300"
            />

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white opacity-20 rotate-[-20deg]">
                Stuart Photography
              </p>
            </div>

            {/* Download */}
            <a
              href={img}
              download
              className="absolute bottom-2 right-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 hover:scale-105 transition duration-300"
            >
              Download
            </a>

            {/* 🔥 Delete */}
            <button
              onClick={() => {
                if (confirm("Delete this image?")) {
                  handleDeleteImage(i);
                }
              }}
              className="danger bg-black text-white px-4 py-2 rounded hover:bg-gray-800 hover:scale-105 transition duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientGallery;
