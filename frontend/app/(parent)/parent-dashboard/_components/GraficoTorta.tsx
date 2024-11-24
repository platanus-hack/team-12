"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { ShoppingBag, Pizza, Shirt, Gift } from "lucide-react";

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

interface GraficoTortaProps {
  transacciones: Transaccion[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Ropa: <Shirt className="w-4 h-4" />,
  Comida: <Pizza className="w-4 h-4" />,
  Regalos: <Gift className="w-4 h-4" />,
  Otros: <ShoppingBag className="w-4 h-4" />,
};

export function GraficoTorta({ transacciones }: GraficoTortaProps) {
  const datosPorCategoria = transacciones.reduce((acc, transaccion) => {
    const { category } = transaccion.item;
    const total = transaccion.item.price * transaccion.quantity;
    acc[category] = (acc[category] || 0) + total;
    return acc;
  }, {} as Record<string, number>);
  const data = Object.entries(datosPorCategoria).map(([name, value]) => ({
    name,
    value,
    icon: CATEGORY_ICONS[name] || CATEGORY_ICONS["Otros"],
  }));

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <g>
        <foreignObject
          x={x - 20}
          y={y - 20}
          width={40}
          height={40}
          style={{ color: "#FFFFFF" }}
        >
          <div className="w-full h-full flex items-center justify-center">
            {CATEGORY_ICONS[name] || CATEGORY_ICONS["Otros"]}
          </div>
        </foreignObject>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          formatter={(value) => (
            <span className="flex items-center gap-2">
              {CATEGORY_ICONS[value] || CATEGORY_ICONS["Otros"]}
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
