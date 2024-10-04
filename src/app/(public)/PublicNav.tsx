import { CaretUpIcon, GearIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getUser } from "~/utils/supabase/getUser";
import Button from "../_components/Button";
import DropDownMenu from "../_components/DropDown";
import StargridIcon from "../_components/StargridIcon";

export async function PublicNav() {
  const user = await getUser();

  return (
    <nav className="fixed z-40 w-full px-2 pt-2 md:px-4">
      <div className="flex h-16 w-full flex-row items-center justify-between rounded-md border border-yellow-500 bg-amber-500/10 px-2 backdrop-blur-lg md:px-8">
        <div className="flex items-center">
          <h1>
            <Link href="/" className="no-underline" aria-label="stargrid">
              <StargridIcon />
            </Link>
          </h1>
          <div className="hidden md:block">
            <Link href="/about">
              <Button variant="nav">About the game</Button>
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex md:pr-4">
          {!user ? (
            <>
              <Link href={"/log-in"}>
                <Button variant="menuElement">Log in</Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button variant="menuElement" isSpecial>
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <DropDownMenu isUserMenu userName={user.name}>
                <Link href="/">
                  <Button variant="menuElement">
                    <CaretUpIcon className="h-6 w-6 text-amber-500" /> Top
                  </Button>
                </Link>
                <Link href="/home">
                  <Button variant="menuElement">
                    <HomeIcon className="h-6 w-6 text-amber-500" /> Home
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button variant="menuElement">
                    <GearIcon className="h-6 w-6 text-amber-500" />
                    Settings
                  </Button>
                </Link>
              </DropDownMenu>
            </>
          )}
        </div>

        <div className="relative block md:hidden">
          <DropDownMenu isUserMenu>
            <Link href="/">
              <Button variant="menuElement">
                <CaretUpIcon className="h-6 w-6 text-amber-500" /> Top
              </Button>
            </Link>
            {!user ? (
              <>
                <Link href={"/log-in"}>
                  <Button variant="menuElement">Log in</Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button variant="menuElement" isSpecial>
                    Sign up
                  </Button>
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </DropDownMenu>
        </div>
      </div>
    </nav>
  );
}
