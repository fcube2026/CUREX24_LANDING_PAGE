import FeatureCard from "./ui/FeatureCard";

const steps = [
  {
    icon: "01",
    title: "Request Care",
    description:
      "Enter your symptoms or select service"
  },
  {
    icon: "02",
    title: "Smart Matching",
    description:
      "We connect nearby providers instantly"
  },
  {
    icon: "03",
    title: "AI Recommendation",
    description:
      "Best option suggested automatically"
  },
  {
    icon: "04",
    title: "Get Care",
    description:
      "Receive treatment seamlessly"
  }
];

export default function HowItWorks() {

  return (

    <section className="py-24 text-center bg-green-50">

      <h2 className="text-3xl font-bold mb-4">
        How It Works
      </h2>

      <p className="text-gray-600 mb-12">
        Get healthcare in just a few simple steps
      </p>

      <div className="max-w-6xl mx-auto px-6">

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-4
          gap-8
        ">

          {steps.map((step, i) => (

            <FeatureCard
              key={i}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />

          ))}

        </div>

      </div>

    </section>

  );

}