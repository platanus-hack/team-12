import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DragonShopProps {
  dragon: {
    id: number;
    name: string;
    image: string;
  };
  onClose: () => void;
}

export function DragonShop({ dragon, onClose }: DragonShopProps) {
  const [currentSkin, setCurrentSkin] = useState(dragon.image);
  const skins = [
    { id: 1, image: dragon.image, name: "Default" },
    { id: 2, image: "/1.png", name: "With Hat" },
    { id: 3, image: "/1.png", name: "With Glasses" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{dragon.name} Shop</h2>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
          <div className="flex flex-col items-center mb-6">
            <Image
              src={currentSkin}
              alt={dragon.name}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {skins.map((skin) => (
              <Card
                key={skin.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setCurrentSkin(skin.image)}
              >
                <CardContent className="p-2">
                  <Image
                    src={skin.image}
                    alt={skin.name}
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
