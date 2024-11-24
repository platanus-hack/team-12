"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import FooterGame from "@/components/footerGame";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      if (!audioRef.current) return;

      audioRef.current.play().catch((error) => {
        console.error("No se pudo reproducir el audio:", error);
      });
    };

    // Intentar reproducir al montar el componente
    playAudio();

    // Reintentar en caso de bloqueo por interacción
    const resumeAudio = () => {
      playAudio();
      document.removeEventListener("click", resumeAudio);
    };

    document.addEventListener("click", resumeAudio);

    return () => {
      document.removeEventListener("click", resumeAudio);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current?.pause();
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/audio/Dog Park - Silent Partner.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      {/* Botón para mutear/pausar */}
      <button
        onClick={toggleMute}
        className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50 flex items-center justify-center w-12 h-12"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>

      {children}
      <FooterGame />
    </>
  );
}
