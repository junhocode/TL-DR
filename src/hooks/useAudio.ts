import { useState, useRef, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";
import { isMutedAtom } from "@/atoms/muteAtom";
import { selectedMenuAtom } from "@/atoms/menuAtom";

export const useAudio = () => {
  const [trackId, setTrackId] = useAtom(trackIdAtom);
  const isMuted = useAtomValue(isMutedAtom);
  const selectedMenu = useAtomValue(selectedMenuAtom);

  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const isNotTLDR = selectedMenu !== "TLDR";
    
    if (isNotTLDR || !trackId) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (isNotTLDR && trackId !== null) {
        setTrackId(null);
      }
    }
  }, [selectedMenu, trackId, setTrackId]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTrackClick = (id: string, src: string) => {
    if (trackId === id) {
      setTrackId(null);
      return;
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(src);
    audio.muted = isMuted; 
    audioRef.current = audio;

    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.onended = () => setTrackId(null);
    audio.play();
    
    setTrackId(id);
  };

  return {
    trackId,
    duration,
    handleTrackClick,
    audio: audioRef.current
  };
};