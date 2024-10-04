import Link from "next/link";
import Button from "~/app/_components/Button";
import { api } from "~/trpc/server";

export default async function CardsPage() {
  const cards = await api.card.getAll();

  return (
    <div>
      cards
      {cards.map((card) => (
        <Link href={`/sg-admin/cards/${card.id}`} key={card.id}>
          <Button key={card.id}>{card.name}</Button>
        </Link>
      ))}
    </div>
  );
}
