"use client";

import React, { useState, useEffect } from "react";
import { ConfiguracionMesada } from "./_components/ConfiguracionMesada";
import { IconoActualizacion } from "./_components/IconoActualizacion";
import { TablaTransacciones } from "./_components/TablaTransacciones";
import { GraficoTorta } from "./_components/GraficoTorta";
import { PromediosCategorias } from "./_components/PromediosCategorias";
import { getInventory } from "@/api/inventories";

export default function ParentDashboardPage() {
  const [mesada, setMesada] = useState<number | null>(null);
  const [mostrarActualizacion, setMostrarActualizacion] = useState(false);
  const [transacciones, setTransacciones] = useState<any[]>([]);

  const handleConfiguracionMesada = (nuevaMesada: number) => {
    setMesada(nuevaMesada);
    setMostrarActualizacion(true);
  };

  useEffect(() => {
    const cargarTransacciones = async () => {
      try {
        const data = await getInventory();
        setTransacciones(data);
      } catch (error) {
        console.error("Error al cargar transacciones:", error);
      }
    };

    cargarTransacciones();
  }, []);

  useEffect(() => {
    if (mostrarActualizacion) {
      const timer = setTimeout(() => {
        setMostrarActualizacion(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [mostrarActualizacion]);

  return (
    <>
      {mesada === null ? (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Configurar Mesada
          </h2>
          <ConfiguracionMesada onSubmit={handleConfiguracionMesada} />
        </div>
      ) : mostrarActualizacion ? (
        <IconoActualizacion />
      ) : (
        <div className="space-y-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Resumen</h2>
            <p className="text-lg">
              Mesada configurada: <span className="font-bold">${mesada}</span>
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Transacciones</h2>
              <TablaTransacciones transacciones={transacciones} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Gastos por Categoría
              </h2>
              <GraficoTorta transacciones={transacciones} />
              <PromediosCategorias transacciones={transacciones} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
