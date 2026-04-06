import { motion } from "motion/react";
import { useAtom } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { SubView } from "@/components/SubView/SubView";
import { Button } from "@/components/ui/button";
import type { Track } from "@/types/track.type";

export const Tracks = ({ tracks }: { tracks: Track[] }) => {
  // happy halloween은 육안으로 규격이 맞아보이지 않아 패딩을 추가한다

  const [trackId, setTrackId] = useAtom(trackIdAtom);

  const handleTrackClick = (id: string) => {
    setTrackId(trackId === id ? null : id);
  };

  return (
    <SubView as="ul" className="flex flex-col gap-2">
      {tracks.map((track, index) => {
        const isPlaying = trackId === track.id;

        return (
          <motion.li
            key={track.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <Button
              variant="ghost"
              onClick={() => handleTrackClick(track.id)}
              className={`
                flex w-full h-auto justify-start gap-16 text-base hover:underline
                ${isPlaying ? "opacity-80" : "text-smart-opacity"}
              `}
            >
              <span>{track.id}</span>
              <span className={track.title === "happy halloween!" ? "pl-0.5" : ""}>
                {track.title}
              </span>
            </Button>
          </motion.li>
        );
      })}
    </SubView>
  );
};