import { motion } from "motion/react";
import { PAGE_TRANSITION } from "@/constants/motion";
import type { Archive } from "@/types/archive.type";

export const Archives = ({ archives }: { archives: Archive[] }) => {
  return (
    <motion.div {...PAGE_TRANSITION} className="flex flex-col md:flex-row md:flex-wrap gap-8">
      {archives.map((img) => (
        <div key={img.id}>
          <img src={img.src} alt={img.id} className="w-full md:w-64" />
        </div>
      ))}
    </motion.div>
  );
};