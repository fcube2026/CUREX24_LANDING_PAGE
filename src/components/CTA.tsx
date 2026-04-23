import React from "react";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 0%, transparent 40%)",
          }}
        />
        {/* Decorative blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-emerald-200/30 blur-3xl" aria-hidden />

        <div className="relative px-6 py-16 md:px-16 md:py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md text-white border border-white/30">
            <span className="pulse-dot" style={{ background: "white" }} />
            Get started today
          </span>

          <h2 className="mt-6 text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Healthcare at your doorstep,
            <br className="hidden md:block" /> just one tap away.
          </h2>

          <p className="mt-5 text-white/90 text-lg max-w-2xl mx-auto">
            Join Curex24 and connect with trusted doctors, therapists and caregivers — instantly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-emerald-700 font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition">
              Get Started Now <span aria-hidden>→</span>
            </button>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/10 text-white border border-white/40 font-semibold backdrop-blur-md hover:bg-white/20 transition"
            >
              Learn more
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
