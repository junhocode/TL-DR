import { AnimatePresence } from "motion/react";
import { useAtomValue } from "jotai";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { SubView } from "@/components/SubView/SubView";
import { TRACKS } from "@/constants/tracks";

export const Lyrics = () => {
  const currentTrackId = useAtomValue(currentTrackIdAtom);
  const currentTrack = TRACKS.find((t) => t.id === currentTrackId);

  return (
    <AnimatePresence mode="wait">
      {currentTrack && (
        <SubView key={`lyrics-${currentTrack.id}`} className="w-full md:w-auto flex flex-col gap-3 z-10">
          <div className="flex flex-col border-b border-foreground/10 pb-4">
            <h2 className="text-xl opacity-80 tracking-widest">
              {currentTrack.id}. {currentTrack.title}
            </h2>
          </div>

          <div className="leading-[2.2] whitespace-pre-wrap max-h-[60vh] overflow-y-auto tracking-tight opacity-80">
            {currentTrack.lyrics || <span>Lyrics not found.</span>}
          </div>
        </SubView>
      )}
    </AnimatePresence>
  );
};