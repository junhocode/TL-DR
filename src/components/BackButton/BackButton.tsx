import { useAtom, useSetAtom } from "jotai";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { trackIdAtom } from "@/atoms/playerAtom";
import { Button } from "@/components/ui/button";

export const BackButton = () => {
  const [playingNo, setPlayingNo] = useAtom(trackIdAtom);
  const setSelectedMenu = useSetAtom(selectedMenuAtom);

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
      className="md:hidden flex items-center gap-2 text-smart-opacity hover:underline"
    >
      ← Back
    </Button>
  );
};