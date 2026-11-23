import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { currentTrackIdAtom } from "@/atoms/playerAtom";

export const useNavigationHistory = () => {
  const [selectedMenu, setSelectedMenu] = useAtom(selectedMenuAtom);
  const [currentTrackId, setCurrentTrackId] = useAtom(currentTrackIdAtom);
  const isPopState = useRef(false);

  useEffect(() => {
    if (isPopState.current) {
      isPopState.current = false;
      return;
    }

    if (selectedMenu || currentTrackId) {
      window.history.pushState({ menu: selectedMenu, track: currentTrackId }, "");
    }
  }, [selectedMenu, currentTrackId]);

  useEffect(() => {
    const handlePopState = () => {
      isPopState.current = true;

      if (currentTrackId) {
        setCurrentTrackId(null);
      } else if (selectedMenu) {
        setSelectedMenu(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedMenu, currentTrackId, setSelectedMenu, setCurrentTrackId]);
};