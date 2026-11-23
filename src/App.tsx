import { Layout } from "@/components/Layout/Layout";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { useTheme } from "@/hooks/useTheme";

const AppEffects = () => {
  useTheme();
  useNavigationHistory();
  useAudioPlayer();
  return null;
};

export const App = () => {
  return (
    <>
      <AppEffects />
      <Layout />
    </>
  );
};
