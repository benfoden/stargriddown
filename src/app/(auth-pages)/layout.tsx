import Link from "next/link";
import "~/styles/globals.css";
import StargridIcon from "../_components/StargridIcon";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="z-100 flex h-16 w-full flex-wrap items-center justify-between bg-transparent pl-4 pt-4 sm:pr-4 sm:pt-0">
        <div className="flex items-center">
          <h1>
            <Link href="/" className="no-underline" aria-label="stargrid">
              <StargridIcon />
            </Link>
          </h1>
        </div>
      </nav>
      <main className="flex min-h-screen w-full flex-col items-start justify-start px-2 sm:px-8">
        <div className="my-8 flex w-full flex-col items-center justify-start gap-2">
          {children}
        </div>
      </main>
    </>
  );
}
