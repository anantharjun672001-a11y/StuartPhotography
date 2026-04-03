import React, { useState } from "react";
import { client } from "../data/client";
import { useParams } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const ClientGallery = () => {
  const { id } = useParams();
  const currentClient = client.find((c) => c.id === id);

  const [entered, setEntered] = useState("");
  const [access, setAccess] = useState(false);

  
  const downloadAll = async () => {
    const zip = new JSZip();

    for (let i = 0; i < currentClient.images.length; i++) {
      const imgUrl = currentClient.images[i];
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      zip.file(`image-${i + 1}.jpg`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${currentClient.name}.zip`);
  };

  if (!currentClient) return <p>Client Not Found</p>;

  // 🔐 Password Screen
  if (!access) {
    return (
      <div className="p-6">
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setEntered(e.target.value)}
          className="border p-2 rounded mb-4"
        />
        <button
          onClick={() => {
            if (entered === currentClient.password) setAccess(true);
            else alert("Incorrect password");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    );
  }

 
  return (
    <div className="p-6">
      
      
      <button
        onClick={downloadAll}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download All
      </button>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentClient.images.map((img, index) => (
          <div key={index} className="relative group">

            <img
              src={img}
              alt={`Client ${index}`}
              className="w-full h-60 object-cover rounded"
            />

            
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white text-xl opacity-20 rotate-[-20deg]">
                Stuart Photography
              </p>
            </div>

            
            <a
              href={img}
              download
              className="absolute bottom-2 right-2 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              Download
            </a>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientGallery;