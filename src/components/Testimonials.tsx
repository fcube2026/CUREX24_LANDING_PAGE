import { motion } from "framer-motion";

const reviews = [
  {
    name: "Anita Sharma",
    role: "Pilot patient",
    text: "Curex24 helped me get medical care at home within minutes!",
  },
  {
    name: "Rahul Verma",
    role: "Early tester",
    text: "The smart recommendation saved my time and stress.",
  },
  {
    name: "Priya Nair",
    role: "Pilot patient",
    text: "Highly professional doctors and excellent service.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Early voices
          </motion.span>

          <motion.h2
            className="mt-3 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What early users <span className="gradient-text">are saying.</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-base md:text-lg text-gray-600"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We&apos;re still in pre-launch — these are first impressions from
            our pilot patients. More stories coming soon.
          </motion.p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="grad-card text-left h-full flex flex-col"
            >
              <div className="text-3xl text-emerald-500 leading-none" aria-hidden>“</div>
              <p className="mt-2 text-gray-700 leading-relaxed flex-1">
                {review.text}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {review.name}
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold">
                    {review.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
