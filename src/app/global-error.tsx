"use client";

import { Card } from "./_components/Card";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="w=full flex h-full flex-col items-center justify-center">
          <Card>
            <h1>Error: Something went wrong.</h1>
            <p>{error.message}</p>
            <button onClick={() => reset()}>Try again</button>
          </Card>
        </div>
      </body>
    </html>
  );
}
