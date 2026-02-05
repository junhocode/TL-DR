import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { trackIdAtom } from "@/atoms/playerAtom";

interface Track {
  id: string;
  title: string;
  src: string;
}

interface TrackMenuProps {
  tracks: Track[];
  onTrackClick: (id: string, src: string) => void;
}

export const TRACKS: Track[] = [
  { id: "01", title: "happy halloween!", src: "/tracks/happyHalloween.wav" },
  { id: "02", title: "neon", src: "/tracks/neon.wav" },
  { id: "03", title: "supernova", src: "/tracks/supernova.wav" },
  { id: "04", title: "neverlast", src: "/tracks/neverlast.wav" },
  { id: "05", title: "0330", src: "/tracks/0330.wav" },
];

export const Tracks = ({ tracks, onTrackClick }: TrackMenuProps) => {
  const trackId = useAtomValue(trackIdAtom);

  return (
    <ul className="flex flex-col gap-2">
      {tracks.map((track, index) => (
        <motion.li 
          key={track.id}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onTrackClick(track.id, track.src)}
          className={`group flex gap-8 cursor-pointer transition-all  ${
            trackId === track.id ? "text-primary" : "opacity-80 hover:opacity-100"
          }`}
        >
          <span className={`w-6 transition-opacity ${trackId === track.id ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}>
            {track.id}
          </span>
          <span className={`transition-opacity group-hover:underline tracking-tight ${trackId === track.id ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}>
            {track.title}
          </span>
        </motion.li>
      ))}
    </ul>
  );
};