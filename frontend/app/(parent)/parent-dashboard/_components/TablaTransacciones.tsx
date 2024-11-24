"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

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

interface TablaTransaccionesProps {
  transacciones: Transaccion[];
}

export function TablaTransacciones({ transacciones }: TablaTransaccionesProps) {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transacciones.map((transaccion) => (
              <TableRow key={transaccion.id}>
                <TableCell>{transaccion.item.name}</TableCell>
                <TableCell>{transaccion.item.category}</TableCell>
                <TableCell>${transaccion.item.price}</TableCell>
                <TableCell>{transaccion.quantity}</TableCell>
                <TableCell>
                  ${transaccion.item.price * transaccion.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="md:hidden grid gap-2">
        {transacciones.map((transaccion) => (
          <Card key={transaccion.id} className="bg-white shadow-sm">
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-1 text-sm">
                <h3 className="font-semibold col-span-2 text-base mb-1">
                  {transaccion.item.name}
                </h3>
                <span className="text-gray-600">Categoría:</span>
                <span>{transaccion.item.category}</span>
                <span className="text-gray-600">Precio:</span>
                <span>${transaccion.item.price}</span>
                <span className="text-gray-600">Cantidad:</span>
                <span>{transaccion.quantity}</span>
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold">
                  ${transaccion.item.price * transaccion.quantity}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
