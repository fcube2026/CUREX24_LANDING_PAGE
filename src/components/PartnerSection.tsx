import { useState } from "react";
import { motion } from "framer-motion";
import PartnerWishlistModal from "./PartnerWishlistModal";

const perks = [
  "Access a wider patient base",
  "Flexible scheduling system",
  "Digital appointment management",
  "Grow your healthcare practice",
];

export default function PartnerSection() {
  const [open, setOpen] = useState(false);

  return (
    <section id="partner" className="relative py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grad-card relative text-center md:text-left p-8 md:p-12 overflow-hidden"
        >
          {/* Decorative floating chips */}
          <motion.div
            aria-hidden
            className="hidden md:flex absolute -top-4 right-8 items-center gap-2 bg-white/90 backdrop-blur border border-emerald-200/70 rounded-2xl px-3 py-2 shadow-md soft-float"
          >
            <span>🩺</span>
            <span className="text-xs font-bold text-emerald-700">Verified providers</span>
          </motion.div>
          <motion.div
            aria-hidden
            className="hidden md:flex absolute bottom-6 right-10 items-center gap-2 bg-white/90 backdrop-blur border border-emerald-200/70 rounded-2xl px-3 py-2 shadow-md soft-float"
            style={{ animationDelay: "-3s" }}
          >
            <span>🌐</span>
            <span className="text-xs font-bold text-emerald-700">Reach more patients</span>
          </motion.div>

          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <span className="eyebrow">For providers</span>

              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Partner with{" "}
                <span className="gradient-text">Curex24.</span>
              </h2>

              <p className="mt-4 text-gray-700 max-w-2xl">
                Join our growing network of healthcare professionals. Expand
                your reach, manage patients easily and deliver care more
                efficiently — all from one ecosystem.
              </p>

              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-left text-sm text-gray-700">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                      ✓
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex md:flex-col gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setOpen(true)}
                className="btn-primary"
              >
                Become a Partner
              </motion.button>
              <a href="#about" className="btn-secondary text-center">
                Learn more
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {open && <PartnerWishlistModal close={() => setOpen(false)} />}
    </section>
  );
}
