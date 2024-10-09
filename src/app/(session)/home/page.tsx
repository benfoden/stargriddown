import Link from "next/link";
import Button from "~/app/_components/Button";
import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import { FormMessage, type Message } from "~/app/_components/FormMessage";
import StarsBackgroundClient from "~/app/_components/StarsBackgroundClient";
import { api } from "~/trpc/server";
import { getUser } from "~/utils/supabase/getUser";
import { createMatchAction } from "../match/actions";

export default async function Home({
  searchParams,
}: {
  searchParams: Message;
}) {
  const user = await getUser();
  const matches = await api.match.getAllUserMatches();

  return (
    <div className="flex w-full max-w-5xl flex-1 flex-col items-center gap-12">
      <FormMessage message={searchParams} />
      <Card variant="hero" isButton={false}>
        <h1>Welcome home {user?.name}</h1>
        <div className="flex h-full flex-col items-start justify-start gap-8 py-16">
          <form
            className="flex flex-col gap-2"
            action={async () => {
              "use server";

              await createMatchAction();
            }}
          >
            <FormButton variant="action">
              <span className="flex justify-center">Create match</span>
            </FormButton>
          </form>
          {matches?.map((match, index) => (
            <div key={match.id} className="flex flex-row items-center gap-2">
              <Link href={`/match/${match.id}`}>
                <Button variant="action">
                  <span className="flex w-32 justify-center gap-2">
                    Join match{index}
                  </span>
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>
      <StarsBackgroundClient />
    </div>
  );
}
