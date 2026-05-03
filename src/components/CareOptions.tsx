import { motion } from "framer-motion";

const options = [
  {
    icon: "⚡",
    title: "Instant Care",
    description:
      "Connect immediately in real-time when you need help right now.",
    tag: "On-demand",
  },
  {
    icon: "📅",
    title: "Scheduled Care",
    description:
      "Book appointments at your convenience — pick the time that works.",
    tag: "Plan ahead",
  },
  {
    icon: "📄",
    title: "Subscription Care",
    description:
      "Ongoing healthcare support plans for families and chronic care.",
    tag: "Best value",
  },
];

export default function CareOptions() {
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
            Flexible care models
          </motion.span>

          <motion.h2
            className="mt-3 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Choose how you{" "}
            <span className="gradient-text">receive care.</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-base md:text-lg text-gray-600"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            One-off visits, planned appointments or continuous care —
            Curex24 supports the rhythm of your health.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {options.map((option, i) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, rotate: -0.5 }}
              className="grad-card text-left h-full flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="icon-tile" aria-hidden>
                  <span>{option.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50/90 border border-emerald-200/70 px-2.5 py-1 rounded-full">
                  {option.tag}
                </span>
              </div>

              <h3 className="mt-5 font-bold text-xl text-gray-900">
                {option.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
                {option.description}
              </p>

              <div className="mt-6 h-[3px] w-12 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
