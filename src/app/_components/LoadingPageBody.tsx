"use client";
import Spinner from "~/app/_components/Spinner";

export default function LoadingPageBody() {
  return (
    <div className="flex h-full flex-col items-center gap-12 px-4 py-32">
      <Spinner size="lg" />
    </div>
  );
}
