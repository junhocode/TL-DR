import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { trackIdAtom } from "@/atoms/playerAtom";

export const useNavigationHistory = () => {
  const [selectedMenu, setSelectedMenu] = useAtom(selectedMenuAtom);
  const [trackId, setTrackId] = useAtom(trackIdAtom);
  const isPopState = useRef(false);

  useEffect(() => {
    if (isPopState.current) {
      isPopState.current = false;
      return;
    }

    if (selectedMenu || trackId) {
      window.history.pushState({ menu: selectedMenu, track: trackId }, "");
    }
  }, [selectedMenu, trackId]);

  useEffect(() => {
    const handlePopState = () => {
      isPopState.current = true;

      if (trackId) {
        setTrackId(null);
      } else if (selectedMenu) {
        setSelectedMenu(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedMenu, trackId, setSelectedMenu, setTrackId]);
};