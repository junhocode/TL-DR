// Footer.tsx
import { motion } from "motion/react";
import { useAudioTicker } from "@/hooks/useAudioTicker";

interface FooterProps {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  duration: number;
}

export const Footer = ({ audio, isPlaying, duration }: FooterProps) => {
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
              width: "1000vw",
              marginLeft: "-400vw",
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