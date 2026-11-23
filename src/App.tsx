import { Layout } from "@/components/Layout/Layout";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { useTheme } from "@/hooks/useTheme";

export const App = () => {
  useTheme();
  useNavigationHistory();
  useAudioPlayer();
  return <Layout />;
};