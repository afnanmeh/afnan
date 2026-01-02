"use client";

import { useEffect } from "react";

export function PerformanceWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style");
      style.textContent = `
        * {
          -webkit-transform: translateZ(0);
          -moz-transform: translateZ(0);
          -ms-transform: translateZ(0);
          -o-transform: translateZ(0);
          transform: translateZ(0);
        }
        
        [data-motion] {
          will-change: transform, opacity;
        }
        
        canvas {
          will-change: transform;
          transform: translateZ(0);
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return <>{children}</>;
}
