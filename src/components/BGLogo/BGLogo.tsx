import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/atoms/themeAtom";
import { isPlayingAtom } from "@/atoms/playerAtom";

export const BGLogo = () => {
    const isDark = useAtomValue(themeAtom);
    const logoSrc = isDark ? "/images/r_ryuji_white.png" : "/images/r_ryuji_black.png";
    const isPlaying = useAtomValue(isPlayingAtom);

    return (
        <div className="fixed pointer-events-none select-none z-0 right-10 bottom-20 md:right-24 md:bottom-28">
            <motion.img
                src={logoSrc}
                alt="bg-logo"
                className="w-[150px] md:w-[200px] lg:w-[250px] opacity-15"
                animate={{
                    rotate: isPlaying ? [0, 360] : -12,
                }}
                transition={{
                    rotate: isPlaying 
                        ? { 
                            repeat: Infinity, 
                            duration: 20, 
                            ease: "linear",
                          } 
                        : { duration: 0.8 },
                }}
            />
        </div>
    )
};