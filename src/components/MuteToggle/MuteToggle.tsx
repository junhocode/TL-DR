import { useAtom } from "jotai/react"
import { Volume2, VolumeOff } from "lucide-react"
import { isMutedAtom } from "@/atoms/muteAtom";
import { Button } from "@/components/ui/button";

export const MuteToggle = () => {
  const [isMuted, setIsMuted] = useAtom(isMutedAtom);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleMute}
      className="w-5 h-5 !bg-transparent text-foreground text-xl"
    >
      {isMuted ? <VolumeOff /> : <Volume2 />}
    </Button>
  );
};