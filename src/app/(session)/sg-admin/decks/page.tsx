import Link from "next/link";
import Button from "~/app/_components/Button";
import { api } from "~/trpc/server";
import DeckEditForm from "./DeckEditForm";

export default async function DeckssPage() {
  const decks = await api.deck.getAll();

  return (
    <div>
      decks
      <div className="flex w-full flex-row items-start justify-center gap-4">
        <aside className="flex flex-col gap-2">
          {decks.map((deck) => (
            <Link href={`/sg-admin/decks/${deck.id}`} key={deck.id}>
              <Button variant="listItem">{deck.name}</Button>
            </Link>
          ))}
        </aside>
        <DeckEditForm />
      </div>
    </div>
  );
}
