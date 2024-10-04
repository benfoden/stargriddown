import {
  CaretUpIcon,
  GearIcon,
  HomeIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
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
          <StargridIcon />
        </Link>
        <DropDownMenu isUserMenu userName={user.name}>
          <Link href="/home">
            <Button variant="menuElement">
              <HomeIcon className="h-6 w-6 text-amber-500" /> Home
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="menuElement">
              <GearIcon className="h-6 w-6 text-amber-500" /> Settings
            </Button>
          </Link>
          <Link href="/">
            <Button variant="menuElement">
              <InfoCircledIcon className="h-6 w-6 text-amber-500" /> About
            </Button>
          </Link>
          <Link href="/">
            <Button variant="menuElement">
              <CaretUpIcon className="h-6 w-6 text-amber-500" /> Top page
            </Button>
          </Link>
        </DropDownMenu>
      </SessionNav>
      <div className="flex w-full flex-1 flex-col items-center gap-12 px-2 md:px-16">
        {children}
      </div>
    </>
  );
}
