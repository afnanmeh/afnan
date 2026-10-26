import Image from "next/image";

const pastels = ["#e5c9d8", "#efd6c7", "#cee1ed", "#d8c9e9", "#d6e5c4", "#e9dfc5", "#e7cfdd", "#f2e8d7"];

// A stable seed keeps the irregular mosaic identical during server rendering
// and hydration, rather than moving its vertices when the page opens.
function noise(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function createMosaic(width: number, height: number, columns: number, rows: number) {
  let lilacCount = 0;
  const vertices = Array.from({ length: rows + 1 }, (_, row) =>
    Array.from({ length: columns + 1 }, (_, column) => {
      const seed = row * (columns + 1) + column;
      return [
        Math.round(column * width / columns + (column === 0 || column === columns ? 0 : (noise(seed + 1) - 0.5) * width / columns * 0.7)),
        Math.round(row * height / rows + (row === 0 || row === rows ? 0 : (noise(seed + 31) - 0.5) * height / rows * 0.7)),
      ].join(",");
    }),
  );
  return Array.from({ length: columns * rows }, (_, index) => {
    const row = Math.floor(index / columns), column = index % columns;
    const a = vertices[row][column], b = vertices[row][column + 1];
    const c = vertices[row + 1][column], d = vertices[row + 1][column + 1];
    const triangles = noise(index + 63) > 0.5 ? [[a, b, c], [b, d, c]] : [[a, b, d], [a, d, c]];
    return triangles.map((points, side) => {
      const color = pastels[Math.floor(noise(index * 2 + side + 101) * pastels.length)];
      return {
        points: points.join(" "),
        color: color === "#d8c9e9" && ++lilacCount % 2 === 0 ? "#e9dfc5" : color,
      };
    });
  }).flat();
}

const desktopPieces = createMosaic(1440, 900, 5, 3);
const mobilePieces = createMosaic(600, 900, 3, 4);

export function LoaderComposition() {
  return (
    <>
      <div className="loader-surface">
        <svg className="loader-mosaic-desktop" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {desktopPieces.map((piece, index) => <polygon key={index} className="loader-piece" points={piece.points} fill={piece.color} />)}
        </svg>
        <svg className="loader-mosaic-mobile" viewBox="0 0 600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {mobilePieces.map((piece, index) => <polygon key={index} className="loader-piece" points={piece.points} fill={piece.color} />)}
        </svg>
      </div>
      <div className="loader-portrait">
        <Image className="loader-sand" src="/afnan-avatar-v2-sand-pastel.webp" alt="" width={1000} height={1241} sizes="(max-width: 767px) 440px, 650px" priority />
      </div>
    </>
  );
}
