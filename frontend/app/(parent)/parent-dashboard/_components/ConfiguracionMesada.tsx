"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ConfiguracionMesadaProps {
  onSubmit: (mesada: number) => void;
}

export function ConfiguracionMesada({ onSubmit }: ConfiguracionMesadaProps) {
  const [mesada, setMesada] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(Number(mesada));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label
          htmlFor="mesada"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Mesada del niño
        </label>
        <Input
          type="number"
          id="mesada"
          value={mesada}
          onChange={(e) => setMesada(e.target.value)}
          placeholder="Ingrese la cantidad de la mesada"
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">
        Configurar
      </Button>
    </form>
  );
}
