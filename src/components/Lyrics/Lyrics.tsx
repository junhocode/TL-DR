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
      className="flex flex-col gap-8 max-w-md z-10"
    >
      <div className="flex flex-col gap-1 border-b border-foreground/10 pb-4">
        <h2 className="text-xl tracking-widest font-light opacity-80">
          {playingNo}. {currentTrack.title}
        </h2>
      </div>

      <div 
        className="
          text-[15px] 
          leading-[2.2] 
          opacity-70 
          whitespace-pre-wrap 
          max-h-[60vh] 
          overflow-y-auto 
          scrollbar-hide 
          font-light 
          tracking-tight
          pr-4
        "
      >
        {lyricsText || (
          <span className="italic opacity-30">Lyrics not found.</span>
        )}
      </div>
    </motion.div>
  );
};