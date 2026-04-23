import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import WishlistButton from "./WishlistButton";

/**
 * AnimatedCounter
 * Counts from 0 to `to` once it scrolls into view.
 * Supports a string suffix/prefix via `format`.
 */
const AnimatedCounter = ({
  to,
  duration = 1.6,
  format = (n: number) => n.toString(),
}: {
  to: number;
  duration?: number;
  format?: (n: number) => string;
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(format(0));
  const started = useRef(false);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            controlsRef.current = animate(0, to, {
              duration,
              ease: [0.16, 1, 0.3, 1],
              onUpdate: (v) => setDisplay(format(Math.round(v))),
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      controlsRef.current?.stop();
    };
  }, [to, duration, format]);

  return <span ref={ref}>{display}</span>;
};

const ROTATING_WORDS = [
  "reimagined",
  "instant",
  "personal",
  "always-on",
  "human-first",
];

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const yReverse = useTransform(scrollY, [0, 500], [0, -60]);

  // Rotating word
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  // 3D tilt for the doctor card
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 14, mass: 0.4 });
  const sy = useSpring(ry, { stiffness: 120, damping: 14, mass: 0.4 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}% ${y}%, rgba(255,255,255,0.55), transparent 45%)`
  );

  const onTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const max = 9; // max tilt degrees
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const onTiltLeave = () => {
    rx.set(0);
    ry.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  const stats = [
    { to: 24, suffix: "/7", label: "Care Access" },
    { to: 100, suffix: "%", label: "Verified Pros" },
    { to: 10, prefix: "<", suffix: "m", label: "Response Time" },
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

          {/* Heading with rotating word */}
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.05] tracking-tight">
            Healthcare,
            <br className="hidden sm:block" />
            <span className="gradient-text inline-block align-baseline">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={ROTATING_WORDS[wordIdx]}
                  initial={{ y: "0.6em", opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-0.6em", opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {ROTATING_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>{" "}
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

          {/* Stats row with animated counters */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="text-center md:text-left"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-700 tabular-nums">
                  {s.prefix ?? ""}
                  <AnimatedCounter to={s.to} />
                  {s.suffix ?? ""}
                </div>
                <div className="mt-1 text-xs md:text-sm text-gray-600 font-medium">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGE with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end"
        >
          <div
            className="relative"
            style={{ perspective: 1100 }}
          >
            {/* Soft glow ring behind image */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-emerald-300/50 via-teal-300/40 to-green-200/40 blur-2xl"
            />

            {/* Tiltable image frame */}
            <motion.div
              ref={tiltRef}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
              style={{
                y,
                rotateX: sx,
                rotateY: sy,
                transformStyle: "preserve-3d",
              }}
              className="relative glass-card p-3 rounded-3xl tilt-card"
            >
              <img
                src="/doctor.png"
                alt="Doctor"
                className="rounded-2xl w-full max-w-md md:max-w-lg block"
                style={{ transform: "translateZ(40px)" }}
              />

              {/* Animated glare layer */}
              <motion.span
                className="tilt-glare"
                style={{ background: glareBg }}
                aria-hidden
              />

              {/* Floating mini-cards (lifted in 3D) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ transform: "translateZ(80px)" }}
                className="hidden sm:flex absolute -left-6 top-8 glass-card px-4 py-3 items-center gap-3 float-y"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
                  ❤️
                </div>
                <div>
                  <div className="text-xs text-gray-500">Heart rate</div>
                  <div className="text-sm font-semibold text-gray-800">
                    72 bpm · Normal
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ transform: "translateZ(80px)", animationDelay: "-3s" }}
                className="hidden sm:flex absolute -right-6 bottom-10 glass-card px-4 py-3 items-center gap-3 float-y"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-lg">
                  ✅
                </div>
                <div>
                  <div className="text-xs text-gray-500">Verified</div>
                  <div className="text-sm font-semibold text-gray-800">
                    Dr. available now
                  </div>
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
