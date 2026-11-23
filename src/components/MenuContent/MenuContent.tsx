import { Tracks } from "@/components/Tracks/Tracks";
import { LinkList } from "@/components/LinkList/LinkList";
import { Archive } from "@/components/Archive/Archive";
import { EXTERNAL } from "@/constants/external";
import { VISUALS } from "@/constants/visuals";
import type { MenuId } from "@/types/menu.type";

export const MenuContent = ({ menu }: { menu: MenuId }) => {
  switch (menu) {
    case "TLDR": return <Tracks />;
    case "externals": return <LinkList items={EXTERNAL} />;
    case "visuals": return <LinkList items={VISUALS} />;
    case "archive": return <Archive />;
  }
};
