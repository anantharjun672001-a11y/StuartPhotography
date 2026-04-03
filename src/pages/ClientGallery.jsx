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
      const response = await fetch(currentClient.images[i]);
      const blob = await response.blob();
      zip.file(`image-${i + 1}.jpg`, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${currentClient.name}.zip`);
  };

  if (!currentClient) return <p>Client Not Found</p>;

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

      <button
        onClick={downloadAll}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download All
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentClient.images.map((img, i) => (
          <div key={i} className="relative group">

            <img
              src={img}
              className="w-full h-60 object-cover rounded"
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
              className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-sm opacity-0 group-hover:opacity-100"
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