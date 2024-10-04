import Link from "next/link";
import Button from "../_components/Button";
import DropDownMenu from "../_components/DropDown";
import StargridIcon from "../_components/StargridIcon";

export async function PublicNav() {
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
            <Link href="/">
              <Button variant="nav">Home</Button>
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex md:pr-4">
          <Link href={"/log-in"}>
            <Button variant="menuElement">Log in</Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button variant="menuElement" isSpecial>
              Sign up
            </Button>
          </Link>
        </div>
        <div className="relative z-50 block md:hidden">
          <DropDownMenu isTopMenu>
            <Link href={"/home"}>
              <Button variant="menuElement">Home</Button>
            </Link>

            <Link href={"/log-in"}>
              <Button variant="menuElement">Log in</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button variant="menuElement" isSpecial>
                Sign up
              </Button>
            </Link>
          </DropDownMenu>
          {/* <DropDownMenu isTopMenu>
          {session && (
            <Link href={"/home"}>
              <Button variant="menuElement">{t("nav.userHome")}</Button>
            </Link>
          )}
          <Link href={"/features"}>
            <Button variant="menuElement">{t("nav.features")}</Button>
          </Link>
          <Link href={"/pricing"}>
            <Button variant="menuElement">{t("nav.pricing")}</Button>
          </Link>
          <Link href={"/blog"}>
            <Button variant="menuElement"> {t("nav.blog")}</Button>
          </Link>
          <Link href={"/about"}>
            <Button variant="menuElement">{t("nav.about")}</Button>
          </Link>
          <Link href={"/contact"}>
            <Button variant="menuElement">{t("nav.contactUs")}</Button>
          </Link>
          <Link href={"/auth/signin"}>
            <Button variant="menuElement">{t("nav.login")}</Button>
          </Link>
          <Link href={"/auth/signin"}>
            <Button variant="menuElement" isSpecial>
              {t("nav.signup")}
            </Button>
          </Link>
        </DropDownMenu> */}
        </div>
      </div>
    </nav>
  );
}
