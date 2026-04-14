import React from "react";
import { motion } from "framer-motion";

const WhatCurex24Does = () => {

  const features = [

    {
      icon: "⚡",
      title: "Real-Time Matching",
      desc: "Find nearby doctors instantly based on availability."
    },

    {
      icon: "🧠",
      title: "Smart Recommendations",
      desc: "We intelligently suggest home visits or clinic visits."
    },

    {
      icon: "🏥",
      title: "Multiple Care Services",
      desc: "From physiotherapy to nursing and therapy support."
    }

  ];

  return (

    <section id="services" className="py-20">

      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">

        {/* Heading Animation */}

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800"

          initial={{ opacity: 0, y: 40 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}
        >
          What Curex24 Does
        </motion.h2>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">

          {features.map((item, i) => (

            <motion.div
              key={i}

              className="glass-card p-8 cursor-pointer"

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

              {/* Icon */}

              <div className="text-4xl mb-4">
                {item.icon}
              </div>

              {/* Title */}

              <h3 className="font-semibold text-xl text-gray-800">
                {item.title}
              </h3>

              {/* Description */}

              <p className="text-gray-600 mt-3">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default WhatCurex24Does;