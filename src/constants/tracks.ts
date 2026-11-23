import type { Track } from "@/types/track.type";
import happyHalloween from "@/assets/tracks/happyHalloween.m4a";
import neon from "@/assets/tracks/neon.m4a";
import supernova from "@/assets/tracks/supernova.m4a";
import neverlast from "@/assets/tracks/neverlast.m4a";
import track0330 from "@/assets/tracks/0330.m4a";
import happyHalloweenLyrics from "@/assets/lyrics/happyHalloween.txt?raw";
import neonLyrics from "@/assets/lyrics/neon.txt?raw";
import supernovaLyrics from "@/assets/lyrics/supernova.txt?raw";
import neverlastLyrics from "@/assets/lyrics/neverlast.txt?raw";
import lyrics0330 from "@/assets/lyrics/0330.txt?raw";

export const TRACKS: Track[] = [
  { id: "01", title: "happy halloween!", src: happyHalloween, lyrics: happyHalloweenLyrics },
  { id: "02", title: "neon", src: neon, lyrics: neonLyrics },
  { id: "03", title: "supernova", src: supernova, lyrics: supernovaLyrics },
  { id: "04", title: "neverlast", src: neverlast, lyrics: neverlastLyrics },
  { id: "05", title: "0330", src: track0330, lyrics: lyrics0330 }
];
