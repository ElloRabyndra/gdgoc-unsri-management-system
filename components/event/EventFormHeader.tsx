import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventFormHeaderProps {
  title: string;
  description: string;
  onBack: () => void;
}

export function EventFormHeader({
  title,
  description,
  onBack,
}: EventFormHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
