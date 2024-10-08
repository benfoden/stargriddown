import Link from "next/link";
import Button from "~/app/_components/Button";
import FormButton from "~/app/_components/FormButton";
import { FormMessage } from "~/app/_components/FormMessage";
import Input from "~/app/_components/Input";
import { api } from "~/trpc/server";
import { type CardWithAbilities } from "~/utils/types";
import CardEditForm from "./CardEditForm";

export default async function CardsPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [cards, decks, abilities] = await Promise.all([
    api.card.getAll(),
    api.deck.getAll(),
    api.ability.getAll(),
  ]);

  return (
    <div>
      cards
      <div className="flex w-full flex-row items-start justify-center gap-4">
        <FormMessage message={searchParams} />
        <aside className="flex flex-col gap-2">
          <details>
            <summary>Create Cards Json</summary>
            <form
              className="flex w-full flex-1 flex-col gap-4 md:w-[512px]"
              action={async (formData: FormData) => {
                "use server";
                const cardJsonArray = formData.get("cardJsonArray") as string;

                const cards: CardWithAbilities[] = JSON.parse(
                  cardJsonArray,
                ) as CardWithAbilities[];

                for (const card of cards) {
                  const {
                    name,
                    desc,
                    type,
                    variant,
                    shortDesc,
                    flavor,
                    yen,
                    attack,
                    datab,
                    defense,
                    mw,
                    lag,
                    costYen,
                    costDatab,
                    costMw,
                    costLag,
                    image,
                    cardAbilities,
                    control,
                  } = card;

                  await api.card.create({
                    name: name ?? undefined,
                    desc: desc ?? undefined,
                    shortDesc: shortDesc ?? undefined,
                    type: type ?? undefined,
                    variant: variant ?? undefined,
                    flavor: flavor ?? undefined,
                    yen: yen ?? undefined,
                    attack: attack ?? undefined,
                    datab: datab ?? undefined,
                    defense: defense ?? undefined,
                    mw: mw ?? undefined,
                    lag: lag ?? undefined,
                    costYen: costYen ?? undefined,
                    costDatab: costDatab ?? undefined,
                    costMw: costMw ?? undefined,
                    costLag: costLag ?? undefined,
                    image: image ?? undefined,
                    abilityIds: cardAbilities
                      ? cardAbilities.map(({ ability }) => ability.id)
                      : undefined,
                    control: control ?? undefined,
                  });
                }
              }}
            >
              <Input
                type="textarea"
                id="cardJsonArray"
                name="cardJsonArray"
                label="JSON Array:"
              />

              <FormButton variant="cta">Create Card(s)</FormButton>
            </form>
          </details>
          {cards.map((card) => (
            <Link href={`/sg-admin/cards/${card.id}`} key={card.id}>
              <Button variant="listItem">{card.name}</Button>
            </Link>
          ))}
        </aside>
        <CardEditForm decks={decks} abilities={abilities} />
      </div>
    </div>
  );
}
