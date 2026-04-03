import { useEffect, useRef } from "react";
import { useMotionValue, animate } from "motion/react";
import { tickerX } from "@/atoms/tickerX";

const INITIAL_ANGLE = -12;
const SENSITIVITY = 0.3;

export const useLogoRotation = (isPlaying: boolean) => {
  const rotate = useMotionValue(INITIAL_ANGLE);
  const baseXRef = useRef(0);

  useEffect(() => {
    if (isPlaying) {
      baseXRef.current = tickerX.get() - (rotate.get() - INITIAL_ANGLE) / SENSITIVITY;
      return tickerX.on("change", (v) => {
        rotate.set(INITIAL_ANGLE + (v - baseXRef.current) * SENSITIVITY);
      });
    } else {
      const current = rotate.get();
      const mod = (((current - INITIAL_ANGLE) % 360) + 360) % 360;
      const near = mod > 180 ? mod - 360 : mod;
      rotate.set(INITIAL_ANGLE + near);
      animate(rotate, INITIAL_ANGLE, { duration: 0.8 });
    }
  }, [isPlaying, rotate]);

  return rotate;
};