import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    icon: "📝",
    title: "Request Care",
    description: "Tell us your symptoms or pick a service in seconds.",
  },
  {
    n: "02",
    icon: "📍",
    title: "Smart Matching",
    description: "We connect nearby verified providers instantly.",
  },
  {
    n: "03",
    icon: "🤖",
    title: "AI Recommendation",
    description: "Best care option suggested automatically — home, clinic or video.",
  },
  {
    n: "04",
    icon: "💚",
    title: "Get Care",
    description: "Receive treatment seamlessly and track your recovery.",
  },
];

export default function HowItWorks() {
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
            How it works
          </motion.span>

          <motion.h2
            className="mt-3 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Care in <span className="gradient-text">four simple steps.</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-base md:text-lg text-gray-600"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From the moment you request care to the moment you feel better —
            Curex24 keeps everything effortless.
          </motion.p>
        </div>

        <div className="mt-16 step-line grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="step-bubble">
                <span aria-hidden className="text-2xl">{step.icon}</span>
              </div>

              <div className="mt-5 inline-block text-[11px] font-bold tracking-widest text-emerald-700 bg-emerald-50/80 border border-emerald-200/70 px-2.5 py-1 rounded-full">
                STEP {step.n}
              </div>

              <h3 className="mt-3 font-bold text-lg text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 max-w-[18rem] mx-auto leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
