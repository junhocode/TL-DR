import { Header } from "@/components/Layout/Header/Header";
import { Main } from "@/components/Layout/Main/Main";
import { Footer } from "@/components/Layout/Footer/Footer";

export const Layout = () => {
  return (
    <div className="flex flex-col bg-background transition-colors min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};