"use client";

import Button from "./Button";
import { Card } from "./Card";

export default function DefaultErrorBody({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <div className="z-20 flex h-dvh flex-col items-center justify-center gap-4">
        <h1 className="mb-8 flex w-full items-center justify-center text-xl font-light">
          Error
        </h1>
        <Card isButton={false}>
          <div className="flex flex-col items-center gap-3 text-sm">
            Please reload and try again. If the error persists, please contact.
            <Button onClick={() => reset()}>Reload</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
