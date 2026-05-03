/**
 * ServicesMarquee
 * A second, services-specific scrolling strip used inside ServicesSection
 * to give a sense of breadth and motion.
 */
const items = [
  "👨‍⚕️ Doctor Consultation",
  "👩‍⚕️ Nursing Care",
  "💪 Physiotherapy",
  "🧠 Speech Therapy",
  "💊 Medication Support",
  "🧘 Wellness Programs",
  "🎥 Video Consultation",
  "🏠 Home Visit",
  "🏥 Clinic Visit",
  "🩺 Health Records",
];

const ServicesMarquee = () => {
  return (
    <div
      aria-hidden="true"
      className="marquee-mask mt-2 mb-4"
    >
      <div className="marquee-track">
        {[...items, ...items].map((label, i) => (
          <span key={`${label}-${i}`} className="marquee-chip">
            <span className="marquee-dot" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ServicesMarquee;
