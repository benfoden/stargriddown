import { useEffect, useState } from "react";

function generateRandomHexagons(hexagonCount: number) {
  const hexagons = [];
  // emerald 500 and red 500
  const colors = ["#10b981", "#ef4444"];
  for (let i = 0; i < hexagonCount; i++) {
    const xPadding = Math.random() * 100 + "%";
    const yPadding = Math.random() * 100 + "%";
    const opacity = Math.random() * 0.5 + 0.1;
    const fillColor = colors[Math.floor(Math.random() * colors.length)];
    const size = i % 117 === 0 ? 128 : i % 42 === 0 ? 96 : 64; // Set 1 in every 117 hexagons to 30px and 1 in every 42 hexagons to 20px

    const hexagonPoints = `
      ${size / 2},0 
      ${size},${size * 0.25} 
      ${size},${size * 0.75} 
      ${size / 2},${size} 
      0,${size * 0.75} 
      0,${size * 0.25}
    `;

    hexagons.push(
      <svg
        key={i}
        style={{
          position: "absolute",
          width: `${size}px`,
          height: `${size}px`,
          left: xPadding,
          top: yPadding,
          opacity: opacity,
        }}
      >
        <polygon points={hexagonPoints} fill={fillColor} />
      </svg>,
    );
  }
  return (
    <div className="absolute inset-0 left-0 top-[-80px] z-[-10] block min-h-screen w-full">
      {hexagons}
    </div>
  );
}

export default function HexagonBackground({ hidden }: { hidden: boolean }) {
  const [hexagonCount, setHexagonCount] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHexagonCount(8); // Reduce the number of hexagons on small screens
      } else {
        setHexagonCount(16);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (hidden) {
    return null;
  }
  return <>{generateRandomHexagons(hexagonCount)}</>;
}
