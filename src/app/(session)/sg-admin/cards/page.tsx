import { type Card as CardType } from "@prisma/client";
import Link from "next/link";
import Button from "~/app/_components/Button";
import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import { CARDTYPES } from "~/gameConfig/constants";
import { api } from "~/trpc/server";

export default async function CardsPage() {
  const [cards, decks] = await Promise.all([
    api.card.getAll(),
    api.deck.getAll(),
  ]);

  return (
    <div>
      cards
      <div className="flex w-full flex-row items-start justify-center gap-4">
        <aside className="flex flex-col gap-2">
          <details>
            <summary>Create Cards Json</summary>
            <form
              className="flex w-full flex-1 flex-col gap-4 md:w-[512px]"
              action={async (formData: FormData) => {
                "use server";
                const cardJsonArray = formData.get("cardJsonArray") as string;

                console.log("cardJsonArray", cardJsonArray);
                const cards: CardType[] = JSON.parse(
                  cardJsonArray,
                ) as CardType[];

                for (const card of cards) {
                  const {
                    name,
                    desc,
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
                    abilities,
                  } = card;

                  await api.card.create({
                    name: name ?? undefined,
                    desc: desc ?? undefined,
                    shortDesc: shortDesc ?? undefined,
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
                    abilities: abilities ?? undefined,
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
        <Card variant="form">
          <form
            className="flex w-full flex-1 flex-col gap-4 md:w-[512px]"
            action={async (formData: FormData) => {
              "use server";

              const name = formData.get("name") as string;
              const desc = formData.get("desc") as string;
              const type = formData.get("type") as string;
              const rarity = formData.get("rarity") as string;
              const deckId = formData.get("deckId") as string;
              const shortDesc = formData.get("shortDesc") as string;
              const flavor = formData.get("flavor") as string;
              const yen = parseFloat(formData.get("yen") as string);
              const attack = parseFloat(formData.get("attack") as string);
              const datab = parseFloat(formData.get("datab") as string);
              const defense = parseFloat(formData.get("defense") as string);
              const mw = parseFloat(formData.get("mw") as string);
              const lag = parseFloat(formData.get("lag") as string);
              const costYen = parseFloat(formData.get("costYen") as string);
              const costDatab = parseFloat(formData.get("costDatab") as string);
              const costMw = parseFloat(formData.get("costMw") as string);
              const costLag = parseFloat(formData.get("costLag") as string);
              const image = formData.get("image") as string;
              const abilities = formData.get("abilities") as string;

              await api.card.create({
                name,
                type,
                rarity,
                deckId,
                desc,
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
                abilities,
              });
            }}
          >
            <Input type="text" id="name" name="name" label="Name:" required />

            <Input type="textarea" id="desc" name="desc" label="Description:" />

            <Input
              type="radio"
              id="type"
              name="type"
              label="Type:"
              radioOptions={Object.values(CARDTYPES).map((type) => ({
                id: type,
                label: type,
                value: type,
              }))}
            />

            <Input type="text" id="rarity" name="rarity" label="Rarity:" />
            <Input type="text" id="deckId" name="deckId" label="Deck ID:" />

            <details>
              <summary>decks</summary>
              <div className="flex flex-col gap-1">
                {decks.map((deck) => (
                  <p className="text-xs" key={deck.id}>
                    {deck.name}: {deck.id}
                  </p>
                ))}
              </div>
            </details>

            <Input
              type="textarea"
              id="shortDesc"
              name="shortDesc"
              label="Short Description:"
            />

            <Input type="textarea" id="flavor" name="flavor" label="Flavor:" />

            <Input type="number" id="yen" name="yen" label="Yen:" />

            <Input type="number" id="attack" name="attack" label="Attack:" />

            <Input type="number" id="datab" name="datab" label="Datab:" />

            <Input type="number" id="defense" name="defense" label="Defense:" />

            <Input type="number" id="mw" name="mw" label="MW:" />

            <Input type="number" id="lag" name="lag" label="Lag:" />

            <Input
              type="number"
              id="costYen"
              name="costYen"
              label="Cost Yen:"
            />

            <Input
              type="number"
              id="costDatab"
              name="costDatab"
              label="Cost Datab:"
            />

            <Input type="number" id="costMw" name="costMw" label="Cost MW:" />

            <Input
              type="number"
              id="costLag"
              name="costLag"
              label="Cost Lag:"
            />

            <Input type="text" id="image" name="image" label="Image URL:" />

            <Input
              type="textarea"
              id="abilities"
              name="abilities"
              label="Abilities:"
            />

            <FormButton variant="cta">Create Card</FormButton>
          </form>
        </Card>
      </div>
    </div>
  );
}
