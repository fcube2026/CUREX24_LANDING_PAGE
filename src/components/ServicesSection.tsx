import FeatureCard from "./ui/FeatureCard";

const services = [
  {
    title: "Doctor Consultation",
    icon: "👨‍⚕️",
    description: "Connect instantly with doctors"
  },
  {
    title: "Speech Therapy",
    icon: "🧠",
    description: "Personalized therapy sessions"
  },
  {
    title: "Nursing Care",
    icon: "👩‍⚕️",
    description: "Professional nursing support"
  },
  {
    title: "Physiotherapy",
    icon: "💪",
    description: "Recovery and mobility care"
  },
  {
    title: "Medication Support",
    icon: "💊",
    description: "Medication reminders"
  },
  {
    title: "Wellness Programs",
    icon: "🧘",
    description: "Holistic health programs"
  },
  {
    title: "Video Consultation",
    icon: "🎥",
    description: "Face-to-face consults via secure video calls"
  }
];

export default function ServicesSection() {

  return (

    <section className="py-24 text-center">

      <h2 className="text-3xl font-bold mb-4">
        Services We Offer
      </h2>

      <p className="text-gray-600 mb-12">
        Comprehensive healthcare services tailored to your needs
      </p>

      <div className="max-w-6xl mx-auto px-6">

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          gap-8
        ">

          {services.map((service, i) => (

            <FeatureCard
              key={i}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />

          ))}

        </div>

      </div>

    </section>

  );
}