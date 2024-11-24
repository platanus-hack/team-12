// components/CoinCatcherGame.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FallingObject {
  x: number;
  y: number;
  width: number;
  height: number;
  type: "coin" | "bomb";
}

export default function CoinCatcherGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const playerX = useRef<number>(0);
  const objects = useRef<FallingObject[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const mouseHeld = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const footerHeight = 130; // Altura del footer
    const titleHeight = 50; // Altura del título
    const padding = 20; // Padding general

    const resizeCanvas = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calcular el tamaño disponible para el canvas
      const availableHeight =
        viewportHeight - footerHeight - titleHeight - padding * 4; // 4 * padding
      const availableWidth = viewportWidth - padding * 2;

      // Ajustar el canvas para que sea compacto y responsivo
      const canvasWidth = Math.min(400, availableWidth * 0.9); // 90% del ancho disponible o 400px
      const canvasHeight = availableHeight * 0.9; // 95% del alto disponible

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      playerX.current = (canvas.width - playerWidth()) / 2; // Centrar al jugador
    };

    const playerWidth = () => 60;
    const playerHeight = () => 60;
    const playerY = () => canvas.height - playerHeight() - 20;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const movePlayer = () => {
      const moveDistance = 5;
      if (keysPressed.current["ArrowLeft"]) {
        playerX.current -= moveDistance;
        if (playerX.current < 0) playerX.current = 0;
      }
      if (keysPressed.current["ArrowRight"]) {
        playerX.current += moveDistance;
        if (playerX.current + playerWidth() > canvas.width)
          playerX.current = canvas.width - playerWidth();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;
      e.preventDefault(); // Evitar scroll
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
      e.preventDefault(); // Evitar scroll
    };

    const handleMouseDown = () => {
      mouseHeld.current = true;
    };

    const handleMouseUp = () => {
      mouseHeld.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseHeld.current) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      playerX.current = mouseX - playerWidth() / 2;

      if (playerX.current < 0) playerX.current = 0;
      if (playerX.current + playerWidth() > canvas.width)
        playerX.current = canvas.width - playerWidth();

      e.preventDefault(); // Evitar scroll
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      playerX.current = touchX - playerWidth() / 2;
      if (playerX.current < 0) playerX.current = 0;
      if (playerX.current + playerWidth() > canvas.width)
        playerX.current = canvas.width - playerWidth();

      e.preventDefault(); // Evitar scroll
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    const spawnObject = () => {
      const type = Math.random() < 0.7 ? "coin" : "bomb";
      const size = 40;
      const x = Math.random() * (canvas.width - size);
      objects.current.push({ x, y: -size, width: size, height: size, type });
    };

    const coinImage = new Image();
    coinImage.src = "/coin.webp";

    const bombImage = new Image();
    bombImage.src = "/bomb.webp";

    const playerImage = new Image();
    playerImage.src = "/dragon_0_1.png";

    const gameLoop = () => {
      if (gameOver) return;

      movePlayer();

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar jugador
      context.drawImage(
        playerImage,
        playerX.current,
        playerY(),
        playerWidth(),
        playerHeight()
      );

      for (let i = 0; i < objects.current.length; i++) {
        const obj = objects.current[i];
        obj.y += 3;

        // Dibujar objetos
        const image = obj.type === "coin" ? coinImage : bombImage;
        context.drawImage(image, obj.x, obj.y, obj.width, obj.height);

        // Detección de colisiones
        if (
          obj.x < playerX.current + playerWidth() &&
          obj.x + obj.width > playerX.current &&
          obj.y < playerY() + playerHeight() &&
          obj.y + obj.height > playerY()
        ) {
          if (obj.type === "coin") {
            scoreRef.current += 1;
            setScore(scoreRef.current);
          } else {
            setGameOver(true);
          }
          objects.current.splice(i, 1);
          i--;
          continue;
        }

        // Remover objetos fuera de pantalla
        if (obj.y > canvas.height) {
          objects.current.splice(i, 1);
          i--;
        }
      }

      // Dibujar puntaje
      context.fillStyle = "#000000";
      context.font = "20px Arial";
      context.fillText(`Puntaje: ${scoreRef.current}`, 10, 30);

      // Generar nuevos objetos
      if (Math.random() < 0.02) {
        spawnObject();
      }

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId.current!);
    };
  }, [gameOver]);

  const resetGame = () => {
    objects.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      playerX.current = (canvas.width - 60) / 2;
    }
    scoreRef.current = 0;
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="relative w-full h-full flex justify-center items-start">
      <canvas
        ref={canvasRef}
        className="border border-gray-400 rounded-md"
        style={{
          maxWidth: "400px",
          width: "100%",
          height: "77%", // Llenar el contenedor
          touchAction: "none",
        }}
      />

      {/* Dialogo de Juego Terminado */}
      {gameOver && (
        <AlertDialog open={gameOver} onOpenChange={setGameOver}>
          <AlertDialogContent className="max-w-md p-8">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-3xl font-bold">
                ¡Juego Terminado!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-lg mt-4">
                Tu puntaje fue:{" "}
                <span className="font-bold">{scoreRef.current}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6">
              <Button
                size="lg"
                onClick={resetGame}
                className="bg-blue-500 hover:bg-blue-600 w-full"
              >
                Jugar de Nuevo
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
