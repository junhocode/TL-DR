import { motion } from "motion/react";
import { useAtom } from "jotai";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { SubView } from "@/components/SubView/SubView";
import { Button } from "@/components/ui/button";
import { STAGGER_DELAY } from "@/constants/motion";
import { TRACKS } from "@/constants/tracks";

export const Tracks = () => {
  // happy halloween은 육안으로 규격이 맞아보이지 않아 패딩을 추가한다
  const [currentTrackId, setCurrentTrackId] = useAtom(currentTrackIdAtom);

  const handleTrackClick = (id: string) => {
    setCurrentTrackId(currentTrackId === id ? null : id);
  };

  return (
    <SubView as="ul" className="flex flex-col gap-2 shrink-0">
      {TRACKS.map((track, index) => {
        const isPlaying = currentTrackId === track.id;

        return (
          <motion.li
            key={track.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * STAGGER_DELAY }}
          >
            <Button
              onClick={() => handleTrackClick(track.id)}
              className={`
                flex w-full justify-start gap-16 text-base hover:underline
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