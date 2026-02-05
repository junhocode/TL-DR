import { MuteToggle } from "@/components/MuteToggle/MuteToggle";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

export const Header = () => {
    return (
        <header className="w-full flex justify-end p-6 gap-3">
            <MuteToggle />
            <ThemeToggle />
        </header>
    );
};