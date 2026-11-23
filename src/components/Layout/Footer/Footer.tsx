import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useAudioTicker } from "@/hooks/useAudioTicker";
import { FOOTER_HEIGHT } from "@/constants/layout";
import wristBand from "@/assets/images/wrist_band.jpg";

const TICKER_SPREAD = "300vw";
const TICKER_OFFSET = "-100vw";

export const Footer = () => {
  const isPlaying = !!useAtomValue(trackIdAtom);
  const { audio, duration } = useAudioPlayer();

  const {
    imageUnitWidth,
    visualX,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useAudioTicker({ audio, isPlaying, duration });

  return (
    <footer
      style={{ height: FOOTER_HEIGHT }}
      className={`fixed bottom-0 left-0 w-full overflow-hidden z-50 bg-black ${isPlaying ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {imageUnitWidth > 0 && (
        <motion.div
          style={{ x: visualX, willChange: "transform" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="absolute top-0 flex h-full cursor-grab active:cursor-grabbing touch-none"
        >
          <div
            style={{
              width: TICKER_SPREAD,
              marginLeft: TICKER_OFFSET,
              backgroundImage: `url(${wristBand})`,
              backgroundSize: `${imageUnitWidth}px 100%`,
              backgroundRepeat: "repeat-x",
            }}
            className="h-full"
          />
        </motion.div>
      )}
    </footer>
  );
};