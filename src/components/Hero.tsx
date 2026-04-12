import { motion, useScroll, useTransform } from "framer-motion";
import WishlistButton from "./WishlistButton";

const Hero = () => {

  const { scrollY } = useScroll();

  const y = useTransform(
    scrollY,
    [0, 500],
    [0, 120]
  );

  return (

    <section className="relative py-16 md:py-24 overflow-hidden">

      {/* 🔥 Coming Soon Tag */}


      {/* Floating Background Blobs */}

      <div className="blob w-72 h-72 md:w-96 md:h-96 bg-green-300 top-0 left-0"></div>
      <div className="blob w-72 h-72 md:w-96 md:h-96 bg-teal-300 bottom-0 right-0"></div>

      {/* Main Container */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">

        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >

          {/* 🔥 Updated Heading */}

          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">

            Curex24 is
            <span className="text-green-500"> Coming Soon !!!</span>

          </h1>

          {/* 🔥 Updated Description */}

          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-lg mx-auto md:mx-0">

            We’re building a smarter way to connect patients with nearby
            doctors, therapists, and caregivers — instantly and reliably.

          </p>

          {/* 🔥 CTA */}

          <div className="mt-8 flex justify-center md:justify-start">

            <WishlistButton />

          </div>

        </motion.div>

        {/* RIGHT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end"
        >

          <motion.img
            src="/doctor.png"
            alt="Doctor"
            style={{ y }}
            className="rounded-2xl shadow-xl w-full max-w-md md:max-w-lg"
          />

        </motion.div>

      </div>

    </section>

  );

};

export default Hero;