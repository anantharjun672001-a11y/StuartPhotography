import { motion } from "framer-motion";

const Owner = () => {
  return (
    <div className="bg-[#0B0F19] text-white py-24 px-6">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/sanjay.jpeg"
            alt="Owner"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#D4AF37] uppercase tracking-widest text-sm font-poppins">
            Meet the Artist
          </p>

          <h2 className="text-3xl md:text-5xl font-playfair font-bold mt-3">
            Behind the Lens
          </h2>

          <p className="mt-6 text-gray-300 font-poppins leading-relaxed">
            The creative force behind Stuart Photography is a passionate visual storyteller 
            and skilled drone pilot, dedicated to capturing moments from unique perspectives. 
            With a strong eye for detail and cinematic composition, every frame is crafted 
            to reflect emotion, elegance, and authenticity.
          </p>

          <p className="mt-4 text-gray-400 font-poppins leading-relaxed">
            Known for a friendly and professional approach, he ensures every client feels 
            comfortable and confident throughout the shoot. From handling multiple projects 
            to delivering high-quality results on time, his commitment to excellence makes 
            every experience smooth and memorable.
          </p>

          {/* QUOTE */}
          <p className="mt-6 italic text-[#D4AF37]">
            "Every moment deserves to be captured beautifully."
          </p>

        </motion.div>

      </div>

    </div>
  );
};

export default Owner;