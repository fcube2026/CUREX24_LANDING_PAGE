import { motion } from "framer-motion";

const Testimonials = () => {

  const reviews = [

    {
      name: "Anita Sharma",
      text: "Curex24 helped me get medical care at home within minutes!"
    },

    {
      name: "Rahul Verma",
      text: "The smart recommendation saved my time and stress."
    },

    {
      name: "Priya Nair",
      text: "Highly professional doctors and excellent service."
    }

  ];

  return (

    <section id="testimonials" className="py-20">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold text-gray-800">

          What Our Patients Say

        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          {reviews.map((review, i) => (

            <motion.div
              key={i}

              className="glass-card p-8"

              whileHover={{
                scale: 1.05,
                rotate: 1
              }}
            >

              <p className="text-gray-600 italic">
                "{review.text}"
              </p>

              <h4 className="mt-6 font-semibold text-gray-800">
                {review.name}
              </h4>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

};

export default Testimonials;