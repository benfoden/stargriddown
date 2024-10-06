import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import MatchCard from "~/app/_components/MatchCard";
import { CARDTYPES } from "~/gameConfig/constants";
import { api } from "~/trpc/server";

export default async function CardPage({ params }: { params: { id: string } }) {
  const [card, decks, abilities] = await Promise.all([
    api.card.get({ id: params.id }),
    api.deck.getAll(),
    api.ability.getAll(),
  ]);
  if (!card) {
    throw new Error("Card not found");
  }

  console.log("the card", card);
  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <div className="flex flex-row gap-4">
        <MatchCard card={card} />
        <Card variant="form">
          <form
            className="flex flex-col gap-2"
            action={async (formData: FormData) => {
              "use server";

              const name = formData.get("name") as string;
              const type = formData.get("type") as string;
              const variant = formData.get("variant") as string;
              const rarity = formData.get("rarity") as string;
              const deckId = formData.get("deckId") as string;
              const desc = formData.get("desc") as string;
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
              const might = parseFloat(formData.get("might") as string);
              const abilities = JSON.parse(
                formData.get("cardAbilities") as string,
              ) as string;

              await api.card.update({
                id: params.id,
                name,
                desc,
                type,
                variant,
                deckId,
                rarity,
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
                might,
              });
            }}
          >
            <Input
              type="text"
              id="name"
              name="name"
              label="Name:"
              initialValue={card.name}
              required
            />
            <Input
              type="radio"
              id="deckId"
              name="deckId"
              label="Deck:"
              initialValue={card.deckId ?? ""}
              required
              radioOptions={decks.map((deck) => ({
                id: deck.id,
                label: deck.name,
                value: deck.id,
              }))}
            />

            <Input
              type="radio"
              id="type"
              name="type"
              label="Type:"
              initialValue={card.type ?? ""}
              radioOptions={Object.values(CARDTYPES).map((type) => ({
                id: type.name,
                label: type.name,
                value: type.name,
              }))}
            />

            <Input
              type="text"
              id="variant"
              name="variant"
              label="Variant:"
              initialValue={card.variant ?? ""}
            />
            {Object.values(CARDTYPES).map((type) => (
              <details key={type.name}>
                <summary>{type.name}</summary>
                <ul>
                  {type.variants.map((variant) => (
                    <li key={variant}>{variant}</li>
                  ))}
                </ul>
              </details>
            ))}

            <Input
              type="text"
              id="rarity"
              name="rarity"
              label="Rarity:"
              initialValue={card.rarity ?? ""}
            />

            <Input
              type="text"
              id="shortDesc"
              name="shortDesc"
              label="Short Description:"
              initialValue={card.shortDesc ?? ""}
            />

            <Input
              type="number"
              id="yen"
              name="yen"
              label="Yen:"
              initialValue={card.yen ?? 0}
            />

            <Input
              type="number"
              id="attack"
              name="attack"
              label="Attack:"
              initialValue={card.attack ?? 0}
            />

            <Input
              type="number"
              id="datab"
              name="datab"
              label="Datab:"
              initialValue={card.datab ?? 0}
            />

            <Input
              type="number"
              id="defense"
              name="defense"
              label="Defense:"
              initialValue={card.defense ?? 0}
            />

            <Input
              type="number"
              id="mw"
              name="mw"
              label="MW:"
              initialValue={card.mw ?? 0}
            />

            <Input
              type="number"
              id="lag"
              name="lag"
              label="Lag:"
              initialValue={card.lag ?? 0}
            />

            <Input
              type="number"
              id="costYen"
              name="costYen"
              label="Cost Yen:"
              initialValue={card.costYen ?? 0}
            />

            <Input
              type="number"
              id="costDatab"
              name="costDatab"
              label="Cost Datab:"
              initialValue={card.costDatab ?? 0}
            />

            <Input
              type="number"
              id="costMw"
              name="costMw"
              label="Cost MW:"
              initialValue={card.costMw ?? 0}
            />

            <Input
              type="number"
              id="costLag"
              name="costLag"
              label="Cost Lag:"
              initialValue={card.costLag ?? 0}
            />

            <Input
              type="number"
              id="might"
              name="might"
              label="Might:"
              initialValue={card.might ?? 0}
            />

            <Input
              type="text"
              id="image"
              name="image"
              label="Image URL:"
              initialValue={card.image ?? ""}
            />

            <Input
              type="text"
              id="abilities"
              name="abilities"
              label="Abilities:"
            />
            {abilities.map((ability) => (
              <details key={ability.name}>
                <summary>{ability.name}</summary>
                <code>{`{"id": "${ability.id}", "name": "${ability.name}", "variant": "${ability.variant}", "shortDesc": "${ability.shortDesc}", "desc": "${ability.desc}"}`}</code>
              </details>
            ))}

            <Input
              type="text"
              id="desc"
              name="desc"
              label="Description:"
              initialValue={card.desc ?? ""}
            />

            <Input
              type="text"
              id="flavor"
              name="flavor"
              label="Flavor:"
              initialValue={card.flavor ?? ""}
            />

            <FormButton variant="submit">Update Card</FormButton>
          </form>
        </Card>
      </div>
    </div>
  );
}
