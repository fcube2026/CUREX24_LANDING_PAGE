import { motion } from "framer-motion";

/**
 * LogoMarquee
 * Infinite, dual-direction marquee strip of trust keywords / "as-seen-in" style chips.
 * Pure CSS animation (keyframe `marquee` defined in globals.css).
 * Duplicates content for a seamless loop.
 */
const items = [
  "End-to-End Encrypted",
  "24/7 Access",
  "Verified Clinicians",
  "AI-assisted Triage",
  "Home & Clinic Visits",
  "Secure Records",
  "Instant Booking",
];

const Row = ({ reverse = false }: { reverse?: boolean }) => (
  <div
    className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
    aria-hidden="true"
  >
    {[...items, ...items].map((label, i) => (
      <span key={`${label}-${i}`} className="marquee-chip">
        <span className="marquee-dot" />
        {label}
      </span>
    ))}
  </div>
);

const LogoMarquee = () => {
  return (
    <section
      aria-label="Curex24 trust highlights"
      className="relative py-10 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 md:px-6"
      >
        <div className="marquee-mask space-y-3">
          <Row />
          <Row reverse />
        </div>
      </motion.div>
    </section>
  );
};

export default LogoMarquee;
