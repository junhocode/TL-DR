import { useAtomValue } from "jotai";
import { AnimatePresence } from "motion/react";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { trackIdAtom } from "@/atoms/playerAtom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Menu } from "@/components/Menu/Menu";
import { Tracks } from "@/components/Tracks/Tracks";
import { Lyrics } from "@/components/Lyrics/Lyrics";
import { LinkList } from "@/components/LinkList/LinkList";
import { Archive } from "@/components/Archive/Archive";
import { BGLogo } from "@/components/BGLogo/BGLogo";
import { TRACKS } from "@/constants/tracks";
import { EXTERNAL } from "@/constants/external";
import { VISUALS } from "@/constants/visuals";
import { MENU } from "@/constants/menu";
import { ARCHIVE } from "@/constants/archive";

export const Main = ({ onTrackClick }: { onTrackClick: (no: string, src: string) => void }) => {
  const selectedMenu = useAtomValue(selectedMenuAtom);
  const playingNo = useAtomValue(trackIdAtom);
  const isMobile = useIsMobile();

  const menuContent: Record<string, React.ReactNode> = {
    TLDR: <Tracks tracks={TRACKS} onTrackClick={onTrackClick} />,
    externals: <LinkList items={EXTERNAL} />,
    visuals: <LinkList items={VISUALS} />,
    archive: <Archive archive={ARCHIVE} />,
  };

  return (
  <main className="relative w-full px-12 md:px-20 md:pt-8 pb-16 md:pb-20 min-h-[calc(100vh-80px)] overflow-y-auto scrollbar-gutter-stable">
    <BGLogo />

    {isMobile ? (
      <div className="relative z-10 py-2">
        <AnimatePresence mode="wait">
          {playingNo ? (
            <Lyrics key="lyrics" />
          ) : selectedMenu ? (
            <div key={selectedMenu}>{menuContent[selectedMenu]}</div>
          ) : (
            <Menu key="menu" menu={MENU} />
          )}
        </AnimatePresence>
      </div>
    ) : (
      <div className="relative z-10 flex flex-row gap-40 items-start py-5">
        <div className="shrink-0">
          <Menu menu={MENU} />
        </div>

      <div className={`relative ${selectedMenu === "archive" ? "flex-1 min-w-0" : "w-full md:w-auto shrink-0"}`}>
        <AnimatePresence mode="wait">
          {selectedMenu && menuContent[selectedMenu]}
        </AnimatePresence>
      </div>

        <Lyrics />
      </div>
    )}
  </main>
);
};