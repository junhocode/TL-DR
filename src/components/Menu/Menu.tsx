import { useAtom } from "jotai";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { trackIdAtom } from "@/atoms/playerAtom";

const MENU = [
  { id: "TLDR", title: "TL;DR" },
  { id: "visuals", title: "Visuals" },
  { id: "externals", title: "Externals" },
  { id: "archive", title: "Archive" }
];

export const Menu = () => {
  const [selectedId, setSelectedId] = useAtom(selectedMenuAtom);
  const [, setPlayingNo] = useAtom(trackIdAtom);

  const handleSelect = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
    setPlayingNo(null);
  };

  return (
    <nav className="flex flex-col gap-4">
      {MENU.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelect(item.id)}
          className={`transition-all cursor-pointer hover:underline ${selectedId === item.id ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
        >
          {item.title}
        </div>
      ))}
    </nav>
  );
};