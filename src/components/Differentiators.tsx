import { motion } from "framer-motion";

const items = [
  {
    icon: "🧭",
    title: "Smart matching with nearby providers",
    desc: "We use location, urgency and verified availability to connect you with the right provider in seconds — not days.",
  },
  {
    icon: "🏠",
    title: "Home, clinic & video — in one app",
    desc: "Switch effortlessly between in-home visits, clinic appointments and secure video consultations. Care that flexes around your life.",
  },
  {
    icon: "✅",
    title: "Verified doctors, nurses, therapists & caregivers",
    desc: "Every provider is identity-verified, credential-checked and continuously rated by real patients.",
  },
  {
    icon: "⏱️",
    title: "Instant, scheduled & subscription care",
    desc: "On-demand for urgent needs, scheduled for planning ahead, and subscription plans for chronic and family care.",
  },
  {
    icon: "🤝",
    title: "Patients & providers, one ecosystem",
    desc: "A single intelligent platform that helps patients get care faster and helps providers grow their practice.",
  },
];

export default function Differentiators() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob w-72 h-72 bg-emerald-200/60 -top-10 -left-20" aria-hidden />
      <div className="blob w-72 h-72 bg-teal-200/60 -bottom-10 -right-10" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What makes Curex24 different
          </motion.span>

          <motion.h2
            className="mt-3 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Not just another booking app —{" "}
            <span className="gradient-text">a complete care ecosystem.</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-base md:text-lg text-gray-600"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Five things that set Curex24 apart and make care actually feel
            modern.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className={`grad-card text-left h-full flex flex-col ${
                i === 0 ? "lg:col-span-1" : ""
              }`}
            >
              <div className="icon-tile" aria-hidden>
                <span>{it.icon}</span>
              </div>

              <h3 className="mt-5 font-bold text-lg text-gray-900">
                {it.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                {it.desc}
              </p>
            </motion.div>
          ))}

          {/* Closing accent card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: items.length * 0.07 }}
            className="grad-card text-left h-full flex flex-col justify-center"
          >
            <div className="text-3xl" aria-hidden>💚</div>
            <h3 className="mt-3 font-bold text-lg text-gray-900">
              Built around you
            </h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Every feature is designed with one question in mind: does this
              actually help someone get better, faster?
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
