"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getMissions } from "@/api/missions";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  name: string;
  description: string;
  reward_type: string;
  reward_amount: number;
  status: string;
  date_assigned: string;
  date_completed: string | null;
}

export default function FooterGame() {
  const pathname = usePathname();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchMissions() {
      try {
        const missions = await getMissions();
        setTasks(missions);
      } catch (error) {
        console.error("Failed to fetch missions:", error);
      }
    }

    fetchMissions();
  }, []);

  const missionNotifications = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  return (
    <footer className="fixed bottom-0 w-full shadow-md py-2 pt-4 bg-gray-50 z-50">
      <div className="flex justify-between gap-4 sm:gap-8 md:gap-12 max-w-4xl mx-auto px-4">
        {/* Enlace Mi Dragon */}
        <Link href="/dragon">
          <div
            className={cn(
              "cursor-pointer flex flex-col items-center transition-all",
              pathname === "/dragon" && "brightness-150 scale-110"
            )}
          >
            <Image
              src="/home.svg"
              alt="Mi Dragon"
              width={80}
              height={80}
              className="sm:w-100 sm:h-100 md:w-120 md:h-120"
            />
            <span
              className={cn(
                "text-xs sm:text-sm md:text-base font-medium",
                pathname === "/dragon" && "text-blue-600 font-bold"
              )}
            >
              Mi Dragon
            </span>
          </div>
        </Link>

        {/* Enlace Juegos */}
        <Link href="/games">
          <div
            className={cn(
              "cursor-pointer flex flex-col items-center transition-all",
              pathname === "/games" && "brightness-150 scale-110"
            )}
          >
            <Image
              src="/game.svg"
              alt="Juegos"
              width={80}
              height={80}
              className="sm:w-100 sm:h-100 md:w-120 md:h-120 mb-2"
            />
            <span
              className={cn(
                "text-xs sm:text-sm md:text-base font-medium",
                pathname === "/games" && "text-blue-600 font-bold"
              )}
            >
              Juegos
            </span>
          </div>
        </Link>

        {/* Enlace Misiones */}
        <Link href="/missions">
          <div
            className={cn(
              "relative cursor-pointer flex flex-col items-center transition-all",
              pathname === "/missions" && "brightness-150 scale-110"
            )}
          >
            <Image
              src="/misiones.svg"
              alt="Misiones"
              width={80}
              height={80}
              className="sm:w-100 sm:h-100 md:w-120 md:h-120 mb-2"
            />
            {/* Círculo flotante para notificaciones */}
            {missionNotifications > 0 && (
              <div className="absolute top-[-8px] right-[-10px] bg-red-500 text-white text-xs sm:text-sm md:text-base font-bold w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full shadow">
                {missionNotifications}
              </div>
            )}
            <span
              className={cn(
                "text-xs sm:text-sm md:text-base font-medium",
                pathname === "/missions" && "text-blue-600 font-bold"
              )}
            >
              Misiones
            </span>
          </div>
        </Link>

        {/* Enlace metas */}
        <Link href="/goals">
          <div
            className={cn(
              "cursor-pointer flex flex-col items-center transition-all",
              pathname === "/farm" && "brightness-150 scale-110"
            )}
          >
            <Image
              src="/gastos.svg"
              alt="goals"
              width={80}
              height={80}
              className="sm:w-100 sm:h-100 md:w-120 md:h-120 mb-2"
            />
            <span
              className={cn(
                "text-xs sm:text-sm md:text-base font-medium",
                pathname === "/farm" && "text-blue-600 font-bold"
              )}
            >
              Metas
            </span>
          </div>
        </Link>
      </div>
    </footer>
  );
}
