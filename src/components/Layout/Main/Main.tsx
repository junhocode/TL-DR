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

export const Main = () => {
  const selectedMenu = useAtomValue(selectedMenuAtom);
  const playingNo = useAtomValue(trackIdAtom);
  const isMobile = useIsMobile();

  const renderContent = () => {
    switch (selectedMenu) {
      case "TLDR": return <Tracks tracks={TRACKS} />;
      case "externals": return <LinkList items={EXTERNAL} />;
      case "visuals": return <LinkList items={VISUALS} />;
      case "archive": return <Archive archive={ARCHIVE} />;
      default: return null;
    }
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
              <div key={selectedMenu}>{renderContent()}</div>
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

          <div className={`relative ${selectedMenu === "archive" ? "flex-1 min-w-0" : "w-auto shrink-0"}`}>
            <AnimatePresence mode="wait">
              {selectedMenu && renderContent()}
            </AnimatePresence>
          </div>

          <Lyrics />
        </div>
      )}
    </main>
  );
};