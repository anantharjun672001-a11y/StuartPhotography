import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const ClientsList = () => {
  const [search, setSearch] = useState("");
  const [clientsData, setClientsData] = useState([]);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    axios.get(`${API}/api/clients`).then((res) => setClientsData(res.data));
  }, []);

  const filtered = clientsData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    await axios.delete(`${API}/api/clients/${id}`);
    setClientsData((prev) => prev.filter((c) => c._id !== id));
  };

  return (
    <Layout>
      <div className="bg-[#0B0F19] text-white min-h-screen py-20 px-6">
        <h1 className="text-4xl md:text-5xl text-center mb-10 font-playfair">
          Client Galleries
        </h1>

        {/* SEARCH */}
        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search clients..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none"
          />
        </div>

        {/* GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/clients/${item._id}`)}
              className="group cursor-pointer rounded-xl overflow-hidden bg-white/5 backdrop-blur-lg hover:scale-105 transition"
            >
              {/* IMAGE */}
              <div className="bg-black flex items-center justify-center p-2">
                <img
                  src={item.coverImage}
                  className="w-full max-h-52 object-contain"
                />
              </div>

              {/* NAME */}
              <h3 className="text-center py-3 font-semibold">{item.name}</h3>

              {/* ADMIN BUTTONS */}
              {isAdmin && (
                <div className="flex justify-center gap-3 pb-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin?edit=${item._id}`);
                    }}
                    className="px-3 py-1 bg-blue-500 rounded hover:scale-110 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                    className="px-3 py-1 bg-red-500 rounded hover:scale-110 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ClientsList;
