"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function FlappyBirdGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);

  const gameOver = useRef<boolean>(false);

  const bird = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    velocity: 0,
    gravity: 0,
    lift: 0,
  });

  const pipes = useRef<
    { x: number; y: number; width: number; height: number; passed?: boolean }[]
  >([]);
  const frameCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * 0.9 * ratio;
      canvas.height = window.innerHeight * 0.6 * ratio;
      canvas.style.width = `${window.innerWidth * 0.9}px`;
      canvas.style.height = `${window.innerHeight * 0.6}px`;
      context.scale(ratio, ratio);

      bird.current.x = canvas.width * 0.1;
      bird.current.y = canvas.height / 2;
      bird.current.width = canvas.width * 0.02;
      bird.current.height = canvas.height * 0.05;
      bird.current.gravity = canvas.height * 0.001;
      bird.current.lift = -canvas.height * 0.01;
      bird.current.velocity = 0;

      pipes.current = [];
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        bird.current.velocity = bird.current.lift;
      }
    };

    const handleTouchStart = () => {
      bird.current.velocity = bird.current.lift;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);

    const spawnPipe = () => {
      const gap = canvas.height * 0.25;
      const pipeWidth = canvas.width * 0.1;
      const pipeX = canvas.width * 1.1;
      const minPipeHeight = canvas.height * 0.1;
      const maxPipeHeight = canvas.height - gap - minPipeHeight * 5;
      const pipeHeight = Math.random() * maxPipeHeight + minPipeHeight;

      pipes.current.push({
        x: pipeX,
        y: 0,
        width: pipeWidth,
        height: pipeHeight,
        passed: false,
      });
      pipes.current.push({
        x: pipeX,
        y: pipeHeight + gap,
        width: pipeWidth,
        height: canvas.height - (pipeHeight + gap),
        passed: false,
      });
    };

    const resetGame = () => {
      gameOver.current = false;
      setScore(0);
      scoreRef.current = 0;

      bird.current.x = canvas.width * 0.1;
      bird.current.y = canvas.height / 2;
      bird.current.velocity = 0;

      pipes.current = [];
      frameCount.current = 0;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    const gameLoop = () => {
      if (gameOver.current) return;

      frameCount.current++;

      context.clearRect(0, 0, canvas.width, canvas.height);

      bird.current.velocity += bird.current.gravity;
      bird.current.y += bird.current.velocity;

      context.fillStyle = "#FFA500";
      context.fillRect(
        bird.current.x,
        bird.current.y,
        bird.current.width,
        bird.current.height
      );

      if (frameCount.current % 100 === 0) {
        spawnPipe();
      }

      for (let i = 0; i < pipes.current.length; i++) {
        const pipe = pipes.current[i];
        pipe.x -= canvas.width * 0.003;

        context.fillStyle = "#228B22";
        context.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);

        if (
          bird.current.x < pipe.x + pipe.width &&
          bird.current.x + bird.current.width > pipe.x &&
          bird.current.y < pipe.y + pipe.height &&
          bird.current.y + bird.current.height > pipe.y
        ) {
          gameOver.current = true;
          alert(`Game Over! Your score: ${Math.floor(scoreRef.current)}`);
          resetGame();
          return;
        }

        if (!pipe.passed && pipe.x + pipe.width < bird.current.x) {
          pipe.passed = true;
          scoreRef.current += 0.5;
          setScore(scoreRef.current);
        }

        if (pipe.x + pipe.width < 0) {
          pipes.current.splice(i, 1);
          i--;
        }
      }

      if (
        bird.current.y + bird.current.height > canvas.height ||
        bird.current.y < 0
      ) {
        gameOver.current = true;
        alert(`Game Over! Your score: ${Math.floor(scoreRef.current)}`);
        resetGame();
        return;
      }

      context.fillStyle = "#000000";
      context.font = `${canvas.width * 0.03}px Arial`;
      context.fillText(`Score: ${Math.floor(scoreRef.current)}`, 10, 30);

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    animationFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      cancelAnimationFrame(animationFrameId.current!);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="border" />
      <p className="text-center mt-4">Tap or Press Space to flap</p>

      {/* Buttons */}
      <div className="flex flex-col gap-4 mt-4 w-full max-w-sm">
        <Link href="/games">
          <Button
            size="lg"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Volver a Juegos
          </Button>
        </Link>
        <Link href="/dragon">
          <Button
            size="lg"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Volver a la Página Principal
          </Button>
        </Link>
      </div>
    </div>
  );
}
