import { motion } from "framer-motion";

const WhyChooseUs = () => {

  const points = [
    { title: "Instant doctor availability", desc: "Connect with available providers in minutes, not days." },
    { title: "Trusted healthcare providers", desc: "Every clinician is verified and credential-checked." },
    { title: "Flexible home or clinic visits", desc: "Care your way — wherever you are most comfortable." },
    { title: "Affordable subscription care", desc: "Transparent plans designed for everyday families." },
  ];

  return (

    <section id="why" className="py-24">

      <motion.div
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-emerald-300/40 via-teal-300/30 to-green-200/30 blur-2xl"
          />
          <img
            src="/app-preview.png"
            alt="App Preview"
            className="relative rounded-3xl shadow-2xl border border-white/60"
          />
        </div>

        <div>

          <span className="eyebrow">Why Curex24</span>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Care that's <span className="gradient-text">smarter, faster, kinder.</span>
          </h2>

          <ul className="mt-8 space-y-4">

            {points.map((point, i) => (

              <motion.li
                key={i}
                className="glass-card p-5 flex items-start gap-4"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/30">
                  ✓
                </span>
                <div>
                  <div className="text-gray-900 text-lg font-semibold">
                    {point.title}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {point.desc}
                  </div>
                </div>
              </motion.li>

            ))}

          </ul>

        </div>

      </motion.div>

    </section>

  );

};

export default WhyChooseUs;
