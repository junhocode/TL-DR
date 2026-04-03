export type MenuId = "TLDR" | "visuals" | "externals" | "archive";

export interface MenuItem {
  id: MenuId;
  title: string;
}