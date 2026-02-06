import { motion } from "motion/react";

interface Visual {
  id: string;
  title: string;
  link: string;
}

export const Visuals = ({ visuals }: { visuals: Visual[] }) => {

  return (
    <ul className="flex flex-col gap-2">
      {visuals.map((visual, index) => (
        <motion.li 
          key={visual.id}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group flex gap-8 cursor-pointer transition-all"
        >
          <span className="transition-all opacity-40 hover:opacity-100 group-hover:underline tracking-tight">
            {visual.title}
          </span>

        </motion.li>
      ))}
    </ul>
  );
};