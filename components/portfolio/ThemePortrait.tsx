"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { themes } from "./Themes";

export function ThemePortrait({
  themeIndex,
  alt,
  sizes,
  priority = false,
}: {
  themeIndex: number;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState<number[]>([]);
  const [visibleIndex, setVisibleIndex] = useState(themeIndex);

  useEffect(() => {
    if (loaded.includes(themeIndex)) setVisibleIndex(themeIndex);
  }, [loaded, themeIndex]);

  return (
    <>
      {themes.map((theme, index) => (
        <Image
          key={theme.id}
          className="theme-portrait-layer"
          data-active={index === visibleIndex}
          src={theme.avatar}
          alt={index === visibleIndex ? alt : ""}
          aria-hidden={index !== visibleIndex}
          width={1000}
          height={1241}
          sizes={sizes}
          priority={priority && theme.id === "sand"}
          loading={priority && theme.id === "sand" ? undefined : "eager"}
          onLoad={() => setLoaded((current) => current.includes(index) ? current : [...current, index])}
        />
      ))}
    </>
  );
}
