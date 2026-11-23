import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage("dark", false, undefined, { getOnInit: true });
