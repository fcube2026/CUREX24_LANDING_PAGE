import { motion } from "framer-motion";

const SmartRecommendation = () => {

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
          Smart Care Recommendation
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Our system intelligently decides the best care option for you
        </p>

        {/* FLOW */}

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-10">

          {/* PATIENT */}

          <motion.div
            className="glass-card p-6 w-52"

            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl">🧑</div>
            <p className="mt-3 font-medium text-gray-800 dark:text-white">
              Patient Request
            </p>
          </motion.div>

          {/* ARROW */}

          <motion.div
            className="text-3xl"
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            ➡️
          </motion.div>

          {/* AI ENGINE */}

          <motion.div
            className="glass-card p-6 w-56"

            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.6 }}
          >
            <div className="text-4xl">🧠</div>

            <p className="mt-3 font-medium text-gray-800 dark:text-white">
              AI Analysis
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Distance • Availability • Urgency
            </p>
          </motion.div>

          {/* ARROW */}

          <motion.div
            className="text-3xl"
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            ➡️
          </motion.div>

          {/* OUTPUT OPTIONS */}

          <div className="flex flex-col gap-6">

            {/* HOME VISIT */}

            <motion.div
              className="glass-card p-5 w-52"

              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}

              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl">🏠</div>

              <p className="mt-2 text-gray-800 dark:text-white font-medium">
                Home Visit
              </p>
            </motion.div>

            {/* CLINIC */}

            <motion.div
              className="glass-card p-5 w-52"

              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}

              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl">🏥</div>

              <p className="mt-2 text-gray-800 dark:text-white font-medium">
                Visit Clinic
              </p>
            </motion.div>

          </div>

        </div>

      </div>

    </section>

  );

};

export default SmartRecommendation;