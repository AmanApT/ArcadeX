import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#121212] text-white">
      <div className="relative w-16 h-16">
        <div className="w-full h-full border-4 border-gray-600 rounded-full opacity-20"></div>
        <motion.div
          className="absolute top-0 left-0 w-full h-full border-4 border-customRed rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>

      <motion.p
        className="mt-4 text-lg text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default LoadingScreen;
