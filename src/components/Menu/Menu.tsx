import { useAtom, useSetAtom } from "jotai";
import { motion } from "motion/react";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { trackIdAtom } from "@/atoms/playerAtom";
import { PAGE_TRANSITION } from "@/constants/motion";
import { Button } from "@/components/ui/button";
import type { MenuId, MenuItem } from "@/types/menu.type";

export const Menu = ({ menu }: { menu: MenuItem[] }) => {
  const [selectedId, setSelectedId] = useAtom(selectedMenuAtom);
  const setPlayingNo = useSetAtom(trackIdAtom);

  const handleSelect = (id: MenuId) => {
    setSelectedId(selectedId === id ? null : id);
    setPlayingNo(null);
  };

  return (
    <motion.div {...PAGE_TRANSITION} className="flex flex-col gap-4">
      {menu.map((item) => {
        const isActive = selectedId === item.id;

        return (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => handleSelect(item.id)}
            className={`
              flex justify-start group text-base hover:underline
              ${isActive ? "opacity-80" : "text-smart-opacity"}
            `}
          >
            {item.title}
          </Button>
        );
      })}
    </motion.div>
  );
};