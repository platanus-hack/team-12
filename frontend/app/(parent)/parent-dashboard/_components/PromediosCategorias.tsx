"use client";

import { useMemo } from "react";

interface Transaccion {
  id: number;
  item: {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
  };
  quantity: number;
}

interface PromediosCategoriasProps {
  transacciones: Transaccion[];
}

export function PromediosCategorias({
  transacciones,
}: PromediosCategoriasProps) {
  const estadisticasPorCategoria = useMemo(() => {
    const stats: Record<
      string,
      { total: number; cantidad: number; promedio: number }
    > = {};

    transacciones.forEach((transaccion) => {
      const { category } = transaccion.item;
      const total = transaccion.item.price * transaccion.quantity;

      if (!stats[category]) {
        stats[category] = { total: 0, cantidad: 0, promedio: 0 };
      }

      stats[category].total += total;
      stats[category].cantidad += 1;
      stats[category].promedio =
        stats[category].total / stats[category].cantidad;
    });

    return stats;
  }, [transacciones]);

  return (
    <div className="mt-4 space-y-3">
      <h3 className="text-lg font-semibold">Promedios por Categoría</h3>
      {Object.entries(estadisticasPorCategoria).map(([categoria, stats]) => (
        <div
          key={categoria}
          className="flex justify-between items-center bg-gray-50 p-2 rounded hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium">{categoria}</span>
          <div className="text-right">
            <p className="font-semibold">${stats.promedio.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
