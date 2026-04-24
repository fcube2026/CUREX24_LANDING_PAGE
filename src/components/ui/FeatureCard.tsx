import { motion } from "framer-motion";

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

    <motion.div
      className="
        bg-white
        p-6
        rounded-2xl
        shadow-md
        text-center
      "
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(16,185,129,0.15)" }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >

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

    </motion.div>

  );

}