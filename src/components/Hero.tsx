import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import WishlistButton from "./WishlistButton";
import HeroAnimation from "./HeroAnimation";

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
            <span className="block mt-2 text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              Anywhere. Anytime. <span className="gradient-text">Instantly.</span>
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Curex24 brings <span className="font-semibold text-emerald-700">trusted doctors, nurses, therapists and caregivers</span> straight
            to your home, clinic, or phone — matched in seconds, verified for life.
            Care that actually meets you where you are.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
            <WishlistButton />
            <a href="#partner" className="btn-secondary" data-cursor>
              Become a Partner
              <span aria-hidden>→</span>
            </a>
            <a href="#services" className="btn-ghost" data-cursor>
              Explore Services
            </a>
          </div>

          {/* Live trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 justify-center md:justify-start text-xs sm:text-sm text-emerald-800/80"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="pulse-dot" aria-hidden></span>
              Verified providers
            </span>
            <span className="opacity-40">•</span>
            <span>🏠 Home · 🏥 Clinic · 🎥 Video</span>
            <span className="opacity-40 hidden sm:inline">•</span>
            <span className="hidden sm:inline">⚡ Matched in seconds</span>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-8 grid grid-cols-2 gap-3 max-w-md mx-auto md:mx-0"
          >
            {[
              { v: "24/7", l: "Care access" },
              { v: "100%", l: "Verified" },
            ].map((s) => (
              <div
                key={s.l}
                className="glass-card px-3 py-3 text-center"
              >
                <div className="text-lg sm:text-xl font-extrabold gradient-text leading-none">
                  {s.v}
                </div>
                <div className="mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Hero animation */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end"
        >
          <motion.div style={{ y }} className="w-full">
            <HeroAnimation />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
