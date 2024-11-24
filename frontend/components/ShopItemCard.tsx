import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ShopItemCardProps {
  name: string;
  image?: string;
  locked: boolean;
  onSelect: () => void;
  className?: string;
}

export function ShopItemCard({
  name,
  image,
  locked,
  onSelect,
  className = "",
}: ShopItemCardProps) {
  return (
    <Card className={`overflow-hidden cursor-pointer`} onClick={onSelect}>
      <CardContent className="p-4">
        <div className="relative aspect-square mb-2">
          {image ? (
            <Image src={image} alt={name} fill className="object-contain" />
          ) : (
            <div className={`w-full h-full ${className}`} />
          )}
        </div>
        <p className="text-sm font-medium text-center">{name}</p>
        <Button className="w-full mt-2" variant="outline" disabled={locked}>
          {locked ? "No Disponible" : "Comprar"}
        </Button>
      </CardContent>
    </Card>
  );
}
