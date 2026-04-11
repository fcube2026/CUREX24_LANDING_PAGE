import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/app-preview.png",
  "/doctor.png",
  "/logo.png"
];

const AppPreviewCarousel = () => {

  const [index, setIndex] = useState(0);

  /* Auto Slide */

  useEffect(() => {

    const interval = setInterval(() => {

      setIndex((prev) =>
        (prev + 1) % images.length
      );

    }, 2500);

    return () => clearInterval(interval);

  }, []);

  return (

    <section className="py-24">

      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">

        {/* Heading */}

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800"

          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
        >
          Experience Curex24 in Action
        </motion.h2>

        {/* Phone Frame */}

        <div className="flex justify-center mt-16">

          <div className="relative w-[260px] h-[520px] rounded-[40px] border-[10px] border-gray-800 shadow-2xl overflow-hidden bg-black">

            <motion.img
              key={index}

              src={images[index]}

              alt="App Preview"

              className="w-full h-full object-cover"

              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}

              transition={{ duration: 0.5 }}
            />

          </div>

        </div>

      </div>

    </section>

  );

};

export default AppPreviewCarousel;