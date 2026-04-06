import { useState, useRef } from "react";
import Layout from "../components/Layout";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import outputsData from "../data/outputs";

const Outputs = () => {
  const [active, setActive] = useState("Traditional");
  const [selectedImg, setSelectedImg] = useState(null);
  const scrollRef = useRef();

  const scroll = (dir) => {
    if (dir === "left") scrollRef.current.scrollLeft -= 300;
    else scrollRef.current.scrollLeft += 300;
  };

  return (
    <Layout>
      <div className="bg-[#0B0F19] text-white min-h-screen py-20 px-6">

        {/* TITLE */}
        <h1 className="text-4xl md:text-5xl font-playfair text-center mb-12">
          Our Works
        </h1>

        {/* FILTER */}
        <div className="flex justify-center gap-4 mb-14 flex-wrap">
          {Object.keys(outputsData).map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 
              ${
                active === cat
                  ? "bg-[#D4AF37] text-black shadow-lg scale-105"
                  : "border-gray-500 hover:bg-[#D4AF37] hover:text-black hover:scale-105"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SLIDER */}
        <div className="relative">

          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-3 rounded-full"
          >
            <FaArrowLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-3 rounded-full"
          >
            <FaArrowRight />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-10 no-scrollbar"
          >
            {outputsData[active].map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImg(img)}
                className={`min-w-[260px] h-[320px] rounded-xl overflow-hidden relative cursor-pointer transition duration-300 group
                ${i === 1 ? "scale-110 z-10" : "opacity-80"}`}
              >
                <img
                  src={img}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* HOVER EFFECT 🔥 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition">
                    View
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* MODAL 🔥 */}
        {selectedImg && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelectedImg(null)}
          >
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-6 right-6 text-white text-2xl"
              onClick={() => setSelectedImg(null)}
            >
              <FaTimes />
            </button>

            {/* IMAGE */}
            <img
              src={selectedImg}
              className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
            />
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Outputs;