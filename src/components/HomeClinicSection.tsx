import { motion } from "framer-motion";

const options = [
  {
    icon: "🏠",
    title: "Home Visit",
    description:
      "Comfortable care at home. Ideal for recovery patients with personalised attention.",
    perks: ["Verified provider at your door", "No travel, no waiting"],
    tone: "from-emerald-50 to-teal-50",
  },
  {
    icon: "🏥",
    title: "Clinic Visit",
    description:
      "Access full medical facilities with specialist availability and faster support.",
    perks: ["Full diagnostics on-site", "Specialist network nearby"],
    tone: "from-teal-50 to-emerald-100",
  },
  {
    icon: "🎥",
    title: "Video Consultation",
    description:
      "Talk to a verified clinician face-to-face from anywhere — secure and private.",
    perks: ["Encrypted video calls", "Instant prescriptions"],
    tone: "from-emerald-100 to-teal-50",
  },
];

export default function HomeClinicSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Care, your way
          </motion.span>

          <motion.h2
            className="mt-3 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Home, Clinic or Video —{" "}
            <span className="gradient-text">you choose.</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-base md:text-lg text-gray-600"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Curex24 intelligently suggests the best mode based on your
            location, urgency and provider availability — and you stay in
            control.
          </motion.p>
        </div>

        {/* Animated care-flow journey */}
        <div className="mt-12 mb-16">
          <div className="relative max-w-3xl mx-auto flex items-center justify-between gap-2">
            {[
              { e: "🏠", l: "Home" },
              { e: "→", l: "" },
              { e: "🏥", l: "Clinic" },
              { e: "→", l: "" },
              { e: "🎥", l: "Video" },
            ].map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`flex flex-col items-center ${
                  node.l ? "" : "text-emerald-500 text-2xl font-extrabold"
                }`}
              >
                {node.l ? (
                  <>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/80 backdrop-blur border border-emerald-200/70 shadow-md flex items-center justify-center text-2xl sm:text-3xl soft-float">
                      <span aria-hidden>{node.e}</span>
                    </div>
                    <div className="mt-2 text-xs sm:text-sm font-semibold text-emerald-800">
                      {node.l}
                    </div>
                  </>
                ) : (
                  <span aria-hidden className="opacity-70">{node.e}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3 care option cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {options.map((option, i) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="grad-card text-left h-full flex flex-col"
            >
              <div
                className={`w-full h-24 -mt-2 mb-4 rounded-2xl bg-gradient-to-br ${option.tone} flex items-center justify-center text-5xl shadow-inner`}
                aria-hidden
              >
                {option.icon}
              </div>

              <h3 className="font-bold text-xl text-gray-900">
                {option.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {option.description}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {option.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
