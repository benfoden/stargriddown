import { FormMessage } from "~/app/_components/FormMessage";
import MatchCard from "~/app/_components/MatchCard";
import { api } from "~/trpc/server";
import CardEditForm from "../CardEditForm";

export default async function CardPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { message: string };
}) {
  const [card, decks, abilities] = await Promise.all([
    api.card.get({ id: params.id }),
    api.deck.getAll(),
    api.ability.getAll(),
  ]);
  if (!card) {
    throw new Error("Card not found");
  }

  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <FormMessage message={searchParams} />
      <div className="flex flex-row gap-4">
        <MatchCard card={card} />
        <CardEditForm card={card} decks={decks} abilities={abilities} />
      </div>
    </div>
  );
}
