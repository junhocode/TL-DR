import { AnimatePresence } from "motion/react";
import { useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { SubView } from "@/components/SubView/SubView";
import { TRACKS } from "@/constants/tracks";
import { LYRICS } from "@/constants/lyrics";

export const Lyrics = () => {
  const playingNo = useAtomValue(trackIdAtom);

  const currentTrack = playingNo
    ? Object.values(TRACKS).flat().find((t) => t.id === playingNo)
    : null;

  const lyricsText = playingNo ? LYRICS[playingNo] : null;

  return (
    <AnimatePresence mode="wait">
      {playingNo && currentTrack && (
        <SubView key={`lyrics-${playingNo}`} className="w-full md:w-auto flex flex-col gap-3 z-10">
          <div className="flex flex-col border-b border-foreground/10 pb-4">
            <h2 className="text-xl opacity-80 tracking-widest">
              {playingNo}. {currentTrack.title}
            </h2>
          </div>

          <div className="leading-[2.2] whitespace-pre-wrap max-h-[60vh] overflow-y-auto scrollbar-hide tracking-tight opacity-80">
            {lyricsText || <span>Lyrics not found.</span>}
          </div>
        </SubView>
      )}
    </AnimatePresence>
  );
};