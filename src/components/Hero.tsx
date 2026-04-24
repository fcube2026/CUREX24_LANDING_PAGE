import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import WishlistButton from "./WishlistButton";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const yReverse = useTransform(scrollY, [0, 500], [0, -60]);

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Floating Background Blobs */}
      <div className="blob w-72 h-72 md:w-[28rem] md:h-[28rem] bg-emerald-300 -top-20 -left-20"></div>
      <div className="blob w-72 h-72 md:w-[26rem] md:h-[26rem] bg-teal-300 bottom-0 -right-20"></div>
      <motion.div
        style={{ y: yReverse }}
        className="blob w-60 h-60 bg-green-200 top-1/2 left-1/3 hidden md:block"
        aria-hidden
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          {/* Coming Soon badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex"
          >
            <span className="badge-pill">
              <span className="pulse-dot" aria-hidden></span>
              Launching Soon · Join the Wishlist
            </span>
          </motion.div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.05] tracking-tight">
            Healthcare,{" "}
            <span className="gradient-text inline-block align-baseline">
              for you.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Curex24 connects you with trusted doctors, therapists and caregivers
            <span className="font-semibold text-emerald-700"> instantly</span> —
            at home or in the clinic, whenever you need care.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <WishlistButton />
            <a href="#about" className="btn-secondary" data-cursor>
              Learn more
              <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT — Doctors image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end"
        >
          <motion.div style={{ y }}>
            <img
              src="/doctor.png"
              alt="Trusted doctors and caregivers"
              className="w-full max-w-md rounded-3xl shadow-2xl object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
