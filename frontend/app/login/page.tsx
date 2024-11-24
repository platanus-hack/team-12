import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, UserCircle } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <div className="p-6 sm:p-8 lg:p-10 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-800">
            ¿Quién eres?
          </h1>
          <div className="flex flex-col gap-6">
            {/* Enlace ajustado al layout de (game) */}
            <Link href="/dragon" className="w-full">
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-4 h-16 sm:h-20 lg:h-24 text-base sm:text-lg font-semibold rounded-lg shadow-lg transition duration-300"
              >
                <UserCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                Jugador
              </Button>
            </Link>
            <Link href="/parent-dashboard" className="w-full">
              <Button
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-800 text-white flex items-center justify-center gap-4 h-16 sm:h-20 lg:h-24 text-base sm:text-lg font-semibold rounded-lg shadow-lg transition duration-300"
              >
                <User className="w-6 h-6 sm:w-8 sm:h-8" />
                Tutor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
