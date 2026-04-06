import { useState, useRef, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { isMutedAtom } from "@/atoms/muteAtom";
import { TRACKS } from "@/constants/tracks";

export const useAudioPlayer = () => {
  const [trackId, setTrackId] = useAtom(trackIdAtom);
  const isMuted = useAtomValue(isMutedAtom);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!trackId) {
      audioRef.current?.pause();
      return;
    }

    const track = TRACKS.find((t) => t.id === trackId);
    if (!track) return;

    audioRef.current?.pause();
    const audio = new Audio(track.src);
    audio.muted = isMuted;
    audioRef.current = audio;

    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.onended = () => {
      const idx = TRACKS.findIndex((t) => t.id === trackId);
      const next = TRACKS[idx + 1];
      setTrackId(next ? next.id : null);
    };

    audio.play();
  }, [trackId]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  return { audio: audioRef.current, duration };
};