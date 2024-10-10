import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { type ReactNode } from "react";
import { getUser } from "~/utils/supabase/getUser";
import Button from "../_components/Button";
import DropDownMenu from "../_components/DropDown";
import { SessionNav } from "../_components/SessionNav";
import StargridIcon from "../_components/StargridIcon";

export default async function SessionLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUser();
  return (
    <>
      <SessionNav>
        <Link href="/home">
          <Button variant="nav">
            <div className="flex flex-row items-center text-amber-500">
              <ChevronLeftIcon className="h-4 w-4" />
              Home
            </div>
          </Button>
        </Link>
        <Link href="/home">
          <StargridIcon />
        </Link>
        {user && (
          <DropDownMenu isUserMenu userName={user?.name ?? "Guest"}>
            <Link href="/home">
              <Button variant="menuElement">Home</Button>
            </Link>
            <Link href="/settings">
              <Button variant="menuElement">Settings</Button>
            </Link>
            <Link href="/about">
              <Button variant="menuElement">About</Button>
            </Link>
            <Link href="/">
              <Button variant="menuElement">Top page</Button>
            </Link>
          </DropDownMenu>
        )}
      </SessionNav>
      {user?.email === "ben.foden+sgadmin@gmail.com" && (
        <Link href="/sg-admin">
          <Button variant="menuElement">SG Admin</Button>
        </Link>
      )}
      <div className="flex w-full flex-1 flex-col items-center gap-12 px-2 md:px-16">
        {children}
      </div>
    </>
  );
}
