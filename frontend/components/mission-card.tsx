import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";

interface MissionCardProps {
  title: string;
  points: number;
  completed: boolean;
  onComplete: () => void;
}

export function MissionCard({
  title,
  points,
  completed,
  onComplete,
}: MissionCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${
        completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onComplete}
            className={`${
              completed ? "text-green-500" : "text-gray-400"
            } hover:text-green-600`}
          >
            {completed ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </Button>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{points} puntos</p>
          </div>
        </div>
        {!completed && (
          <Button onClick={onComplete} variant="outline" size="sm">
            ¡Completar!
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
