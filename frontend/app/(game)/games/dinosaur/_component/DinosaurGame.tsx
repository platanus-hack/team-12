/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DinosaurGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const dinoY = useRef<number>(0);
  const dinoVelocity = useRef<number>(0);
  const obstacleX = useRef<number>(0);
  const [gameOverState, setGameOverState] = useState(false);
  const [score, setScore] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const gravity = 0.6;
  const jumpStrength = 18;
  const gameSpeed = useRef<number>(6);

  const dinoImage = useRef<HTMLImageElement | null>(null);
  const obstacleImage = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Crear instancias de imágenes solo en el cliente
    dinoImage.current = new Image();
    obstacleImage.current = new Image();

    const loadImages = async () => {
      await Promise.all([
        new Promise<void>((resolve) => {
          dinoImage.current!.src = "/dragon_3_1.png";
          dinoImage.current!.onload = () => resolve();
        }),
        new Promise<void>((resolve) => {
          obstacleImage.current!.src = "/moai.webp";
          obstacleImage.current!.onload = () => resolve();
        }),
      ]);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  const startGameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const groundY = canvas.height - canvas.height * 0.1;

    const gameLoop = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      gameSpeed.current = canvas.width / 60;

      // Dibujar suelo
      context.fillStyle = "#808080";
      context.fillRect(0, groundY, canvas.width, canvas.height - groundY);

      // Actualizar posición del dragón
      dinoVelocity.current -= gravity;
      dinoY.current += dinoVelocity.current;

      if (dinoY.current < 0) {
        dinoY.current = 0;
        dinoVelocity.current = 0;
      }

      const dinoWidth = canvas.width * 0.2;
      const dinoHeight = canvas.height * 0.4;
      const dinoX = canvas.width * 0.1;
      const dinoYPos = groundY - dinoHeight - dinoY.current;

      // Dibujar dragón
      context.drawImage(
        dinoImage.current!,
        dinoX,
        dinoYPos,
        dinoWidth,
        dinoHeight
      );

      // Actualizar posición del moai
      obstacleX.current -= gameSpeed.current;

      const obstacleWidth = canvas.width * 0.2;
      const obstacleHeight = canvas.height * 0.25;

      // Dibujar moai
      context.drawImage(
        obstacleImage.current!,
        obstacleX.current,
        groundY - obstacleHeight,
        obstacleWidth,
        obstacleHeight
      );

      // Detección de colisión
      const dinoRect = {
        x: dinoX,
        y: dinoYPos,
        width: dinoWidth,
        height: dinoHeight,
      };

      const obstacleRect = {
        x: obstacleX.current,
        y: groundY - obstacleHeight,
        width: obstacleWidth,
        height: obstacleHeight,
      };

      if (isColliding(dinoRect, obstacleRect)) {
        setGameOverState(true);
        return;
      }

      // Reiniciar obstáculo cuando sale de la pantalla
      if (obstacleX.current < -obstacleWidth) {
        obstacleX.current = canvas.width + Math.random() * 500 + 100;
        setScore((prev) => prev + 1);
      }

      // Dibujar puntaje
      context.fillStyle = "#000000";
      context.font = `${canvas.height * 0.08}px Arial`;
      context.fillText(`Puntaje: ${score}`, 10, 40);

      if (!gameOverState) {
        animationFrameId.current = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();
  }, [imagesLoaded, score, gameOverState]);

  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const containerWidth = Math.min(window.innerWidth * 0.9, 360);
      const aspectRatio = 5 / 3;
      canvas.width = containerWidth;
      canvas.height = containerWidth * aspectRatio;

      obstacleX.current = canvas.width + Math.random() * 500 + 100;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleJump = () => {
      if (dinoY.current === 0 && !gameOverState) {
        dinoVelocity.current = jumpStrength;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        handleJump();
      }
    };

    const handleTouchStart = () => {
      handleJump();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);

    startGameLoop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [imagesLoaded, startGameLoop, gameOverState]);

  const resetGame = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      dinoY.current = 0;
      dinoVelocity.current = 0;
      obstacleX.current = canvas.width + Math.random() * 500 + 100;
      setScore(0);
      setGameOverState(false);
      startGameLoop();
    }
  };

  const isColliding = (
    rect1: { x: number; y: number; width: number; height: number },
    rect2: { x: number; y: number; width: number; height: number }
  ) => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <canvas
        ref={canvasRef}
        className="w-full h-auto border border-gray-400 rounded-md"
      />
      <p className="text-center mt-4 text-sm text-gray-600">
        Toca o Presiona Espacio/Flecha Arriba para Saltar
      </p>

      {gameOverState && (
        <AlertDialog open={gameOverState} onOpenChange={setGameOverState}>
          <AlertDialogContent className="max-w-sm p-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold">
                ¡Juego Terminado!
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-lg">
                Tu puntaje fue: <span className="font-semibold">{score}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={resetGame}>Reiniciar</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
