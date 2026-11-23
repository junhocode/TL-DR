import { useSyncExternalStore } from "react";

const mdQuery = window.matchMedia("(min-width: 48rem)");

const subscribe = (onChange: () => void) => {
  mdQuery.addEventListener("change", onChange);
  return () => mdQuery.removeEventListener("change", onChange);
};

const getSnapshot = () => mdQuery.matches;

export const useIsWideScreen = () => useSyncExternalStore(subscribe, getSnapshot);
