import Link from "next/link";
import Button from "../_components/Button";
import DropDownMenu from "../_components/DropDown";

export async function PublicNav() {
  return (
    <nav className="z-100 flex h-16 w-full flex-wrap items-center justify-between bg-transparent pl-4 pt-4 sm:pr-4 sm:pt-0">
      <div className="flex items-center">
        <h1>
          <Link
            href="/"
            className="rounded-full px-4 py-2 text-xl font-light no-underline"
            aria-label="stargrid down"
          >
            stargrid down
          </Link>
        </h1>
        <div className="hidden md:block">
          <Link
            href="/"
            className="rounded-full px-4 py-2 no-underline transition hover:bg-white/30"
          >
            Home
          </Link>
        </div>
      </div>
      {/* <div className="hidden items-center gap-4 md:flex md:pr-4">
        {!session ? (
          <>
            <Link href={"/auth/signin"}>
              <Button variant="chip">{t("nav.login")}</Button>
            </Link>
          </>
        ) : (
          <NavChevronLeft targetPathname="/home" label={t("nav.home")} />
        )}
      </div> */}
      <div className="block pr-6 md:hidden">
        <DropDownMenu isTopMenu>
          <Link href={"/home"}>
            <Button variant="menuElement">Home</Button>
          </Link>

          <Link href={"/signin"}>
            <Button variant="menuElement">Log in</Button>
          </Link>
          <Link href={"signup"}>
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
    </nav>
  );
}
