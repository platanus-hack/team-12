"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

export function IconoActualizacion() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-80 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <p className="text-xl font-semibold text-gray-800">¡Actualizado!</p>
      </div>
    </div>
  );
}
