import { useAtom, useSetAtom } from "jotai";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { Button } from "@/components/ui/button";

export const BackButton = () => {
  const [currentTrackId, setCurrentTrackId] = useAtom(currentTrackIdAtom);
  const setSelectedMenu = useSetAtom(selectedMenuAtom);

  const handleBack = () => {
    if (currentTrackId) {
      setCurrentTrackId(null);
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