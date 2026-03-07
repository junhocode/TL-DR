import { atom } from "jotai";

export const selectedMenuAtom = atom<string | null>(null);

export const hasMenuAtom = atom((get) => get(selectedMenuAtom) !== null);