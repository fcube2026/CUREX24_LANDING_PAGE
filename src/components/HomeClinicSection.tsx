import FeatureCard from "./ui/FeatureCard";

const options = [
  {
    icon: "🏠",
    title: "Home Visit",
    description:
      "Comfortable care at home. Ideal for recovery patients with personalized attention."
  },
  {
    icon: "🏥",
    title: "Clinic Visit",
    description:
      "Access full medical facilities with specialist availability and faster support."
  }
];

export default function HomeClinicSection() {

  return (

    <section className="py-24 text-center">

      <h2 className="text-3xl font-bold mb-4">
        Home Visit or Clinic Visit?
      </h2>

      <p className="text-gray-600 mb-12">
        Curex24 intelligently suggests the best option
        based on your location, urgency, and availability.
      </p>

      <div className="max-w-4xl mx-auto px-6">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-8
        ">

          {options.map((option, i) => (

            <FeatureCard
              key={i}
              icon={option.icon}
              title={option.title}
              description={option.description}
            />

          ))}

        </div>

      </div>

    </section>

  );

}