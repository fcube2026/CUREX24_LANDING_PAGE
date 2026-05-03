import { motion } from "framer-motion";
import WishlistButton from "./WishlistButton";

export default function ConversionCTA() {
  return (
    <section className="relative py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grad-card relative overflow-hidden text-center p-8 md:p-14"
        >
          <span className="badge-pill">
            <span className="pulse-dot" aria-hidden></span>
            Launching soon · Limited early access
          </span>

          <h2 className="mt-5 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Be among the first to experience{" "}
            <span className="gradient-text">care that comes to you.</span>
          </h2>

          <p className="mt-5 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Join the wishlist, book early access, or partner with us as a
            verified provider — and help shape the future of on-demand
            healthcare.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <WishlistButton />
            <a href="#partner" className="btn-secondary">
              Become a Partner
              <span aria-hidden>→</span>
            </a>
            <a href="#services" className="btn-ghost">
              Explore Services
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 justify-center text-xs sm:text-sm text-emerald-800/80">
            <span className="inline-flex items-center gap-1.5">
              <span className="pulse-dot" aria-hidden></span>
              Verified providers
            </span>
            <span className="opacity-40">•</span>
            <span>🔒 Secure health records</span>
            <span className="opacity-40">•</span>
            <span>❤️ Patient-first care</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
