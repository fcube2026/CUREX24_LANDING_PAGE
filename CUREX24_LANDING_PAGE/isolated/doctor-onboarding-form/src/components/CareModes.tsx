import { motion } from "framer-motion";

const modes = [

  {
    icon: "⚡",
    title: "Instant Care",
    desc: "Connect with doctors and care providers immediately in real-time.",
    highlight: "Best for emergencies"
  },

  {
    icon: "📅",
    title: "Scheduled Care",
    desc: "Book appointments at your convenience with preferred providers.",
    highlight: "Plan ahead easily"
  },

  {
    icon: "🔄",
    title: "Subscription Care",
    desc: "Ongoing care plans for continuous support and monitoring.",
    highlight: "Long-term health support"
  }

];

const CareModes = () => {

  return (

    <section className="py-24">

      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">

        {/* Heading */}

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white"

          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
        >
          Choose How You Receive Care
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Flexible healthcare options designed around your needs
        </p>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {modes.map((mode, i) => (

            <motion.div
              key={i}

              className="glass-card p-8 cursor-pointer relative"

              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.1,
                delay: i * 0.1
              }}

              whileHover={{
                scale: 1.06,
                rotate: 1
              }}
            >

              {/* Highlight Tag */}

              <div className="absolute top-4 right-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                {mode.highlight}
              </div>

              {/* Icon */}

              <div className="text-4xl mb-4">
                {mode.icon}
              </div>

              {/* Title */}

              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {mode.title}
              </h3>

              {/* Description */}

              <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
                {mode.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default CareModes;