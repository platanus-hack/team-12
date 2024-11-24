"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LastExpenses() {
  const items = [
    { name: "chocolate", price: 1500 },
    { name: "polera", price: 500 },
  ];

  return (
    <div className="w-full px-4 mt-2">
      <div className="bg-white rounded-md shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800">Últimos gastos</h2>
          <Link href="/expenses">
            <Button className="text-sm font-semibold px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md">
              + Agregar gastos
            </Button>
          </Link>
        </div>
        <ul className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between py-2 text-gray-700">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
