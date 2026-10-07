"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** Layered dynamic control-point curtains, following the referenced GSAP demo. */
export function WorkMorph() {
  const root = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const paths = root.current!.querySelectorAll(".work-morph-path");
        const mobile = matchMedia("(max-width: 767px)").matches;
        const count = mobile ? 6 : 10;
        const rows = Array.from(paths, () =>
          Array.from({ length: count }, () => 100),
        );
        const draw = () =>
          paths.forEach((path, layer) => {
            const row = rows[layer];
            let d = `M0 0V${row[0]}C`;
            for (let point = 1; point < count; point++) {
              const x = (point / (count - 1)) * 100;
              const control = x - 50 / (count - 1);
              d += `${control} ${row[point - 1]} ${control} ${row[point]} ${x} ${row[point]} `;
            }
            path.setAttribute("d", d + "V0H0Z");
          });
        const timeline = gsap.timeline({
          onUpdate: draw,
          defaults: { duration: mobile ? 0.65 : 0.9, ease: "power2.inOut" },
          scrollTrigger: {
            trigger: root.current!.closest("#work"),
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
        rows.forEach((row, layer) =>
          row.forEach((_, point) => {
            const delay =
              (Math.sin(point * 1.7) + 1) * 0.12 + (1 - layer) * 0.2;
            timeline.to(row, { [point]: 0 }, delay);
          }),
        );
        draw();
      });
      return () => media.revert();
    },
    { scope: root },
  );
  return (
    <svg
      ref={root}
      className="work-morph"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-back`} x2="0" y2="1">
          <stop stopColor="var(--theme-accent)" stopOpacity=".88" />
          <stop offset="1" stopColor="var(--theme-bottom)" />
        </linearGradient>
        <linearGradient id={`${id}-front`} x2="0" y2="1">
          <stop stopColor="var(--theme-top)" />
          <stop offset="1" stopColor="var(--theme-bottom)" />
        </linearGradient>
      </defs>
      <path
        className="work-morph-path"
        fill={`url(#${id}-back)`}
        d="M0 0V100H100V0Z"
      />
      <path
        className="work-morph-path"
        fill={`url(#${id}-front)`}
        d="M0 0V100H100V0Z"
      />
    </svg>
  );
}
