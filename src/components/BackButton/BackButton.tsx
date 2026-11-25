import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BackButton = ({ className }: { className?: string }) => {
  return (
    <Button
      onClick={() => window.history.back()}
      className={cn("md:hidden flex self-start text-smart-opacity hover:underline", className)}
    >
      ← Back
    </Button>
  );
};
