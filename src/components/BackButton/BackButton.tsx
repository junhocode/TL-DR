import { useAtomValue, useSetAtom } from "jotai";
import { hasMenuAtom, selectedMenuAtom } from "@/atoms/menuAtom";
import { isPlayingAtom, trackIdAtom } from "@/atoms/playerAtom";
import { Button } from "@/components/ui/button";

export const BackButton = () => {
  const hasMenu = useAtomValue(hasMenuAtom);
  const isPlaying = useAtomValue(isPlayingAtom);

  const setSelectedMenu = useSetAtom(selectedMenuAtom);
  const setPlayingNo = useSetAtom(trackIdAtom);

  const isVisible = hasMenu && !isPlaying

  if (!isVisible) return null;

  const handleBack = () => {
    if (isPlaying) {
      setPlayingNo(null);
    } else {
      setSelectedMenu(null);
    }
  }

  return (
    <Button
      variant="ghost" 
      onClick={handleBack}
      aria-label="Back Button" 
      className="md:hidden mb-6 flex items-center gap-2 text-smart-opacity hover:underline"
    >
      <span >← Back</span>
    </Button>
  );
}