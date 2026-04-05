import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-black via-gray-900 to-black text-white">

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-bold"
      >
        Stuart Photography 📸
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-gray-300"
      >
        Capturing your best moments
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-6 px-6 py-3 bg-white text-black rounded-full"
      >
        Explore Gallery
      </motion.button>

    </div>
  );
};

export default About;