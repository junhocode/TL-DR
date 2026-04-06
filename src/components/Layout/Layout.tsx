import { Header } from "@/components/Layout/Header/Header";
import { Main } from "@/components/Layout/Main/Main";
import { Footer } from "@/components/Layout/Footer/Footer";

export const Layout = () => {
  return (
    <div className="relative w-full flex flex-col bg-background text-foreground transition-colors min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};