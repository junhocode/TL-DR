import { useAtomValue } from "jotai";
import { AnimatePresence } from "motion/react";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { useIsWideScreen } from "@/hooks/useIsWideScreen";
import { Menu } from "@/components/Menu/Menu";
import { MenuContent } from "@/components/MenuContent/MenuContent";
import { Lyrics } from "@/components/Lyrics/Lyrics";
import { BGLogo } from "@/components/BGLogo/BGLogo";

export const Main = () => {
  const selectedMenu = useAtomValue(selectedMenuAtom);
  const currentTrackId = useAtomValue(currentTrackIdAtom);
  const isWideScreen = useIsWideScreen();

  return (
    <main className="relative w-full px-12 md:px-20 md:pt-8 pb-16 md:pb-20 min-h-[calc(100vh-80px)] overflow-y-auto">
      <BGLogo />

      {isWideScreen ? (
        <div className="relative z-10 flex flex-row gap-40 items-start py-5">
          <div className="shrink-0">
            <Menu />
          </div>

          <AnimatePresence mode="wait">
            {selectedMenu && <MenuContent key={selectedMenu} menu={selectedMenu} />}
          </AnimatePresence>

          <Lyrics />
        </div>
      ) : (
        <div className="relative z-10 py-2">
          <AnimatePresence mode="wait">
            {currentTrackId ? (
              <Lyrics key="lyrics" />
            ) : selectedMenu ? (
              <MenuContent key={selectedMenu} menu={selectedMenu} />
            ) : (
              <Menu key="menu" />
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
};
