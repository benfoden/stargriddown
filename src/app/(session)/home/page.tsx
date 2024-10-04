import Button from "~/app/_components/Button";
import { Card } from "~/app/_components/Card";
import { FormMessage, type Message } from "~/app/_components/FormMessage";
import StarsBackgroundClient from "~/app/_components/StarsBackgroundClient";
import { getUser } from "~/utils/supabase/getUser";

export default async function Home({
  searchParams,
}: {
  searchParams: Message;
}) {
  const user = await getUser();
  return (
    <div className="flex w-full max-w-5xl flex-1 flex-col items-center gap-12">
      <FormMessage message={searchParams} />
      <Card variant="hero" isButton={false}>
        <h1>Welcome home {user.name}</h1>
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
