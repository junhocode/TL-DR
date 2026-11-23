import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { isMutedAtom } from "@/atoms/muteAtom";
import { TRACKS } from "@/constants/tracks";
import { audio } from "@/lib/audio";

export const useAudioPlayer = () => {
  const [trackId, setTrackId] = useAtom(trackIdAtom);
  const isMuted = useAtomValue(isMutedAtom);

  useEffect(() => {
    if (!trackId) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      return;
    }

    const idx = TRACKS.findIndex((t) => t.id === trackId);
    if (idx === -1) return;

    audio.src = TRACKS[idx].src;
    audio.onended = () => {
      const next = TRACKS[idx + 1];
      setTrackId(next ? next.id : null);
    };
    audio.play();
  }, [trackId, setTrackId]);

  useEffect(() => {
    audio.muted = isMuted;
  }, [isMuted]);
};
