import { type Metadata } from "next";
import Link from "next/link";
import Button from "~/app/_components/Button";
import DropDownMenu from "~/app/_components/DropDown";
import FormDeleteButton from "~/app/_components/FormDeleteButton";
import { SessionNav } from "~/app/_components/SessionNav";
import { api } from "~/trpc/server";
import { getUser } from "~/utils/supabase/getUser";
import { deleteMatchAction } from "../actions";
import MatchPage from "./page";

export const metadata: Metadata = {
  title: `Match`,
  description: "Stargrid Match page",
};

export default async function MatchLayout({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { message: string }; // Changed message type to string
}) {
  const user = await getUser();
  const decks = await api.deck.getAll();

  const { id } = params;
  const match = await api.match.get({ id });

  if (!match) {
    throw new Error("Error loading match. Please try again");
  }
  return (
    <>
      <SessionNav>
        <div />
        <DropDownMenu>
          <Link href="/home">
            <Button variant="menuElement">Home</Button>
          </Link>
          <Link href="/settings">
            <Button variant="menuElement">Settings</Button>
          </Link>
          <form
            action={async () => {
              "use server";
              await deleteMatchAction({ id });
            }}
          >
            <FormDeleteButton isCancel>Cancel match</FormDeleteButton>
          </form>
        </DropDownMenu>
      </SessionNav>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-12">
        <MatchPage
          initialMatch={match}
          initialDecks={decks}
          user={user ?? undefined}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
