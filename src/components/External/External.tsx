import { motion } from "motion/react";

interface External {
  id: string;
  title: string;
  link: string;
}

export const External = ({ externals }: { externals: External[] }) => {
  return (
    <ul className="flex flex-col gap-2">
      {externals.map((external, index) => (
        <motion.li 
          key={external.id}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group last:mt-4"
        >
          <a 
            href={external.link}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex gap-8 cursor-pointer transition-all text-smart-opacity hover:underline"
          >
              {external.title}
          </a>
        </motion.li>
      ))}
    </ul>
  );
};