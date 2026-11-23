import { Button } from "@/components/ui/button";

export const BackButton = () => {
  return (
    <Button
      variant="ghost"
      onClick={() => window.history.back()}
      className="md:hidden flex items-center gap-2 text-smart-opacity hover:underline"
    >
      ← Back
    </Button>
  );
};