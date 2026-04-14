import { motion } from "framer-motion";

const FinalCTA = () => {

  return (

    <section className="py-24">

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">

        <motion.div
          className="glass-card p-10 md:p-14"

          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
        >

          {/* Heading */}

          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">

            Care that
            <span className="text-green-500"> comes to you.</span>

          </h2>

          {/* Subtext */}

          <p className="text-gray-600 dark:text-gray-300 mt-6 max-w-xl mx-auto">

            Join Curex24 today and experience smarter, faster, and more
            convenient healthcare — wherever you are.

          </p>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <motion.button
              className="btn-primary"

              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>

            <motion.button
              className="glass-card px-6 py-3 font-medium"

              whileHover={{ scale: 1.05 }}
            >
              Download App
            </motion.button>

          </div>

        </motion.div>

      </div>

    </section>

  );

};

export default FinalCTA;