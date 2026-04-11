import { motion } from "framer-motion";

const Stats = () => {

  const stats = [

    { number: "10K+", label: "Patients Served" },

    { number: "500+", label: "Doctors Available" },

    { number: "24/7", label: "Support Available" }

  ];

  return (

    <section className="py-20">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

        {stats.map((stat, i) => (

          <motion.div
            key={i}

            className="glass-card p-10"

            whileHover={{ scale: 1.05 }}
          >

            <h3 className="text-4xl font-bold text-green-500">

              {stat.number}

            </h3>

            <p className="text-gray-600 mt-3">

              {stat.label}

            </p>

          </motion.div>

        ))}

      </div>

    </section>

  );

};

export default Stats;