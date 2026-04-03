import { atom } from "jotai";
import type { MenuId } from "@/types/menu.type";

export const selectedMenuAtom = atom<MenuId | null>(null);