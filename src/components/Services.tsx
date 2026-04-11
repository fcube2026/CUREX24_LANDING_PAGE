import { motion } from "framer-motion";

const services = [

  {
    icon: "👨‍⚕️",
    title: "Doctor Consultation",
    desc: "Connect instantly with nearby doctors for quick diagnosis and care."
  },

  {
    icon: "🧠",
    title: "Speech Therapy",
    desc: "Personalized therapy sessions for speech and communication improvement."
  },

  {
    icon: "🧑‍⚕️",
    title: "Nursing Care",
    desc: "Professional home nursing support for recovery and elderly care."
  },

  {
    icon: "💪",
    title: "Physiotherapy",
    desc: "Expert rehab sessions for injury recovery and mobility improvement."
  },

  {
    icon: "💊",
    title: "Medication Support",
    desc: "Guidance and reminders to ensure proper medication adherence."
  },

  {
    icon: "🧘",
    title: "Wellness Programs",
    desc: "Holistic health programs focusing on mental and physical wellbeing."
  }

];

const Services = () => {

  return (

    <section id="services" className="py-24">

      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">

        {/* Heading */}

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white"

          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
        >
          Services We Offer
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
          Comprehensive healthcare services tailored to your needs —
          delivered at home or in clinic with ease.
        </p>

        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">

          {services.map((service, i) => (

            <motion.div
              key={i}

              className="glass-card p-8 cursor-pointer"

              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.5,
                delay: i * 0.15
              }}

              whileHover={{
                scale: 1.06,
                rotate: 1
              }}
            >

              {/* Icon */}

              <div className="text-4xl mb-4">
                {service.icon}
              </div>

              {/* Title */}

              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {service.title}
              </h3>

              {/* Description */}

              <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                {service.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default Services;