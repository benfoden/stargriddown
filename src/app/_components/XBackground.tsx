import { Cross1Icon } from "@radix-ui/react-icons"; // Assuming Cross1Icon is imported from this package
import { useEffect, useState } from "react";

function generateRandomCrosses(crossCount: number) {
  const crosses = [];
  for (let i = 0; i < crossCount; i++) {
    const xPadding = Math.random() * 100 + "%";
    const yPadding = Math.random() * 100 + "%";
    const opacity = Math.random() * 0.5 + 0.1;

    crosses.push(
      <Cross1Icon
        key={i}
        className="h-8 w-8 rounded-full text-amber-500"
        style={{
          position: "absolute",
          left: xPadding,
          top: yPadding,
          opacity: opacity,
        }}
      />,
    );
  }
  return (
    <div className="absolute inset-0 left-0 top-[-80px] z-[-10] block min-h-screen w-full">
      {crosses}
    </div>
  );
}

export default function CrossBackground({ hidden }: { hidden: boolean }) {
  const [crossCount, setCrossCount] = useState(64);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCrossCount(16); // Reduce the number of crosses on small screens
      } else {
        setCrossCount(64);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (hidden) {
    return null;
  }
  return <>{generateRandomCrosses(crossCount)}</>;
}
