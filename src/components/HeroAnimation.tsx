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

      {/* ── Doctor image with floating ring ──────────────── */}
      <div className="relative flex justify-center mb-6">
        {/* Outer pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.15, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-emerald-300/40 blur-xl"
        />
        {/* Inner glow ring */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute inset-2 rounded-full border-2 border-emerald-400/50"
        />
        {/* Doctor photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl ring-4 ring-emerald-200/60"
        >
          <img
            src="/doctor.png"
            alt="Doctor"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        {/* ── Orbiting pill — Heart Rate ────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute -right-4 top-4 flex glass-card items-center gap-2 px-3 py-2 float-y shadow-lg"
          style={{ animationDelay: "-1s" }}
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-900 flex items-center justify-center">
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
          <div>
            <div className="text-[9px] text-gray-500 leading-none">Heart Rate</div>
            <div className="text-xs font-extrabold text-gray-800 mt-0.5">72 <span className="font-normal text-emerald-600">bpm</span></div>
          </div>
        </motion.div>

        {/* ── Orbiting pill — Rating ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -40, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute -left-6 top-8 flex glass-card items-center gap-2 px-3 py-2 float-y shadow-lg"
          style={{ animationDelay: "-3s" }}
        >
          <div className="w-7 h-7 rounded-lg bg-yellow-100 text-yellow-500 flex items-center justify-center text-sm">⭐</div>
          <div>
            <div className="text-[9px] text-gray-500 leading-none">Rating</div>
            <div className="text-xs font-extrabold text-gray-800 mt-0.5">4.9 / 5</div>
          </div>
        </motion.div>

        {/* ── Orbiting pill — Patients ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex glass-card items-center gap-2 px-3 py-2 float-y shadow-lg"
          style={{ animationDelay: "-5s" }}
        >
          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center text-sm">👥</div>
          <div>
            <div className="text-[9px] text-gray-500 leading-none">Patients</div>
            <div className="text-xs font-extrabold text-gray-800 mt-0.5"><Counter to={240} suffix="+" /></div>
          </div>
        </motion.div>
      </div>

      {/* ── Dashboard card ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
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
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-300 shadow">
                <img
                  src="/doctor.png"
                  alt="Dr. Patel"
                  className="w-full h-full object-cover object-top"
                />
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
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute -right-6 bottom-16 hidden sm:flex glass-card items-center gap-2.5 px-4 py-2.5 float-y shadow-xl"
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
        transition={{ delay: 1.4, duration: 0.6 }}
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
