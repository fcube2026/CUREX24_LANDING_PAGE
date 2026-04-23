import { motion } from "framer-motion";

const TrustBadges = () => {

  const badges = [

    {
      icon: "🛡️",
      title: "Privacy First",
      desc: "Your health data stays private — we follow strict medical-grade privacy standards."
    },

    {
      icon: "✅",
      title: "Verified Providers",
      desc: "Every doctor, therapist and caregiver is identity-verified and credential-checked."
    },

    {
      icon: "🔒",
      title: "End-to-End Encrypted",
      desc: "All consultations and personal information are encrypted in transit and at rest."
    },

    {
      icon: "❤️",
      title: "Built by Healthcare Experts",
      desc: "Designed with practicing clinicians to deliver care you can rely on."
    }

  ];

  return (

    <section
      id="trust"
      aria-label="Why you can trust Curex24"
      className="py-20"
    >

      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">

        <motion.p
          className="text-sm font-semibold tracking-widest uppercase text-green-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Care you can trust
        </motion.p>

        <motion.h2
          className="mt-3 text-3xl md:text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Built on safety, privacy & verified care
        </motion.h2>

        <motion.p
          className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Curex24 is engineered to the same standards trusted by modern healthcare —
          so you can focus on getting better, not on who’s on the other side of the screen.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-14">

          {badges.map((badge, i) => (

            <motion.div
              key={badge.title}
              className="glass-card p-6 md:p-8 text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >

              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">
                <span aria-hidden="true">{badge.icon}</span>
              </div>

              <h3 className="mt-5 font-semibold text-lg text-gray-800">
                {badge.title}
              </h3>

              <p className="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                {badge.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default TrustBadges;
