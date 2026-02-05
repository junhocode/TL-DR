import { atomWithStorage } from "jotai/utils";

export const isMutedAtom = atomWithStorage("muted", false);