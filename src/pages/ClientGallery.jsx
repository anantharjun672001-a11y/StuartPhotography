import React, { useState } from 'react';
import { client } from '../data/client';

const ClientGallery = () => {

    const {id} = useParams();
    const clients = client.find(c=> c.id === id);

    const[entered,setEntered] = useState( );
    const [acess,setAccess] = useState(false);

    if(!clients)return <p>Client Not Found</p>

    if(!acess){

    return (
        <div className='p-6'>
            <input 
                type="password"
                placeholder="Enter password"
                onChange={(e)=> setEntered(e.target.value)}
                className="border p-2 rounded mb-4"
            />
            <button
                onClick={()=>{
                    if(entered === clients.password)setAccess(true);
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
        <div className='p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {clients.images.map((img, index) => (
                <img key={index} src={img} alt={`Client ${index}`} className="w-full h-auto rounded" />
            ))}
        </div>
    );
};

export default ClientGallery;