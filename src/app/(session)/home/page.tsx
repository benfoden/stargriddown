import Button from "~/app/_components/Button";
import { Card } from "~/app/_components/Card";
import { FormMessage, type Message } from "~/app/_components/FormMessage";
import StarsBackgroundClient from "~/app/_components/StarsBackgroundClient";

export default async function Home({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-12">
      <FormMessage message={searchParams} />
      <Card variant="form" isButton={false}>
        <div className="flex h-full flex-col items-start justify-start gap-8 py-16">
          <Button variant="action">
            <span className="flex w-32 justify-center">Create game</span>
          </Button>
          <Button variant="action">
            <span className="flex w-32 justify-center">Join game</span>
          </Button>
        </div>
      </Card>
      <StarsBackgroundClient />
    </div>
  );
}
