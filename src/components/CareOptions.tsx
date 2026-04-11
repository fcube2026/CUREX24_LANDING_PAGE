import FeatureCard from "./ui/FeatureCard";

const options = [
  {
    icon: "⚡",
    title: "Instant Care",
    description: "Connect immediately in real-time"
  },
  {
    icon: "📅",
    title: "Scheduled Care",
    description: "Book appointments at your convenience"
  },
  {
    icon: "📄",
    title: "Subscription Care",
    description: "Ongoing healthcare support plans"
  }
];

export default function CareOptions() {

  return (

    <section className="py-24 text-center">

      <h2 className="text-3xl font-bold mb-4">
        Choose How You Receive Care
      </h2>

      <p className="text-gray-600 mb-12">
        Flexible healthcare options designed around your needs
      </p>

      <div className="max-w-5xl mx-auto px-6">

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
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