import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ClientsList = () => {
  const [search, setSearch] = useState("");
  const [clientsData, setClientsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("clients")) || [];
    setClientsData(data);
  }, []);

  const filtered = clientsData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    const existing = JSON.parse(localStorage.getItem("clients")) || [];

    const updated = existing.filter((c) => c.id !== id);

    localStorage.setItem("clients", JSON.stringify(updated));

    setClientsData(updated);
  };
  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search clients..."
        className="border p-2 w-full mb-6"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/clients/${item.id}`)}
            className="cursor-pointer group bg-white/10 backdrop-blur-lg p-2 rounded-xl shadow-lg hover:scale-105 transition duration-300"
          >
            <div className="relative">
              <img
                src={item.coverImage}
                className="w-full h-40 object-cover rounded"
              />

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <p className="text-white font-bold">View</p>
              </div>
            </div>

            <h3 className="mt-2 text-center font-semibold">{item.name}</h3>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin?edit=${item.id}`);
              }}
              className="mt-2 bg-blue-500 text-white px-2 py-1 text-sm rounded ml-2"
            >
              Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation(); // click open aagatha prevent
                handleDelete(item.id);
              }}
              className="mt-2 bg-red-500 text-white px-2 py-1 text-sm rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsList;
