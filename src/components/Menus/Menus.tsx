import { useAtom, useSetAtom } from "jotai";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { trackIdAtom } from "@/atoms/playerAtom";
import { Button } from "@/components/ui/button";
import type { Menu } from "@/types/menu.type";

export const Menus = ({ menu }: { menu: Menu[] }) => {
  const [selectedId, setSelectedId] = useAtom(selectedMenuAtom);
  const setPlayingNo = useSetAtom(trackIdAtom);

  const handleSelect = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
    setPlayingNo(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {menu.map((menu) => {
        const isActive = selectedId === menu.id;

        return (
          <Button
            key={menu.id}
            variant="ghost"
            onClick={() => handleSelect(menu.id)}
            className={`
              flex justify-start group text-base hover:underline
              ${isActive ? "opacity-80" : "text-smart-opacity"}
            `}
          >
            {menu.title}
          </Button>
        );
      })}
    </div>
  );
};