import { motion } from "framer-motion";

const HomeVsClinic = () => {

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
          Home Visit or Clinic Visit?
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-300 mt-4">
          Curex24 intelligently suggests the best option based on your needs
        </p>

        {/* Comparison Cards */}

        <div className="grid md:grid-cols-2 gap-10 mt-16">

          {/* HOME VISIT */}

          <motion.div
            className="glass-card p-8 text-left"

            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.6 }}

            whileHover={{ scale: 1.03 }}
          >

            <div className="text-4xl mb-4">🏠</div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Home Visit
            </h3>

            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300 text-sm">

              <li>✔ Comfortable care at your home</li>
              <li>✔ Ideal for elderly & recovery patients</li>
              <li>✔ Saves travel time</li>
              <li>✔ Personalized attention</li>

            </ul>

          </motion.div>

          {/* CLINIC VISIT */}

          <motion.div
            className="glass-card p-8 text-left"

            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.6 }}

            whileHover={{ scale: 1.03 }}
          >

            <div className="text-4xl mb-4">🏥</div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Clinic Visit
            </h3>

            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300 text-sm">

              <li>✔ Access to full medical facilities</li>
              <li>✔ Suitable for advanced diagnostics</li>
              <li>✔ Faster emergency support</li>
              <li>✔ Specialist availability</li>

            </ul>

          </motion.div>

        </div>

        {/* Smart Recommendation Highlight */}

        <motion.div
          className="glass-card mt-12 p-6 max-w-xl mx-auto"

          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
        >

          <p className="text-gray-700 dark:text-gray-200 font-medium">

            Curex24 automatically recommends the best option
            based on your location, urgency, and availability.

          </p>

        </motion.div>

      </div>

    </section>

  );

};

export default HomeVsClinic;