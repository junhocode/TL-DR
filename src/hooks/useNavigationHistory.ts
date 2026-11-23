import { useEffect, useRef } from "react";
import { useAtomValue, useStore } from "jotai";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { currentTrackIdAtom } from "@/atoms/playerAtom";

const GUARD = { guard: true };

export const useNavigationHistory = () => {
  const store = useStore();
  const selectedMenu = useAtomValue(selectedMenuAtom);
  const currentTrackId = useAtomValue(currentTrackIdAtom);
  const isHome = !selectedMenu && !currentTrackId;
  const hasGuard = useRef(window.history.state?.guard === true);

  useEffect(() => {
    if (!isHome && !hasGuard.current) {
      window.history.pushState(GUARD, "");
      hasGuard.current = true;
    } else if (isHome && hasGuard.current) {
      hasGuard.current = false;
      window.history.back();
    }
  }, [isHome]);

  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      hasGuard.current = e.state?.guard === true;

      if (store.get(currentTrackIdAtom)) {
        store.set(currentTrackIdAtom, null);
      } else if (store.get(selectedMenuAtom)) {
        store.set(selectedMenuAtom, null);
      }

      const isStillInside = store.get(currentTrackIdAtom) || store.get(selectedMenuAtom);
      if (isStillInside && !hasGuard.current) {
        window.history.pushState(GUARD, "");
        hasGuard.current = true;
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [store]);
};