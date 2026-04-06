import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useAudioTicker } from "@/hooks/useAudioTicker";

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
      className={`fixed bottom-0 left-0 w-full h-12 overflow-hidden z-50 bg-black ${isPlaying ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {imageUnitWidth > 0 && (
        <motion.div
          style={{ x: visualX }}
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
              backgroundImage: "url('/images/wrist_band.jpg')",
              backgroundSize: `${imageUnitWidth}px 100%`,
              backgroundRepeat: "repeat-x",
              willChange: "transform",
            }}
            className="h-full"
          />
        </motion.div>
      )}
    </footer>
  );
};