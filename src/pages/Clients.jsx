import React from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../data/client';

const Clients = () => {

    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    const filtered = client.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className='p-6'>
            <input
                type="text"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded mb-4"
            />

            {filtered.map((item) => (
                <div key={item.id} className="border-b py-2">
                    <h3 className="font-bold">{item.name}</h3>
                    <button
                        onClick={() => navigate(`/clients/${item.id}`)}
                        className="text-blue-500 hover:underline"
                    >
                        View Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Clients;