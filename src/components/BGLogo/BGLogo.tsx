import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { useLogoRotation } from "@/hooks/useLogoRotation";
import logo from "@/assets/images/r_ryuji.webp";

export const BGLogo = () => {
  const isPlaying = !!useAtomValue(currentTrackIdAtom);
  const rotate = useLogoRotation(isPlaying);

  return (
    <div className="fixed right-10 bottom-20 md:right-24 md:bottom-28 pointer-events-none">
      <motion.img
        src={logo}
        alt=""
        width={500}
        height={500}
        className="w-[150px] md:w-[200px] lg:w-[250px] opacity-15 dark:invert"
        style={{ rotate, willChange: "transform" }}
      />
    </div>
  );
};
