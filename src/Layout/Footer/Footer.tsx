import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "motion/react";

interface FooterProps {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  duration: number;
}

const BASE_SPEED = 0.8; 
const ACCEL_STEP = 0.04;
const FPS = 60; 
const PIXELS_PER_SECOND = BASE_SPEED * FPS; 

export const Footer = ({ audio, isPlaying, duration }: FooterProps) => {
  const footerRef = useRef<HTMLElement>(null);
  const [imageUnitWidth, setImageUnitWidth] = useState(0);

  const rawX = useMotionValue(0);
  
  const visualX = useTransform(rawX, (v) => {
    if (imageUnitWidth === 0) return 0;
    return ((v % imageUnitWidth) - imageUnitWidth) % imageUnitWidth;
  });

  const currentSpeed = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/images/wrist_band.jpg";
    img.onload = () => {
      if (footerRef.current) {
        const footerHeight = footerRef.current.offsetHeight;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const unitWidth = Math.ceil(footerHeight * aspectRatio);
        setImageUnitWidth(unitWidth);
        
        if (audio) {
          rawX.set(-(audio.currentTime * PIXELS_PER_SECOND));
        }
      }
    };
  }, [audio]);

  useAnimationFrame(() => {
    if (imageUnitWidth === 0 || isDragging.current) return;

    const targetSpeed = isPlaying ? BASE_SPEED : 0;
    currentSpeed.current += (targetSpeed - currentSpeed.current) * ACCEL_STEP;
    
    if (isPlaying && audio) {
      rawX.set(-(audio.currentTime * PIXELS_PER_SECOND));
    } else {
      rawX.set(rawX.get() - currentSpeed.current);
    }
  });

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (!audio || duration === 0) return;

    const totalMoved = Math.abs(rawX.get());
    const calculatedTime = (totalMoved / PIXELS_PER_SECOND) % duration;
    
    audio.currentTime = calculatedTime;
  };

  return (
    <footer
      ref={footerRef}
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
          onDrag={(_, info) => {
            rawX.set(rawX.get() + info.delta.x);
          }}
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