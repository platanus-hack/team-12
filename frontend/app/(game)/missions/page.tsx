"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { getMissions } from "@/api/missions";
import { switchMissionStatus } from "@/api/missions";
import { updateAllowance, getAllowance } from "@/api/allowances";
import DragonAnimation from "@/components/DragonAnimation";

const ALLOWANCE_ID = 1;

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

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    async function fetchAllowance() {
      try {
        const data = await getAllowance();
        if (data.amount > 1150) {
          const animationShown = localStorage.getItem("animationShown");
          if (!animationShown) {
            setShowAnimation(true);
            localStorage.setItem("animationShown", "true");
            console.log("Allowance amount:", data.amount);
          }
        }
      } catch (error) {
        console.error("Failed to fetch allowance", error);
      }
    }

    fetchAllowance();
  }, []);

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

  useEffect(() => {
    if (tasks.length > 0) {
      setLoading(false);
    }
  }, [tasks]);

  const totalReward = tasks.reduce(
    (sum, task) =>
      task.status === "completed" ? sum + task.reward_amount : sum,
    0
  );

  const maxReward = tasks.reduce((sum, task) => sum + task.reward_amount, 0);

  const handleToggleStatus = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    // Cambiar estado local inmediatamente
    const newStatus = task.status === "completed" ? "pending" : "completed";

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    try {
      // Realizar la petición al servidor para actualizar el estado
      await switchMissionStatus(id);

      const action = newStatus === "completed" ? "add" : "subtract";
      const amount = task.reward_amount;

      await updateAllowance(ALLOWANCE_ID, amount, action);

      // Consultar el allowance actualizado
      const allowanceData = await getAllowance();
      console.log("Updated Allowance Amount:", allowanceData.amount);
      if (allowanceData.amount > 1200) {
        const animationShown = localStorage.getItem("animationShown");
        if (!animationShown) {
          setShowAnimation(true);
          localStorage.setItem("animationShown", "true");
        }
      }
    } catch (error) {
      console.error("Failed to update task or allowance:", error);

      // Revertir el estado local en caso de error
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: task.status } : task
        )
      );
    }
  };

  if (showAnimation) {
    return <DragonAnimation />;
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Tareas del Día</h1>
        <p className="text-lg text-center">Cargando tareas...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Tareas del Día</h1>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold">Recompensas del Día</span>
          <span className="text-lg font-semibold">
            ${totalReward}/${maxReward}
          </span>
        </div>
        <div className="flex items-center justify-center">
          {Array.from({ length: tasks.length }).map((_, index) => (
            <svg
              key={index}
              className={`w-8 h-8 mx-1 transition-transform hover:scale-110 ${
                index <
                tasks.filter((task) => task.status === "completed").length
                  ? "text-yellow-400 drop-shadow-lg animate-pulse"
                  : "text-gray-300"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-40">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-start border p-4 rounded-md shadow-sm transition-shadow ${
              task.status === "completed"
                ? "bg-green-50 line-through"
                : "bg-white"
            } hover:shadow-md`}
          >
            <div className="transition-all duration-200 group">
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600">
                {task.name}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-800">
                {task.description}
              </p>
              <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-700">
                Recompensa: ${task.reward_amount}
              </p>
            </div>
            <button
              onClick={() => handleToggleStatus(task.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                task.status === "completed"
                  ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {task.status === "completed" ? "Deshacer" : "Completar"}
            </button>
          </div>
        ))}
      </div>

      {totalReward === maxReward && (
        <div className="mt-8 text-center">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-green-600 mb-40">
            ¡Felicidades! Has completado todas las tareas del día.
          </h2>
        </div>
      )}
    </div>
  );
}
