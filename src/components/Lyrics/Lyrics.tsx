import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { TRACKS } from "@/constants/tracks";
import { LYRICS } from "@/constants/lyrics";

export const Lyrics = () => {
  const playingNo = useAtomValue(trackIdAtom);

  const currentTrack = Object.values(TRACKS)
    .flat()
    .find((t) => t.id === playingNo);

  const lyricsText = playingNo ? LYRICS[playingNo] : null;

  if (!playingNo || !currentTrack) return null;

  return (
    <motion.div
      key={`lyrics-${playingNo}`}
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-3 z-10"
    >
      <div className="flex flex-col border-b border-foreground/10 pb-4">
        <h2 className="text-xl opacity-80 tracking-widest">
          {playingNo}. {currentTrack.title}
        </h2>
      </div>

      <div 
        className="
          leading-[2.2] 
          whitespace-pre-wrap 
          max-h-[60vh] 
          overflow-y-auto 
          scrollbar-hide  
          tracking-tight
          opacity-80
        "
      >
        {lyricsText || (
          <span>Lyrics not found.</span>
        )}
      </div>
    </motion.div>
  );
};