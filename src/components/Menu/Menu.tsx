import { useAtom, useSetAtom } from "jotai";
import { motion } from "motion/react";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { PAGE_TRANSITION } from "@/constants/motion";
import { MENU } from "@/constants/menu";
import { Button } from "@/components/ui/button";
import type { MenuId } from "@/types/menu.type";

export const Menu = () => {
  const [selectedId, setSelectedId] = useAtom(selectedMenuAtom);
  const setCurrentTrackId = useSetAtom(currentTrackIdAtom);

  const handleSelect = (id: MenuId) => {
    setSelectedId(selectedId === id ? null : id);
    setCurrentTrackId(null);
  };

  return (
    <motion.div {...PAGE_TRANSITION} className="flex flex-col gap-4">
      {MENU.map((item) => {
        const isActive = selectedId === item.id;

        return (
          <Button
            key={item.id}
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