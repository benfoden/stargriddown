import MatchCard from "~/app/_components/MatchCard";
import { api } from "~/trpc/server";

export default async function CardPage({ params }: { params: { id: string } }) {
  const card = await api.card.get({ id: params.id });
  if (!card) {
    throw new Error("Card not found");
  }
  return (
    <div>
      <MatchCard card={card} />
    </div>
  );
}
