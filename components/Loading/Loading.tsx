"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import classes from "./Loading.module.css";

interface LoadingProps {
  onLoadingComplete: () => void;
}

export function Loading({ onLoadingComplete }: LoadingProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [sweepUp, setSweepUp] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    // Progress simulation - minimum 3 seconds to ensure resources load
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          // Start sweep up animation after loading completes
          setTimeout(() => {
            setSweepUp(true);
          }, 400);
          // Slide entire screen down after sweep completes
          setTimeout(() => {
            setSlideOut(true);
          }, 1300);
          // Complete loading and show site
          setTimeout(() => {
            onLoadingComplete();
          }, 2000);
          return 100;
        }
        return prev + 1.2;
      });
    }, 30);

    // Ensure fonts and critical resources are loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        console.log("Fonts loaded");
      });
    }

    return () => {
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  // Calculate number of bars based on 40px width
  const barCount = Math.ceil(
    typeof window !== "undefined" ? window.innerWidth / 40 : 50
  );
  const bars = Array.from({ length: barCount }, (_, i) => ({
    height: Math.random() * 40 + 20, // Random height between 20-60%
    delay: i * 0.01,
  }));

  return (
    <motion.div
      className={classes.wrapper}
      animate={{
        y: slideOut ? "100%" : 0,
        backgroundColor: slideOut ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 1)",
      }}
      transition={{
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* Main loading screen */}
      <div className={classes.loadingScreen}>
        <div className={classes.content}>
          <motion.div
            className={classes.logo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: slideOut ? 0 : 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            afnan<span className={classes.logoDot}>.</span>
          </motion.div>
        </div>

        {/* Vertical bars at bottom */}
        <div className={classes.barsContainer}>
          {bars.map((bar, index) => (
            <motion.div
              key={index}
              className={classes.bar}
              initial={{ height: "0%" }}
              animate={{
                height: sweepUp ? "100%" : `${(progress / 100) * bar.height}%`,
              }}
              transition={{
                duration: sweepUp ? 0.7 : 0.05,
                delay: sweepUp ? bar.delay : 0,
                ease: sweepUp ? [0.76, 0, 0.24, 1] : "linear",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
