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
    <div className="relative w-full max-w-[400px] mx-auto select-none" aria-hidden>
      {/* Ambient glow */}
      <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-tr from-emerald-300/35 via-teal-300/25 to-green-200/25 blur-3xl pointer-events-none" />

      {/* ── Main app card ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.15 }}
        className="glass-card rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Browser top bar */}
        <div className="flex items-center gap-2 px-5 py-3 bg-white/40 border-b border-white/30">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 text-xs font-semibold text-emerald-700 tracking-wide">curex24.com</span>
          <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50/80 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <span className="pulse-dot w-1.5 h-1.5" />
            Live
          </span>
        </div>

        {/* ── Doctor profile block ───────────────────────── */}
        <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/40 px-5 pt-5 pb-4 border-b border-white/40">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.35 }}
              className="relative flex-shrink-0"
            >
              <motion.div
                animate={{ scale: [1, 1.14, 1], opacity: [0.45, 0, 0.45] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-emerald-400/50"
              />
              <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden border-[3px] border-white shadow-lg ring-2 ring-emerald-200/70">
                <img src="/doctor.png" alt="Doctor" className="w-full h-full object-cover object-top" />
              </div>
              <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
            </motion.div>

            {/* Name / meta */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-extrabold text-gray-800 truncate">Dr. Patel</p>
              <p className="text-[11px] text-emerald-600 font-semibold">General Physician</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400 text-[11px] leading-none">★★★★★</span>
                <span className="text-[10px] text-gray-500">4.9 · 240+ patients</span>
              </div>
            </div>

            {/* Book button */}
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 text-[11px] font-bold text-white bg-gradient-to-br from-emerald-500 to-teal-500 px-4 py-2 rounded-xl shadow-md"
            >
              Book Now
            </motion.button>
          </div>

          {/* Service tags */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {[
              { emoji: "🏠", label: "Home Visit" },
              { emoji: "🏥", label: "Clinic" },
              { emoji: "💬", label: "Online" },
            ].map(({ emoji, label }, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.1 }}
                className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/70 border border-emerald-200/70 text-emerald-700 px-2.5 py-1 rounded-full"
              >
                <span>{emoji}</span>
                {label}
              </motion.span>
            ))}
          </div>
        </div>

        {/* ── Stat tiles ────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-2.5 p-4 bg-white/10">
          {[
            { icon: "🩺", label: "Doctors", value: 240, suffix: "+" },
            { icon: "📅", label: "Bookings", value: 98, suffix: "%" },
            { icon: "⚡", label: "Avg Wait", value: 4, suffix: "m" },
          ].map(({ icon, label, value, suffix }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="rounded-2xl bg-white/75 border border-white/60 p-3 text-center"
            >
              <div className="text-xl leading-none">{icon}</div>
              <div className="text-sm font-extrabold text-gray-800 mt-1.5">
                <Counter to={value} suffix={suffix} />
              </div>
              <div className="text-[9px] text-gray-500 mt-0.5">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Heart-rate bar ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mx-4 mb-4 flex items-center gap-3 rounded-2xl bg-emerald-900/90 px-4 py-3"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-700/80 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 80 48" className="w-5 h-4">
              <motion.path
                d={ECG_PATH}
                fill="none"
                stroke="#34D399"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut", times: [0, 0.5, 0.7, 1] }}
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[10px] text-emerald-400 font-medium leading-none">Heart Rate</div>
            <div className="text-sm font-extrabold text-white mt-0.5">
              72 <span className="text-[11px] font-normal text-emerald-400">bpm</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] text-emerald-400 leading-none">Status</div>
            <div className="text-xs font-bold text-emerald-300 mt-0.5">Normal ✓</div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Floating badge — Verified Doctor ─────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -24, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1, duration: 0.55 }}
        className="absolute -left-8 top-[38%] hidden sm:flex glass-card items-center gap-2.5 px-3.5 py-2.5 float-y shadow-xl"
        style={{ animationDelay: "-2s" }}
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">✅</div>
        <div>
          <div className="text-[9px] text-gray-500 leading-none">Status</div>
          <div className="text-xs font-bold text-gray-800 mt-0.5">Verified</div>
        </div>
      </motion.div>

      {/* ── Floating badge — Available Now ───────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 24, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.3, duration: 0.55 }}
        className="absolute -right-8 top-[28%] hidden sm:flex glass-card items-center gap-2.5 px-3.5 py-2.5 float-y shadow-xl"
        style={{ animationDelay: "-4s" }}
      >
        <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center text-sm">👨‍⚕️</div>
        <div>
          <div className="text-[9px] text-gray-500 leading-none">Available</div>
          <div className="text-xs font-bold text-gray-800 mt-0.5">Right Now</div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroAnimation;
