import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage(
  "dark",
  window.matchMedia("(prefers-color-scheme: dark)").matches,
  undefined,
  { getOnInit: true },
);
