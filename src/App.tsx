import { Layout } from "@/components/Layout/Layout";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { useTheme } from "@/hooks/useTheme";

export const App = () => {
  useTheme();
  useNavigationHistory();
  return <Layout />;
};