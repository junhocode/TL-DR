import type { ReactNode } from "react";
import { Tracks } from "@/components/Tracks/Tracks";
import { LinkList } from "@/components/LinkList/LinkList";
import { Archive } from "@/components/Archive/Archive";
import { EXTERNAL } from "@/constants/external";
import { VISUALS } from "@/constants/visuals";
import type { MenuId } from "@/types/menu.type";

const CONTENT: Record<MenuId, ReactNode> = {
  TLDR: <Tracks />,
  externals: <LinkList items={EXTERNAL} />,
  visuals: <LinkList items={VISUALS} />,
  archive: <Archive />,
};

export const MenuContent = ({ menu }: { menu: MenuId }) => CONTENT[menu];
