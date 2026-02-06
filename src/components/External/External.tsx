import { motion } from "motion/react";

interface ExternalItem {
  id: string;
  title: string;
  link: string;
}

export const External = ({ externals }: { externals: ExternalItem[] }) => {
  return (
    <ul className="flex flex-col gap-2">
      {externals.map((external, index) => (
        <motion.li 
          key={external.id}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group flex gap-8 cursor-pointer transition-all last:mt-4"
        >
          <a 
            href={external.link}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full"
          >
            <span className="transition-all opacity-40 group-hover:opacity-100 group-hover:underline tracking-tight">
              {external.title}
            </span>
          </a>
        </motion.li>
      ))}
    </ul>
  );
};