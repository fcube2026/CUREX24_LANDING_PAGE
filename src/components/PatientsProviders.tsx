import { motion } from "framer-motion";

const patientPerks = [
  "Instant access to nearby healthcare providers",
  "Flexible care options (home, clinic or video)",
  "Easy booking and scheduling",
  "Continuous care with subscriptions",
  "Secure, private health records",
];

const providerPerks = [
  "Reach more patients in your area",
  "Flexible working schedules",
  "Manage appointments easily",
  "Grow your practice digitally",
  "Built-in verification & trust badge",
];

export default function PatientsProviders() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            One ecosystem
          </motion.span>

          <motion.h2
            className="mt-3 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Built for{" "}
            <span className="gradient-text">patients & providers.</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-base md:text-lg text-gray-600"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A platform that benefits both those seeking care and those
            providing it — together.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
          {/* Patients Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            whileHover={{ y: -6 }}
            className="grad-card text-left relative"
          >
            <div className="flex items-center gap-3">
              <div className="icon-tile" aria-hidden>
                <span>👨‍👩‍👧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">For Patients</h3>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              {patientPerks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                    ✓
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:flex absolute -top-4 -right-4 items-center gap-2 bg-white/90 backdrop-blur border border-emerald-200/70 rounded-2xl px-3 py-2 shadow-md soft-float"
              aria-hidden
            >
              <span className="text-lg">⚡</span>
              <span className="text-xs font-bold text-emerald-700">Care in seconds</span>
            </motion.div>
          </motion.div>

          {/* Providers Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="grad-card text-left relative"
          >
            <div className="flex items-center gap-3">
              <div className="icon-tile" aria-hidden>
                <span>👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">For Providers</h3>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              {providerPerks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                    ✓
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden md:flex absolute -top-4 -left-4 items-center gap-2 bg-white/90 backdrop-blur border border-emerald-200/70 rounded-2xl px-3 py-2 shadow-md soft-float"
              style={{ animationDelay: "-3s" }}
              aria-hidden
            >
              <span className="text-lg">📈</span>
              <span className="text-xs font-bold text-emerald-700">Grow your practice</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
