import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function SavingsGoalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-100">
      {/* Header */}
      <header className="w-full">
        <CardContent className="flex justify-between items-center py-4 px-6 max-w-4xl mx-auto">
          <Link href="/home">
            <Card className="p-2 cursor-pointer">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                <span className="font-bold">Volver</span>
              </div>
            </Card>
          </Link>

          <Card className="px-4 py-2">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600 text-2xl">💰</span>
              <span className="font-bold text-xl">1000</span>
            </div>
          </Card>
        </CardContent>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Meta de Ahorro
        </h1>

        {/* Timeline Container */}
        <div className="relative w-full max-w-xl">
          <div className="absolute left-8 h-full border-l-4 border-blue-300" />
          <div className="space-y-8">
            {/* Evento 1 */}
            <div className="flex items-start gap-4">
              <div className="w-16 flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Pequeño Tesoro</h3>
                <p className="text-sm text-gray-700">Ahorra 1200. +5000 EXP</p>
              </div>
            </div>

            {/* Evento 2 */}
            <div className="flex items-start gap-4">
              <div className="w-16 flex-shrink-0">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Aliento de Fuego</h3>
                <p className="text-sm text-gray-700">
                  Ahorra 1500 de oro. +5000 EXP
                </p>
              </div>
            </div>

            {/* Evento 3 */}
            <div className="flex items-start gap-4">
              <div className="w-16 flex-shrink-0">
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Volando los cielos</h3>
                <p className="text-sm text-gray-700">
                  Ahora 2000 de oro. +10000 EXP
                </p>
                <Progress value={50} className="mt-2 h-2" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full shadow-md py-4">
        <div className="flex justify-center gap-4 max-w-4xl mx-auto"></div>
      </footer>
    </div>
  );
}
