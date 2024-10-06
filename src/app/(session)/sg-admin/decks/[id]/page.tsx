import Link from "next/link";
import MatchCard from "~/app/_components/MatchCard";
import { api } from "~/trpc/server";
import DeckEditForm from "../DeckEditForm";

export default async function DeckPage({ params }: { params: { id: string } }) {
  const [deck, cards] = await Promise.all([
    api.deck.get({ id: params.id }),
    api.card.getByDeckId({ deckId: params.id }),
  ]);

  if (!deck) {
    throw new Error("Deck not found");
  }
  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <div className="flex flex-row gap-4">
        <aside className="flex flex-col gap-2">
          {cards.map((card) => (
            <div key={card.id}>
              <Link href={`/sg-admin/cards/${card.id}`}>
                <MatchCard card={card} />
              </Link>
            </div>
          ))}
        </aside>
        <DeckEditForm deck={deck} />
      </div>
    </div>
  );
}
