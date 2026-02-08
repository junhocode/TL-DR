import { useAtomValue } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { trackIdAtom } from "@/atoms/playerAtom";
import { Menu } from "@/components/Menu/Menu";
import { Tracks } from "@/components/Tracks/Tracks";
import { Lyrics } from "@/components/Lyrics/Lyrics";
import { External } from "@/components/External/External";
import { Visuals } from "@/components/Visuals/Visuals";
import { Archive } from "@/components/Archive/Archive";
import { BGLogo } from "@/components/BGLogo/BGLogo";
import { BackButton } from "@/components/BackButton/BackButton";
import { TRACKS } from "@/constants/tracks";
import { EXTERNAL } from "@/constants/external";
import { VISUALS } from "@/constants/visuals";
import { MENU } from "@/constants/menu";

export const Main = ({ onTrackClick }: { onTrackClick: (no: string, src: string) => void }) => {
  const selectedMenu = useAtomValue(selectedMenuAtom);
  const playingNo = useAtomValue(trackIdAtom);

  return (
    <main className="relative w-full pl-12 pr-8 md:px-20 md:py-20 font-serif min-h-[calc(100vh-80px)] overflow-hidden">
      <BGLogo />

      <div className="flex flex-col md:flex-row gap-10 md:gap-40 items-start z-10 relative">
        
        <div className={`py-10 ${selectedMenu ? "hidden md:block" : "block"}`}>
          <Menu menu={MENU} />
        </div>

        <AnimatePresence mode="wait">
          {selectedMenu && (
            <motion.div 
              key={selectedMenu}
              className={`py-10 ${playingNo ? "hidden md:block" : "block"} w-full md:w-auto`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <BackButton /> 

              {selectedMenu === "TLDR" && <Tracks tracks={TRACKS} onTrackClick={onTrackClick} />}
              {selectedMenu === "externals" && <External externals={EXTERNAL} />}
              {selectedMenu === "visuals" && <Visuals visuals={VISUALS} />}
              {selectedMenu === "archive" && <Archive />}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {playingNo && (
            <motion.div
              key="lyrics-container"
              className="block w-full md:w-auto py-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <BackButton /> 
              <Lyrics />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};