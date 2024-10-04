import Link from "next/link";
import Button from "../_components/Button";
import { Card } from "../_components/Card";
import TopPageBackground from "../_components/TopPageBackground";

export default async function Top() {
  return (
    <>
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-start">
        <div className="items-ce nter relative flex min-h-screen flex-col justify-center">
          <div className="flex w-fit flex-col items-center justify-between gap-2">
            <Card variant="hero" isButton={false}>
              <div className="flex w-full flex-col items-center justify-between gap-8 md:px-16 md:py-8">
                <h1 className="z-10 font-sans text-5xl font-extrabold uppercase tracking-tight text-amber-500 sm:text-[5rem]">
                  Stargrid
                </h1>
                <p className="z-10 text-lg uppercase">
                  A new Strategy Card Game with Rapid Deck-Building
                </p>
                <p className="z-10 text-lg uppercase">
                  Fast to start and challenging to master.
                </p>
                <Link href={"/sign-up"}>
                  <Button variant="cta">Play for Free</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
        <TopPageBackground />
      </div>
    </>
  );
}
