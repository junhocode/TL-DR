import { useAtomValue } from "jotai";
import { AnimatePresence } from "motion/react";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { TRACKS } from "@/constants/tracks";
import { EXTERNAL } from "@/constants/external";
import { Menu } from "@/components/Menu/Menu";
import { Tracks } from "@/components/Tracks/Tracks";
import { Lyrics } from "@/components/Lyrics/Lyrics";
import { External } from "@/components/External/External";
import { BGLogo } from "@/components/BGLogo/BGLogo";
import { Visuals } from "@/components/Visuals/Visuals";
import { VISUALS } from "@/constants/visuals";
import { Archive } from "@/components/Archive/Archive";

export const Main = ({ onTrackClick }: { onTrackClick: (no: string, src: string) => void }) => {
  const selectedMenu = useAtomValue(selectedMenuAtom);

  return (
    <main className="relative w-full p-20 font-serif min-h-[calc(100vh-80px)]">
      <BGLogo />
      <div className="flex gap-40 items-start z-10">
        <Menu />
        
        <AnimatePresence mode="wait">
          {selectedMenu === "TLDR" && (
            <Tracks 
              key="TLDR" 
              tracks={TRACKS} 
              onTrackClick={onTrackClick} 
            />
          )}

          {selectedMenu === "externals" && (
            <External 
              key="externals"
              externals={EXTERNAL} />
          )}

          {selectedMenu === "visuals" && (
            <Visuals
              key="visuals"
              visuals={VISUALS} />
          )}

          {selectedMenu === "archive" && (
            <Archive
              key="archive" />
          )}

            <Lyrics />

        </AnimatePresence>
      </div>
    </main>
  );
};