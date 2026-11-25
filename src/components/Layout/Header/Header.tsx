import { MuteToggle } from "@/components/MuteToggle/MuteToggle";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

export const Header = () => {
  return (
    <header className="flex justify-end gap-3 p-4 md:p-6">
      <MuteToggle />
      <ThemeToggle />
    </header>
  );
};
