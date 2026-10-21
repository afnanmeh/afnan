"use client";

import { useEffect, useId, useRef } from "react";

const diameter = 160;
// Tight encoding bounds keep displacement precision below 0.16 CSS pixels.
const displacementScale = 40;
const zoom = 1.3;
const mapSize = 18;
const mapPadding = 10;
const mapExtent = diameter + mapPadding * 2;

/** A static optical map magnifies the live backdrop without a render loop. */
export function CursorMagnifier() {
  const id = `cursor-magnifier-${useId().replace(/:/g, "")}`;
  const lens = useRef<HTMLSpanElement>(null);
  const image = useRef<SVGFEImageElement>(null);

  useEffect(() => {
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    // SVG backdrop displacement is currently implemented in desktop Chromium.
    const supported = /Chrome|Chromium|Edg\//.test(navigator.userAgent)
      && !/Firefox|FxiOS|CriOS|EdgiOS/.test(navigator.userAgent)
      && CSS.supports("backdrop-filter", `url("#${id}")`);
    const update = () => {
      if (!lens.current || !image.current) return;
      const enabled = supported && pointer.matches && !motion.matches;
      lens.current.dataset.enabled = String(enabled);
      if (!enabled) {
        lens.current.style.backdropFilter = "none";
        image.current.removeAttribute("href");
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = mapSize;
      const context = canvas.getContext("2d");
      if (!context) return;
      const map = context.createImageData(mapSize, mapSize);
      for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
          const dx = (x + 0.5) * mapExtent / mapSize - mapPadding - diameter / 2;
          const dy = (y + 0.5) * mapExtent / mapSize - mapPadding - diameter / 2;
          // Uniform optical zoom throughout the circle keeps letter shapes
          // intact instead of stretching them through a curved edge falloff.
          const strength = 1 / zoom - 1;
          const index = (y * mapSize + x) * 4;
          map.data[index] = Math.round(128 + dx * strength / displacementScale * 256);
          map.data[index + 1] = Math.round(128 + dy * strength / displacementScale * 256);
          map.data[index + 2] = 128;
          map.data[index + 3] = 255;
        }
      }
      context.putImageData(map, 0, 0);
      image.current.setAttribute("href", canvas.toDataURL());
      lens.current.style.backdropFilter = `url("#${id}")`;
      canvas.width = canvas.height = 0;
    };
    update();
    pointer.addEventListener("change", update);
    motion.addEventListener("change", update);
    const element = lens.current;
    const map = image.current;
    return () => {
      pointer.removeEventListener("change", update);
      motion.removeEventListener("change", update);
      element?.style.removeProperty("backdrop-filter");
      map?.removeAttribute("href");
    };
  }, [id]);

  return (
    <>
      <svg className="cursor-lens-definitions" width="0" height="0" aria-hidden="true">
        <defs>
          <filter id={id} filterUnits="userSpaceOnUse" x="0" y="0" width={diameter} height={diameter} colorInterpolationFilters="sRGB">
            {/* Bilinear interpolation of the sparse affine map removes per-pixel
                offset steps. Overscan keeps sampling linear at the circle edge.
                The page content itself is never blurred. */}
            <feImage ref={image} x={-mapPadding} y={-mapPadding} width={mapExtent} height={mapExtent} preserveAspectRatio="none" imageRendering="optimizeQuality" result="lens-map" />
            <feComponentTransfer in="lens-map" result="lens-normals">
              <feFuncR type="linear" slope={255 / 256} />
              <feFuncG type="linear" slope={255 / 256} />
            </feComponentTransfer>
            <feDisplacementMap in="SourceGraphic" in2="lens-normals" scale={displacementScale} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <span ref={lens} className="cursor-lens" aria-hidden="true" />
    </>
  );
}
