"use client";

import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import BtnSaldo from "@/components/btnSaldo";
import GoalProgressBar from "@/components/goal-progress-bar";
import LastExpenses from "@/components/last-expenses";
import { useState, useEffect } from "react";
import dragonVoice from "@/components/dragonVoice";
import { getAllowance } from "@/api/allowances";

export default function DragonPage() {
  const [isShaking, setIsShaking] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [allowance, setAllowance] = useState(0);

  useEffect(() => {
    getAllowance().then((data) => setAllowance(data.amount));
  }, []);

  const handleMascotPressStart = () => {
    setIsShaking(true);
  };

  const handleMascotPressEnd = () => {
    setIsShaking(false);
  };

  useEffect(() => {
    const jumpInterval = setInterval(() => {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 1500); // Saltito suave de 1.5 segundos
    }, 8000); // Salta cada 8 segundos
    return () => clearInterval(jumpInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-36">
      {/* Header */}
      <header className="w-full px-4 pt-4">
        <div className="max-w-4xl mx-auto mb-6">
          <CardContent className="flex justify-center items-center py-4 px-6">
            <BtnSaldo />
          </CardContent>
        </div>
        <GoalProgressBar progress={(allowance / 4000) * 100} />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 gap-8">
        {/* Mascota */}
        <div
          className={`relative w-52 h-52 mt-6 sm:w-64 sm:h-64 ${
            isShaking ? "animate-shake" : isJumping ? "animate-bounce-slow" : ""
          } transition-transform duration-150`}
          onMouseDown={handleMascotPressStart}
          onMouseUp={handleMascotPressEnd}
          onTouchStart={handleMascotPressStart}
          onTouchEnd={handleMascotPressEnd}
        >
          <Image
            src="/dragon_0_1.png"
            alt="Mascota del juego"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {dragonVoice()}
      </main>

      {/* Últimos gastos */}
      <LastExpenses />
    </div>
  );
}
