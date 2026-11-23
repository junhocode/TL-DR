import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { isMutedAtom } from "@/atoms/muteAtom";
import { TRACKS } from "@/constants/tracks";
import { audio } from "@/lib/audio";

export const useAudioPlayer = () => {
  const [currentTrackId, setCurrentTrackId] = useAtom(currentTrackIdAtom);
  const isMuted = useAtomValue(isMutedAtom);

  useEffect(() => {
    if (!currentTrackId) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      return;
    }

    const idx = TRACKS.findIndex((t) => t.id === currentTrackId);
    if (idx === -1) return;

    audio.src = TRACKS[idx].src;
    audio.onended = () => {
      const next = TRACKS[idx + 1];
      setCurrentTrackId(next ? next.id : null);
    };
    audio.onerror = () => setCurrentTrackId(null);
    audio.play().catch((e) => {
      if (e.name !== "AbortError") setCurrentTrackId(null);
    });
  }, [currentTrackId, setCurrentTrackId]);

  useEffect(() => {
    audio.muted = isMuted;
  }, [isMuted]);
};
