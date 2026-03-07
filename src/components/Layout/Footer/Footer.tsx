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
    handleDragStart,
    handleDragEnd,
    handleDrag
  } = useAudioTicker({ audio, isPlaying, duration });

  return (
    <footer
      style={{ 
        pointerEvents: isPlaying ? "auto" : "none",
        backgroundColor: "black"
      }}
      className="fixed bottom-0 left-0 w-full h-12 overflow-hidden z-50 border-none"
    >
      {imageUnitWidth > 0 && (
        <motion.div
          drag="x"
          style={{ x: visualX }}
          onDrag={handleDrag}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="absolute top-0 flex h-full cursor-grab active:cursor-grabbing"
        >
          <div
            style={{
              width: "1000vw", 
              marginLeft: "-400vw", 
              backgroundImage: "url('/images/wrist_band.jpg')",
              backgroundSize: `${imageUnitWidth + 1}px 100%`,
              backgroundRepeat: "repeat-x",
              willChange: "transform"
            }}
            className="h-full"
          />
        </motion.div>
      )}
    </footer>
  );
};