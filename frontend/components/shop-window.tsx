"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShopItemCard } from "./ShopItemCard";

interface ShopWindowProps {
  isOpen: boolean;
  onClose: () => void;
  dragon: {
    id: number;
    name: string;
    image: string;
    unlocked: boolean;
  };
}

export function ShopWindow({ isOpen, onClose, dragon }: ShopWindowProps) {
  const [selectedColor, setSelectedColor] = useState<1 | 2 | 3>(1);
  const [selectedAccessory, setSelectedAccessory] = useState<any>(null);
  const [selectedBackground, setSelectedBackground] =
    useState<string>("bg-radial-sky");

  const dragonImage = `/dragon_1_${selectedColor}.png`;

  const accessories = [
    { id: 1, name: "Gorro Platanus", image: "/tienda_1.png", locked: false },
    { id: 2, name: "Gorro Fintual", image: "/tienda_2.png", locked: true },
    { id: 3, name: "Gorro Casual", image: "/tienda_3.png", locked: true },
  ];

  const colors = [
    { id: 1, name: "Gris", image: `/dragon_1_1.png`, locked: false },
    { id: 2, name: "Naranja", image: `/dragon_1_2.png`, locked: true },
    { id: 3, name: "Azul", image: `/dragon_1_3.png`, locked: true },
  ];

  const backgrounds = [
    {
      id: 1,
      name: "Básico",
      className: "bg-radial-sky",
      locked: false,
    },
    {
      id: 2,
      name: "Cielo Radiante",
      className: "bg-gradient-to-r from-blue-400 to-purple-500",
      locked: false,
    },
    {
      id: 3,
      name: "Atardecer",
      className: "bg-gradient-to-r from-orange-400 to-red-500",
      locked: true,
    },
    {
      id: 4,
      name: "Bosque Encantado",
      className: "bg-gradient-to-r from-green-400 to-teal-500",
      locked: true,
    },
    {
      id: 5,
      name: "Noche Estrellada",
      className: "bg-gradient-to-r from-gray-700 to-black",
      locked: true,
    },
    {
      id: 6,
      name: "Misterio",
      className:
        "bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]",
      locked: true,
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>Tienda del {dragon?.name || "Dragón"}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
          {/* Dragon Preview */}
          <div
            className={`flex flex-col items-center gap-4 p-4 rounded-lg border border-gray-400 ${selectedBackground} w-full md:w-1/2`}
          >
            <div className="relative min-w-[300px] min-h-[300px] w-full h-full">
              <Image
                src={dragonImage}
                alt={dragon?.name || "Dragón"}
                fill
                className="object-contain"
              />
              {selectedAccessory && (
                <Image
                  src={selectedAccessory.image}
                  alt={selectedAccessory.name}
                  fill
                  className="object-contain absolute top-0 left-0"
                />
              )}
            </div>
          </div>

          {/* Tabs and Content */}
          <div className="flex flex-col w-full md:w-1/2 h-full overflow-hidden">
            <Tabs defaultValue="accessories" className="flex flex-col h-full">
              {/* Tabs */}
              <TabsList className="flex-shrink-0">
                <TabsTrigger value="accessories" className="flex-1">
                  Accesorios
                </TabsTrigger>
                <TabsTrigger value="colors" className="flex-1">
                  Colores
                </TabsTrigger>
                <TabsTrigger value="backgrounds" className="flex-1">
                  Fondos
                </TabsTrigger>
              </TabsList>

              {/* Scrollable Content */}
              <div className="flex-grow overflow-y-auto p-4 max-h-[calc(90vh-12rem)]">
                <TabsContent value="accessories">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {accessories.map((item) => (
                      <ShopItemCard
                        key={item.id}
                        name={item.name}
                        image={item.image}
                        locked={item.locked}
                        onSelect={() => setSelectedAccessory(item)}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="colors">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {colors.map((color) => (
                      <ShopItemCard
                        key={color.id}
                        name={color.name}
                        image={color.image}
                        locked={color.locked}
                        onSelect={() => setSelectedColor(color.id as 1 | 2 | 3)}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="backgrounds">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {backgrounds.map((bg) => (
                      <ShopItemCard
                        key={bg.id}
                        name={bg.name}
                        className={`h-32 ${bg.className}`}
                        locked={bg.locked}
                        onSelect={() => setSelectedBackground(bg.className)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
