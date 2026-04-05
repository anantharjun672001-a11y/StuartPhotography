import { motion } from "framer-motion";

const images = [
  "/images/b1.jpeg",
  "/images/b2.jpeg",
  "/images/d1.jpeg",
  "/images/d2.jpeg",
  "/images/e1.jpeg",
  "/images/e2.jpeg",
];

const ClientSlider = () => {
  return (
    <div className="bg-[#0B0F19] py-20 overflow-hidden">

      {/* TITLE */}
      <h2 className="text-center text-white text-3xl md:text-5xl font-playfair mb-10">
        Freezing Frames
      </h2>

      {/* SLIDER */}
      <div className="relative w-full overflow-hidden">

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[...images, ...images].map((img, index) => (
            <div
              key={index}
              className="min-w-[250px] h-[300px] rounded-xl overflow-hidden"
            >
              <img
                src={img}
                alt="client"
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
              />
            </div>
          ))}
        </motion.div>

      </div>

    </div>
  );
};

export default ClientSlider;