"use client";

import { useState } from "react";
import ExpensesInput from "@/components/expensesInput";
import { CardContent } from "@/components/ui/card";
import BtnSaldo from "@/components/btnSaldo";
import BtnGastos from "@/components/btnGastos";

export default function ExpensesPage() {
  const [gold, setGold] = useState(1000);
  const [items, setItems] = useState([
    { name: "chocolate", price: 1500 },
    { name: "polera", price: 500 },
  ]);
  return (
    <div className="min-h-screen sky p-4 pt-16">
      {/* Header with title and gold amount */}
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Uso del oro</h1>
      </div>

      <div className="max-w-4xl mx-auto mb-6">
        <CardContent className="flex justify-center items-center py-4 px-6">
          <BtnGastos />
        </CardContent>
      </div>

      {/* List of purchased items */}
      <ul className="list-none mb-10">
        {items.map((item, index) => (
          <li key={index} className="flex flex-wrap">
            <span>{item.name}</span>
            <span
              className="flex-grow border-b border-dotted mx-2"
              style={{ marginTop: "0.75em" }}
            ></span>
            <span>${item.price}</span>
          </li>
        ))}
      </ul>

      <ExpensesInput setItems={setItems} />
    </div>
  );
}
