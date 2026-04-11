import { motion } from "framer-motion";

const WhyChooseUs = () => {

  const points = [

    "Instant doctor availability",
    "Trusted healthcare providers",
    "Flexible home or clinic visits",
    "Affordable subscription care"

  ];

  return (

    <section id="why" className="py-20">

      <motion.div
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center"

        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}

        transition={{ duration: 0.8 }}
      >

        <img
          src="/app-preview.png"
          alt="App Preview"
          className="rounded-2xl shadow-lg"
        />

        <div>

          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose Curex24
          </h2>

          <ul className="mt-8 space-y-4">

            {points.map((point, i) => (

              <motion.li
                key={i}

                className="glass-card p-4 flex items-center gap-3"

                whileHover={{ scale: 1.05 }}
              >

                <span className="w-3 h-3 bg-green-400 rounded-full"></span>

                <span className="text-gray-700 text-lg">
                  {point}
                </span>

              </motion.li>

            ))}

          </ul>

        </div>

      </motion.div>

    </section>

  );

};

export default WhyChooseUs;