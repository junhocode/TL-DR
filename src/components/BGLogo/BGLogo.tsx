import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/atoms/themeAtom";
import { isPlayingAtom } from "@/atoms/playerAtom";

export const BGLogo = () => {
    const isDark = useAtomValue(themeAtom);
    const logoSrc = isDark ? "/images/r_ryuji_white.png" : "/images/r_ryuji_black.png";

    const isPlaying = useAtomValue(isPlayingAtom);

    return (
        <div className="fixed pointer-events-none select-none z-0 right-[5%] bottom-[10%]">
            <motion.img
                src={logoSrc}
                alt="bg-logo"
                className="w-[50vw] max-w-[250px] opacity-15"
                animate={{
                    rotate: isPlaying ? 360 : -12,
                }}
                transition={{
                    rotate: isPlaying ? { repeat: Infinity, duration: 20, ease: "linear" } : { duration: 0.8 },
                }}
            />
        </div>
    )
};      