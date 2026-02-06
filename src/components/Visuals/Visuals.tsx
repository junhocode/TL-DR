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
          className="group"
        >
          <a 
            href={visual.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex gap-8 cursor-pointer transition-all"
          >
            <span className="transition-all opacity-40 group-hover:opacity-100 group-hover:underline tracking-tight">
              {visual.title}
            </span>
          </a>
        </motion.li>
      ))}
    </ul>
  );
};