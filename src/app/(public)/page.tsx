import Button from "../_components/Button";
import { Card } from "../_components/Card";
import ClientBgWrapper from "../_components/ClientBgWrapper";
import StargridDownIcon from "../_components/StargridDownIcon";

export default async function Top() {
  return (
    <div className="container mx-auto w-full">
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <div className="flex w-fit flex-col items-center justify-between gap-2">
          <Card variant="hero" isButton={false}>
            <div className="flex w-full flex-col items-center justify-between gap-8 md:px-16 md:py-8">
              <StargridDownIcon h={16} w={16} />
              <h1 className="z-10 text-5xl font-extrabold uppercase tracking-tight text-amber-500 sm:text-[5rem]">
                Stargrid Down
              </h1>
              <p className="z-10 text-lg uppercase">
                A new Strategy Card Game with Rapid Deck-Building
              </p>
              <p className="z-10 text-lg uppercase">
                Fast to start and challenging to master.
              </p>
              <Button variant="cta">Play Now</Button>
            </div>
          </Card>
          <ClientBgWrapper />
        </div>
      </div>
    </div>
  );
}
