import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

/* ── ECG path helper ─────────────────────────────────────── */
const ECG_PATH =
  "M0,24 L10,24 L14,10 L18,38 L22,4 L26,44 L30,24 L40,24 L44,24 L48,14 L52,34 L56,24 L80,24";

/* ── Tiny animated counter ───────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useAnimationFrame(() => {
    if (!ref.current) return;
    if (!started.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) started.current = true;
    }
    if (started.current) {
      setVal((prev) => {
        if (prev >= to) return to;
        return Math.min(prev + Math.ceil((to - prev) / 18), to);
      });
    }
  });

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ── Main component ──────────────────────────────────────── */
const HeroAnimation = () => {
  return (
    <div className="relative w-full max-w-md mx-auto select-none" aria-hidden>
      {/* Ambient glow */}
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-emerald-300/40 via-teal-300/30 to-green-200/30 blur-3xl pointer-events-none" />

      {/* ── Dashboard card ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 px-5 py-3 bg-white/40 border-b border-white/30">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 text-xs font-semibold text-emerald-700 tracking-wide">
            curex24.com
          </span>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50/80 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <span className="pulse-dot w-1.5 h-1.5" />
            Live
          </span>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Welcome row */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Good morning,</p>
              <p className="text-sm font-bold text-gray-800">Your Health Hub 👋</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-base shadow-lg">
              ✦
            </div>
          </div>

          {/* ECG strip */}
          <motion.div
            className="rounded-2xl bg-emerald-900/90 px-4 py-3 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <p className="text-[10px] text-emerald-300 font-semibold uppercase tracking-widest">
                Heart Rate
              </p>
              <p className="text-2xl font-extrabold text-white leading-none mt-0.5">
                72 <span className="text-sm font-normal text-emerald-300">bpm</span>
              </p>
            </div>
            <div className="flex-1 overflow-hidden">
              <motion.svg
                viewBox="0 0 80 48"
                className="w-full h-10"
                preserveAspectRatio="none"
              >
                {/* Static dim copy */}
                <path
                  d={ECG_PATH}
                  fill="none"
                  stroke="rgba(52,211,153,0.25)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Animated travelling stroke */}
                <motion.path
                  d={ECG_PATH}
                  fill="none"
                  stroke="#34D399"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={{ pathLength: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.4,
                    times: [0, 0.5, 0.7, 1],
                  }}
                />
                {/* Moving dot */}
                <motion.circle
                  r="3"
                  fill="#A7F3D0"
                  filter="url(#glow)"
                  initial={{ offsetDistance: "0%" } as any}
                  animate={{ offsetDistance: "100%" } as any}
                  style={{
                    offsetPath: `path("${ECG_PATH}")`,
                  } as any}
                  transition={{
                    duration: 2.4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.4,
                  }}
                />
                <defs>
                  <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </motion.svg>
            </div>
          </motion.div>

          {/* Stat tiles row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: "🩺", label: "Doctors", value: 240, suffix: "+" },
              { icon: "📅", label: "Bookings", value: 98, suffix: "%" },
              { icon: "⚡", label: "Avg Wait", value: 4, suffix: "m" },
            ].map(({ icon, label, value, suffix }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="rounded-xl bg-white/60 border border-white/50 p-2.5 text-center"
              >
                <div className="text-lg leading-none">{icon}</div>
                <div className="text-[11px] font-bold text-gray-800 mt-1">
                  <Counter to={value} suffix={suffix} />
                </div>
                <div className="text-[9px] text-gray-500 mt-0.5">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Doctor row */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 }}
            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-teal-50/60 border border-emerald-100 px-4 py-3"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xl">
                👨‍⚕️
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate">
                Dr. Patel — General
              </p>
              <p className="text-[10px] text-emerald-600 font-medium">
                Available now · 3 min
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="text-[10px] font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1.5 rounded-full shadow"
            >
              Book
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Floating badge — Home Visit ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute -right-6 top-6 hidden sm:flex glass-card items-center gap-2.5 px-4 py-2.5 float-y shadow-xl"
        style={{ animationDelay: "-2s" }}
      >
        <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center text-base">
          🏠
        </div>
        <div>
          <div className="text-[10px] text-gray-500 leading-none">Service</div>
          <div className="text-xs font-bold text-gray-800 mt-0.5">Home Visit</div>
        </div>
      </motion.div>

      {/* ── Floating badge — Verified ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute -left-6 bottom-8 hidden sm:flex glass-card items-center gap-2.5 px-4 py-2.5 float-y shadow-xl"
        style={{ animationDelay: "-4s" }}
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-base">
          ✅
        </div>
        <div>
          <div className="text-[10px] text-gray-500 leading-none">Status</div>
          <div className="text-xs font-bold text-gray-800 mt-0.5">Verified Doctor</div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroAnimation;
