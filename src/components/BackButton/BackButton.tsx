import { useAtom } from "jotai";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { trackIdAtom } from "@/atoms/playerAtom";
import { Button } from "@/components/ui/button";

export const BackButton = () => {
  const [selectedMenu, setSelectedMenu] = useAtom(selectedMenuAtom);
  const [playingNo, setPlayingNo] = useAtom(trackIdAtom);

  if (!selectedMenu && !playingNo) return null;

  const handleBack = () => {
    if (playingNo) {
      setPlayingNo(null);
    } else {
      setSelectedMenu(null);
    }
  };

  return (
    <Button
      variant="ghost" 
      onClick={handleBack} 
      className="md:hidden mb-6 opacity-40 flex items-center gap-2 hover:opacity-100 transition-opacity"
    >
      <span className="text-xs">←</span>
      <span className="text-[10px] tracking-widest uppercase">Back</span>
    </Button>
  );
};