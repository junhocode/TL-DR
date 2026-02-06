import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { themeAtom } from "@/atoms/themeAtom";
import { Header } from "@/components/Layout/Header/Header";
import { Main } from "@/components/Layout/Main/Main";
import { Footer } from "@/components/Layout/Footer/Footer";
import { useAudio } from "@/hooks/useAudio"; 

export const Layout = () => {
  const isDark = useAtomValue(themeAtom);
  
  const { trackId, duration, handleTrackClick, audio } = useAudio();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  return (
    <div className="w-full flex flex-col min-h-screen bg-background text-foreground transition-colors">
      <Header />
      
      <main className="flex-1">
        <Main onTrackClick={handleTrackClick} />
      </main>

      <Footer 
        audio={audio}
        isPlaying={!!trackId}
        duration={duration}
      />
    </div>
  );
};