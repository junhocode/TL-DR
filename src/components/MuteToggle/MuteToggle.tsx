import { useAtom } from "jotai";
import { Volume2, VolumeOff } from "lucide-react";
import { isMutedAtom } from "@/atoms/muteAtom";
import { Button } from "@/components/ui/button";

export const MuteToggle = () => {
  const [isMuted, setIsMuted] = useAtom(isMutedAtom);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <Button
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute" : "Mute"}
      className="w-5 h-5 !bg-transparent text-foreground text-xl"
    >
      {isMuted ? <VolumeOff /> : <Volume2 />}
    </Button>
  );
};
