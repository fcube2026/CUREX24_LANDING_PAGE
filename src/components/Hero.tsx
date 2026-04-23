import { motion, useScroll, useTransform } from "framer-motion";
import WishlistButton from "./WishlistButton";

const Hero = () => {

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const yReverse = useTransform(scrollY, [0, 500], [0, -60]);

  const stats = [
    { value: "24/7",  label: "Care Access" },
    { value: "100%",  label: "Verified Pros" },
    { value: "<10m",  label: "Response Time" },
  ];

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
            Healthcare,
            <br className="hidden sm:block" />
            <span className="gradient-text">reimagined for you.</span>
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
            <a href="#about" className="btn-secondary">
              Learn more
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-700">
                  {s.value}
                </div>
                <div className="mt-1 text-xs md:text-sm text-gray-600 font-medium">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">

            {/* Soft glow ring behind image */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-emerald-300/50 via-teal-300/40 to-green-200/40 blur-2xl"
            />

            {/* Image frame */}
            <motion.div
              style={{ y }}
              className="relative glass-card p-3 rounded-3xl"
            >
              <img
                src="/doctor.png"
                alt="Doctor"
                className="rounded-2xl w-full max-w-md md:max-w-lg block"
              />

              {/* Floating mini-cards */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="hidden sm:flex absolute -left-6 top-8 glass-card px-4 py-3 items-center gap-3 float-y"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
                  ❤️
                </div>
                <div>
                  <div className="text-xs text-gray-500">Heart rate</div>
                  <div className="text-sm font-semibold text-gray-800">72 bpm · Normal</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="hidden sm:flex absolute -right-6 bottom-10 glass-card px-4 py-3 items-center gap-3 float-y"
                style={{ animationDelay: "-3s" }}
              >
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-lg">
                  ✅
                </div>
                <div>
                  <div className="text-xs text-gray-500">Verified</div>
                  <div className="text-sm font-semibold text-gray-800">Dr. available now</div>
                </div>
              </motion.div>

            </motion.div>

          </div>
        </motion.div>

      </div>

    </section>

  );

};

export default Hero;
