import React, { useState } from "react";
import { client } from "../data/client";
import { useParams } from "react-router-dom";

const ClientGallery = () => {
  const { id } = useParams();
  const currentClient = client.find((c) => c.id === id);

  const [entered, setEntered] = useState();
  const [access, setAccess] = useState(false);

  if (!currentClient) return <p>Client Not Found</p>;

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
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentClient.images.map((img, index) => (
        <div key={index} className="relative group">
          <img
            src={img}
            alt={`Client ${index}`}
            className="w-full h-60 object-cover rounded"
          />

          
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
  );
};

export default ClientGallery;
