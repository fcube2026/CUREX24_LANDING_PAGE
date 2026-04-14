type Props = {
  icon: string;
  title: string;
  description?: string;
};

export default function FeatureCard({
  icon,
  title,
  description
}: Props) {

  return (

    <div className="
      bg-white
      p-6
      rounded-2xl
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      text-center
    ">

      <div className="text-4xl mb-3">
        {icon}
      </div>

      <h3 className="font-semibold text-lg mb-2">
        {title}
      </h3>

      {description && (

        <p className="text-sm text-gray-600">
          {description}
        </p>

      )}

    </div>

  );

}