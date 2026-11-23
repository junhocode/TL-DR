import { useAtomValue } from "jotai";
import { AnimatePresence } from "motion/react";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { useIsWideScreen } from "@/hooks/useIsWideScreen";
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
  const currentTrackId = useAtomValue(currentTrackIdAtom);
  const isWideWindow = useIsWideScreen();

  const renderContent = () => {
    switch (selectedMenu) {
      case "TLDR": return <Tracks key="TLDR" tracks={TRACKS} />;
      case "externals": return <LinkList key="externals" items={EXTERNAL} />;
      case "visuals": return <LinkList key="visuals" items={VISUALS} />;
      case "archive": return <Archive key="archive" archive={ARCHIVE} />;
      default: return null;
    }
  };

  return (
    <main className="relative w-full px-12 md:px-20 md:pt-8 pb-16 md:pb-20 min-h-[calc(100vh-80px)] overflow-y-auto">
      <BGLogo />

      {isWideWindow ? (
        <div className="relative z-10 flex flex-row gap-40 items-start py-5">
          <div className="shrink-0">
            <Menu menu={MENU} />
          </div>

          <AnimatePresence mode="wait">
            {selectedMenu && renderContent()}
          </AnimatePresence>

          <Lyrics />
        </div>
      ) : (
        <div className="relative z-10 py-2">
          <AnimatePresence mode="wait">
            {currentTrackId ? (
              <Lyrics key="lyrics" />
            ) : selectedMenu ? (
              renderContent()
            ) : (
              <Menu key="menu" menu={MENU} />
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
};