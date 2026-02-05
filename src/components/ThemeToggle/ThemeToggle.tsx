import { useAtom } from "jotai/react"
import { themeAtom } from "@/atoms/themeAtom";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useAtom(themeAtom);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="w-5 h-5 !bg-transparent text-foreground text-xl"
    >
      {isDark ? "\u2609" : "\u263D"}
    </Button>
  );
};