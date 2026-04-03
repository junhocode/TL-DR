import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/atoms/themeAtom";
import { trackIdAtom } from "@/atoms/playerAtom";
import { tickerX } from "@/atoms/tickerX";

export const BGLogo = () => {
  const isDark = useAtomValue(themeAtom);
  const isPlaying = !!useAtomValue(trackIdAtom);
  const logoSrc = isDark ? "/images/r_ryuji_white.png" : "/images/r_ryuji_black.png";

  const rotate = useMotionValue(-12);
  const baseXRef = useRef(0);

  useEffect(() => {
    if (isPlaying) {
      baseXRef.current = tickerX.get() - (rotate.get() + 12) / 0.05;
      return tickerX.on("change", (v) => {
        rotate.set(-12 + (v - baseXRef.current) * 0.3);
      });
    } else {
      const current = rotate.get();
      const mod = (((current + 12) % 360) + 360) % 360;
      const near = mod > 180 ? mod - 360 : mod;
      rotate.set(-12 + near);
      animate(rotate, -12, { duration: 0.8 });
    }
  }, [isPlaying, rotate]);

  return (
    <div className="fixed right-10 bottom-20 md:right-24 md:bottom-28">
      <motion.img
        src={logoSrc}
        alt="bg-logo"
        className="w-[150px] md:w-[200px] lg:w-[250px] opacity-15"
        style={{ rotate }}
      />
    </div>
  );
};