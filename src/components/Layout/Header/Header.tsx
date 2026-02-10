import { MuteToggle } from "@/components/MuteToggle/MuteToggle";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

export const Header = () => {
    return (
      <header className="
        w-full flex justify-end gap-3 px-4 py-4 md:p-6">
        <MuteToggle />
        <ThemeToggle />
      </header>
    );
  };
  