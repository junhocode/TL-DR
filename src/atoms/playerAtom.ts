import { atom } from "jotai";

export const trackIdAtom = atom<string | null>(null);

export const isPlayingAtom = atom((get) => get(trackIdAtom) !== null);