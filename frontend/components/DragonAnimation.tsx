// components/DragonAnimation.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./DragonAnimation.module.css";

export default function DragonAnimation() {
  const [phase, setPhase] = useState<"shake" | "transition">("shake");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("transition");
    }, 1500); // Shake duration: 1.5s

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-48 h-48 sm:w-64 sm:h-64">
        {/* Shake Phase */}
        {phase === "shake" && (
          <Image
            src="/dragon_0_1.png"
            alt="Huevo de dragón"
            layout="fill"
            objectFit="contain"
            className={styles.shake}
          />
        )}

        {/* Glow + Transition Phase */}
        {phase === "transition" && (
          <>
            {/* Huevo desapareciendo */}
            <Image
              src="/dragon_0_1.png"
              alt="Huevo de dragón"
              layout="fill"
              objectFit="contain"
              className={`${styles.fadeOut}`}
            />
            {/* Dragón apareciendo */}
            <Image
              src="/dragon_1_1.png"
              alt="Dragón"
              layout="fill"
              objectFit="contain"
              className={`${styles.fadeIn} ${styles.dragonImage}`}
            />
            {/* Brillo centrado */}
            <div className={styles.glowOverlay}></div>
          </>
        )}
      </div>
    </div>
  );
}
