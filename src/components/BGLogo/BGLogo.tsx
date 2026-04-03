import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/atoms/themeAtom";
import { trackIdAtom } from "@/atoms/playerAtom";
import { useLogoRotation } from "@/hooks/useLogoRotation";

export const BGLogo = () => {
  const isDark = useAtomValue(themeAtom);
  const isPlaying = !!useAtomValue(trackIdAtom);
  const logoSrc = isDark ? "/images/r_ryuji_white.png" : "/images/r_ryuji_black.png";
  const rotate = useLogoRotation(isPlaying);

  return (
    <div className="fixed right-10 bottom-20 md:right-24 md:bottom-28">
      <motion.img
        src={logoSrc}
        alt=""
        className="w-[150px] md:w-[200px] lg:w-[250px] opacity-15"
        style={{ rotate }}
      />
    </div>
  );
};