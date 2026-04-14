import { motion } from "framer-motion";

const PartnerWithUs = () => {

  return (

    <section className="py-24">

      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">

        <motion.div
          className="glass-card p-10 md:p-14"

          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
        >

          {/* Heading */}

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Partner With Curex24
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Join our growing network of healthcare professionals and providers.
            Expand your reach, manage patients easily, and deliver care more efficiently.
          </p>

          {/* Benefits */}

          <div className="grid sm:grid-cols-2 gap-6 mt-10 text-left">

            <div className="text-gray-700 dark:text-gray-300">
              ✔ Access a wider patient base  
            </div>

            <div className="text-gray-700 dark:text-gray-300">
              ✔ Flexible scheduling system  
            </div>

            <div className="text-gray-700 dark:text-gray-300">
              ✔ Digital appointment management  
            </div>

            <div className="text-gray-700 dark:text-gray-300">
              ✔ Grow your healthcare practice  
            </div>

          </div>

          {/* CTA */}

          <motion.button
            className="btn-primary mt-10"

            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Become a Partner
          </motion.button>

        </motion.div>

      </div>

    </section>

  );

};

export default PartnerWithUs;