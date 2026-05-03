import { motion } from "framer-motion";

type Props = {
  icon: string;
  title: string;
  description?: string;
  index?: number;
  accent?: string;
};

export default function ServiceCard({
  icon,
  title,
  description,
  index = 0,
  accent,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="grad-card text-left h-full flex flex-col group"
    >
      <div className="flex items-start justify-between">
        <div className="icon-tile" aria-hidden>
          <span>{icon}</span>
        </div>

        {accent && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50/90 border border-emerald-200/70 px-2.5 py-1 rounded-full">
            {accent}
          </span>
        )}
      </div>

      <h3 className="mt-5 font-bold text-lg text-gray-900">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">
          {description}
        </p>
      )}

      <div className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
        Learn more
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </motion.div>
  );
}
