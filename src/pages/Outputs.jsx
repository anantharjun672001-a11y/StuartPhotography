import React from "react";
import { gallery } from "../data/gallery";

const Outputs = () => {
  return (
    <div className="p-6">
      {Object.keys(gallery).map((category) => (
        <div key={category}>
          <h2 className="text-xl font-bold mb-4 capitalize">{category}</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery[category].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${category} ${index}`}
                className="w-full h-60 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Outputs;
