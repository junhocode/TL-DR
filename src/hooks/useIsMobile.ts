import { useState, useEffect } from "react";

const MD_BREAKPOINT = 768;

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < MD_BREAKPOINT : false
  );

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MD_BREAKPOINT - 1}px)`);
    setIsMobile(media.matches);

    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
};