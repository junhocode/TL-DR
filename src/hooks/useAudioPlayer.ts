import { useState, useRef, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { isMutedAtom } from "@/atoms/muteAtom";
import { TRACKS } from "@/constants/tracks";

export const useAudioPlayer = () => {
  const [trackId, setTrackId] = useAtom(trackIdAtom);
  const isMuted = useAtomValue(isMutedAtom);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!trackId) {
      audioRef.current?.pause();
      audioRef.current = null;
      setAudio(null);
      return;
    }

    const track = TRACKS.find((t) => t.id === trackId);
    if (!track) return;

    audioRef.current?.pause();
    const newAudio = new Audio(track.src);
    newAudio.muted = isMuted;
    audioRef.current = newAudio;
    setAudio(newAudio);

    newAudio.onloadedmetadata = () => setDuration(newAudio.duration);
    newAudio.onended = () => {
      const idx = TRACKS.findIndex((t) => t.id === trackId);
      const next = TRACKS[idx + 1];
      setTrackId(next ? next.id : null);
    };

    newAudio.play();
  }, [trackId]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  return { audio, duration };
};