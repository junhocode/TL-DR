import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { Button } from "@/components/ui/button";
import type { TrackMenuProps } from "@/types/track.type";

export const Tracks = ({ tracks, onTrackClick }: TrackMenuProps) => {
  const trackId = useAtomValue(trackIdAtom);

  return (
    <ul className="flex flex-col gap-2">
      {tracks.map((track, index) => {
        const isPlaying = trackId === track.id;

        return (
          <motion.li 
            key={track.id}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <Button
              variant="ghost"
              onClick={() => onTrackClick(track.id, track.src)}
              className={`
                flex w-full h-auto flex justify-start gap-16 text-base hover:underline 
                ${isPlaying ? "opacity-80" : "text-smart-opacity"}
              `}
            >
              <span>
                {track.id}
              </span>

              <span
  className={`
    inline-block
    ${track.title === "happy halloween!" ? "pl-0.5" : ""}
  `}
>
  {track.title}
</span>

            </Button>
          </motion.li>
        );
      })}
    </ul>
  );
};