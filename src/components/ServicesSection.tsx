import { motion } from "framer-motion";
import ServiceCard from "./ui/ServiceCard";
import ServicesMarquee from "./ServicesMarquee";

const services = [
  {
    title: "Doctor Consultation",
    icon: "👨‍⚕️",
    description: "Connect instantly with verified physicians for general & specialist care.",
    accent: "Most loved",
  },
  {
    title: "Speech Therapy",
    icon: "🧠",
    description: "Personalised therapy sessions for children, adults and stroke recovery.",
  },
  {
    title: "Nursing Care",
    icon: "👩‍⚕️",
    description: "Professional in-home nursing — wound care, post-op, elderly support.",
    accent: "Home visit",
  },
  {
    title: "Physiotherapy",
    icon: "💪",
    description: "Recovery, mobility and pain-management at home or in clinic.",
  },
  {
    title: "Medication Support",
    icon: "💊",
    description: "Smart reminders, refills and adherence tracking for ongoing care.",
  },
  {
    title: "Wellness Programs",
    icon: "🧘",
    description: "Holistic plans across nutrition, mental wellness and lifestyle.",
  },
  {
    title: "Video Consultation",
    icon: "🎥",
    description: "Face-to-face consults via secure video — anywhere, anytime.",
    accent: "24/7",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Soft background accents */}
      <div className="blob w-72 h-72 bg-emerald-200/60 -top-10 -left-10" aria-hidden />
      <div className="blob w-72 h-72 bg-teal-200/60 bottom-0 -right-10" aria-hidden />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Services
          </motion.span>

          <motion.h2
            className="mt-3 text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            One platform.{" "}
            <span className="gradient-text">Every kind of care.</span>
          </motion.h2>

          <motion.p
            className="mt-4 text-base md:text-lg text-gray-600"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Comprehensive healthcare services tailored to your needs — from
            instant doctor visits to long-term recovery and wellness.
          </motion.p>
        </div>

        {/* Scrolling services strip */}
        <div className="mt-10">
          <ServicesMarquee />
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              accent={service.accent}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
