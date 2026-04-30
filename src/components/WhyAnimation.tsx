import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

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

/* ── Pulsing ring ─────────────────────────────────────────── */
function PulseRing({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
      initial={{ scale: 1, opacity: 0.7 }}
      animate={{ scale: 2.2, opacity: 0 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

/* ── Orbit dot ────────────────────────────────────────────── */
function OrbitIcon({
  icon,
  label,
  angleDeg,
  delay,
}: {
  icon: string;
  label: string;
  angleDeg: number;
  delay: number;
}) {
  const rad = (angleDeg * Math.PI) / 180;
  const r = 120; // orbit radius px
  const x = Math.cos(rad) * r;
  const y = Math.sin(rad) * r;

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1"
      style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%,-50%)" }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
        className="w-11 h-11 rounded-2xl bg-white/70 border border-emerald-100 shadow-lg flex items-center justify-center text-xl backdrop-blur-sm"
      >
        {icon}
      </motion.div>
      <span className="text-[9px] font-semibold text-gray-600 whitespace-nowrap bg-white/60 px-1.5 py-0.5 rounded-full">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Main component ──────────────────────────────────────── */
const WhyAnimation = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto select-none" aria-hidden>
      {/* Ambient glow */}
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-emerald-300/40 via-teal-300/30 to-green-200/30 blur-3xl pointer-events-none" />

      {/* Orbit container */}
      <div className="relative w-72 h-72 mx-auto">

        {/* Orbit ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-emerald-300/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Service orbit icons — evenly distributed every 60° to prevent overlap */}
        <OrbitIcon icon="🏠"   label="Home Visit"    angleDeg={-90}  delay={0.8} />
        <OrbitIcon icon="🩺"   label="Clinic"        angleDeg={-30}  delay={1.0} />
        <OrbitIcon icon="💊"   label="Prescriptions" angleDeg={30}   delay={1.2} />
        <OrbitIcon icon="🧬"   label="Diagnostics"   angleDeg={90}   delay={1.4} />
        <OrbitIcon icon="📱"   label="Telehealth"    angleDeg={150}  delay={1.6} />
        <OrbitIcon icon="🧑‍⚕️" label="Caregivers"    angleDeg={210}  delay={1.8} />

        {/* Central card — kept compact so the orbit icons breathe around it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="absolute inset-0 m-auto w-14 h-14 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-2xl shadow-emerald-500/40"
        >
          {/* Pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <PulseRing delay={0} />
            <PulseRing delay={1} />
          </div>

          <span className="text-base leading-none z-10">✚</span>
          <span className="text-[6px] font-extrabold text-white/90 tracking-widest uppercase mt-0.5 z-10">
            Curex24
          </span>
        </motion.div>
      </div>

      {/* Stats row */}
      <motion.div
        className="mt-6 grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        {[
          { icon: "⚡", value: 4,   suffix: "m",  label: "Avg Wait" },
          { icon: "👨‍⚕️", value: 240, suffix: "+", label: "Doctors" },
          { icon: "⭐", value: 98,  suffix: "%",  label: "Satisfied" },
        ].map(({ icon, value, suffix, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1 + i * 0.1 }}
            className="glass-card rounded-2xl p-3 text-center"
          >
            <div className="text-xl leading-none">{icon}</div>
            <div className="text-sm font-extrabold text-gray-800 mt-1">
              <Counter to={value} suffix={suffix} />
            </div>
            <div className="text-[9px] text-gray-500 mt-0.5">{label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating badge — instant booking */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="absolute -right-4 top-4 hidden sm:flex glass-card items-center gap-2 px-3 py-2 float-y shadow-xl"
        style={{ animationDelay: "-2s" }}
      >
        <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">
          ✅
        </div>
        <div>
          <div className="text-[9px] text-gray-500 leading-none">Status</div>
          <div className="text-[11px] font-bold text-gray-800">Verified</div>
        </div>
      </motion.div>

      {/* Floating badge — live (placed near top-left so it never overlaps the stats row) */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 2.6, duration: 0.6 }}
        className="absolute -left-4 top-4 hidden sm:flex glass-card items-center gap-2 px-3 py-2 float-y shadow-xl"
        style={{ animationDelay: "-4s" }}
      >
        <span className="pulse-dot w-2 h-2" />
        <div className="text-[11px] font-bold text-emerald-700">Live 24/7</div>
      </motion.div>
    </div>
  );
};

export default WhyAnimation;
