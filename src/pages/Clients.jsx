import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../data/client";

const Clients = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = client.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* Search */}
      <input
        type="text"
        placeholder="Search clients..."
        className="border p-2 w-full mb-6"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/clients/${item.id}`)}
            className="cursor-pointer group"
          >
            <div className="relative">

              <img
                src={item.coverImage}
                className="w-full h-40 object-cover rounded"
              />

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <p className="text-white font-bold">
                  View
                </p>
              </div>

            </div>

            <h3 className="mt-2 text-center font-semibold">
              {item.name}
            </h3>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Clients;