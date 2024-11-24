import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  p-4">
      <div className="w-full max-w-md">
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-64 h-64">
            <Image
              src="/1.png"
              alt="Mascota del juego"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
            ¡Bienvenido a Little Dragons!
          </h1>
          <p className="text-center mb-8 text-gray-800">
            Un juego educativo y divertido donde aprenderás sobre el ahorro y
            las finanzas mientras cuidas a tu propio dragoncito.
          </p>
          <Link href="/login" className="w-full">
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-800 text-white flex items-center justify-center gap-4 h-24 text-lg font-bold rounded-lg shadow-lg"
            >
              ¡Comenzar la Aventura!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
