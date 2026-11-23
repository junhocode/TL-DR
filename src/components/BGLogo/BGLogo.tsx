import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { useLogoRotation } from "@/hooks/useLogoRotation";

export const BGLogo = () => {
  const isPlaying = !!useAtomValue(trackIdAtom);
  const rotate = useLogoRotation(isPlaying);

  return (
    <div className="fixed right-10 bottom-20 md:right-24 md:bottom-28">
      <motion.img
        src="/images/r_ryuji.webp"
        alt=""
        width={500}
        height={500}
        className="w-[150px] md:w-[200px] lg:w-[250px] opacity-15 dark:invert"
        style={{ rotate, willChange: "transform" }}
      />
    </div>
  );
};
