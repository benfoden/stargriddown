"use client";

import HexagonBackground from "./HexagonBackground";
import StarsBackground from "./StarsBackground";
import CrossBackground from "./XBackground";

export default function TopPageBackground() {
  return (
    <div className="overflow-clip">
      <StarsBackground hidden={false} />
      <HexagonBackground hidden={false} />
      <CrossBackground hidden={false} />
    </div>
  );
}
