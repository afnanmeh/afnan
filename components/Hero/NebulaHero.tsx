"use client";

import { useEffect, useRef } from "react";
import classes from "./NebulaHero.module.css";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
}

export function NebulaHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const centerX = canvas.width * 0.65;
    const centerY = canvas.height * 0.5;

    const colors = [
      "#8b5cf6",
      "#a855f7",
      "#e879f9",
      "#f472b6",
      "#fb923c",
      "#fbbf24",
      "#CFFF7D"
    ];

    const particles: Particle[] = [];
    const globeRadius = Math.min(canvas.width, canvas.height) * 0.45;

    const isMobile = window.innerWidth <= 768;
    const particleCount1 = isMobile ? 600 : 1400;
    const particleCount2 = isMobile ? 200 : 500;
    const particleCount3 = isMobile ? 800 : 2500;

    for (let i = 0; i < particleCount1; i++) {
      const r = globeRadius * Math.pow(Math.random(), 2.5);

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        vx: 0,
        vy: 0,
        vz: 0,
        size: Math.random() * 1.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    for (let i = 0; i < particleCount2; i++) {
      const r = globeRadius * (0.5 + Math.random() * 0.4);

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        vx: 0,
        vy: 0,
        vz: 0,
        size: Math.random() * 1.2 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    for (let i = 0; i < particleCount3; i++) {
      const r = globeRadius * (0.9 + Math.random() * 0.1);

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particles.push({
        x,
        y,
        z,
        vx: 0,
        vy: 0,
        vz: 0,
        size: Math.random() * 1 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let rotationY = 0;
    const rotationX = Math.PI / 6;
    const rotationSpeed = -0.003;

    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const rendered: Array<{
        x: number;
        y: number;
        z: number;
        size: number;
        color: string;
        opacity: number;
      }> = [];

      rotationY += rotationSpeed;

      particles.forEach((particle) => {
        let x = particle.x;
        let y = particle.y;
        let z = particle.z;

        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        const tempZ = z * cosY - x * sinY;
        const tempX = z * sinY + x * cosY;
        z = tempZ;
        x = tempX;

        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const tempY = y * cosX - z * sinX;
        const tempZ2 = y * sinX + z * cosX;
        y = tempY;
        z = tempZ2;

        const scale = 600 / (600 + z);
        const screenX = centerX + x * scale;
        const screenY = centerY + y * scale;

        rendered.push({
          x: screenX,
          y: screenY,
          z,
          size: particle.size * scale,
          color: particle.color,
          opacity: Math.max(0.3, Math.min(0.9, scale)),
        });
      });

      rendered.sort((a, b) => a.z - b.z);

      rendered.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className={classes.canvas} />;
}
