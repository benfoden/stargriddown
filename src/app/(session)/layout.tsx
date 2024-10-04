import { GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { type ReactNode } from "react";
import { SessionNav } from "../_components/SessionNav";
import StargridIcon from "../_components/StargridIcon";

export default async function SessionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SessionNav>
        <Link href="/home">
          <StargridIcon />
        </Link>
        <Link href="/settings">
          <GearIcon className="h-4 w-4" />
        </Link>
      </SessionNav>
      <div className="flex w-full flex-1 flex-col items-center gap-12 px-2 md:px-16">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-medium">Session</h1>
          {children}
        </div>
      </div>
    </>
  );
}
