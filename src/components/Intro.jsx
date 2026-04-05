import { motion } from "framer-motion";

const Intro = () => {
  return (
    <div className="bg-[#0B0F19] text-white py-20 px-6 text-center">

      {/* SMALL TITLE */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[#D4AF37] uppercase tracking-widest text-sm font-poppins"
      >
        Welcome to
      </motion.p>

      {/* MAIN HEADING */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-playfair font-bold mt-3"
      >
        Stuart Photography
      </motion.h2>

      {/* DESCRIPTION */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 max-w-2xl mx-auto text-gray-300 font-poppins"
      >
        We capture timeless moments with creativity and passion. From weddings to events, 
        every frame tells a story that lasts forever.
      </motion.p>

      {/* HIGHLIGHTS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10 flex flex-col md:flex-row justify-center gap-8"
      >
        <div>
          <h3 className="text-xl font-bold text-[#D4AF37]">Premium Quality</h3>
          <p className="text-gray-400 text-sm mt-1">High-end editing & visuals</p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#D4AF37]">Creative Shots</h3>
          <p className="text-gray-400 text-sm mt-1">Unique and cinematic angles</p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-[#D4AF37]">Fast Delivery</h3>
          <p className="text-gray-400 text-sm mt-1">Quick turnaround time</p>
        </div>
      </motion.div>

    </div>
  );
};

export default Intro;