import { type Ability, type Deck } from "@prisma/client";
import Link from "next/link";
import Button from "~/app/_components/Button";
import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import FormDeleteButton from "~/app/_components/FormDeleteButton";
import Input from "~/app/_components/Input";
import { api } from "~/trpc/server";
import { CARDTYPES } from "~/utils/game/constants";
import { encodedRedirect } from "~/utils/misc";
import { type CardWithAbilities } from "~/utils/types";

export default function CardEditForm({
  card,
  decks,
  abilities,
}: {
  card?: CardWithAbilities;
  decks: Deck[];
  abilities: Ability[];
}) {
  console.log("the card");
  return (
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
          const control = parseFloat(formData.get("control") as string);
          const abilityIds = formData.getAll("abilityIds") as string[];

          if (card?.id) {
            await api.card.update({
              id: card?.id,
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
              abilityIds,
              control,
            });
          } else {
            await api.card.create({
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
              abilityIds,
              control,
            });
          }

          encodedRedirect(
            "success",
            `${card?.id ? `/sg-admin/cards/${card?.id}` : `/sg-admin/cards`}`,
            `${card?.id ? "Updated" : "Created"} card`,
          );
        }}
      >
        <FormButton variant="submit">
          {card?.id ? "Update Card" : "Create Card"}
        </FormButton>
        <Input
          type="text"
          id="name"
          name="name"
          label="Name:"
          initialValue={card?.name ?? ""}
          required
        />
        <Input
          type="radio"
          id="deckId"
          name="deckId"
          label="Deck:"
          initialValue={card?.deckId ?? ""}
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
          initialValue={card?.type ?? ""}
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
          initialValue={card?.variant ?? ""}
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
          initialValue={card?.rarity ?? ""}
        />

        <Input
          type="text"
          id="shortDesc"
          name="shortDesc"
          label="Short Description:"
          initialValue={card?.shortDesc ?? ""}
        />

        <Input
          type="number"
          id="yen"
          name="yen"
          label="Yen:"
          initialValue={card?.yen ?? 0}
        />

        <Input
          type="number"
          id="attack"
          name="attack"
          label="Attack:"
          initialValue={card?.attack ?? 0}
        />

        <Input
          type="number"
          id="datab"
          name="datab"
          label="Datab:"
          initialValue={card?.datab ?? 0}
        />

        <Input
          type="number"
          id="defense"
          name="defense"
          label="Defense:"
          initialValue={card?.defense ?? 0}
        />

        <Input
          type="number"
          id="mw"
          name="mw"
          label="MW:"
          initialValue={card?.mw ?? 0}
        />

        <Input
          type="number"
          id="lag"
          name="lag"
          label="Lag:"
          initialValue={card?.lag ?? 0}
        />

        <Input
          type="number"
          id="costYen"
          name="costYen"
          label="Cost Yen:"
          initialValue={card?.costYen ?? 0}
        />

        <Input
          type="number"
          id="costDatab"
          name="costDatab"
          label="Cost Datab:"
          initialValue={card?.costDatab ?? 0}
        />

        <Input
          type="number"
          id="costMw"
          name="costMw"
          label="Cost MW:"
          initialValue={card?.costMw ?? 0}
        />

        <Input
          type="number"
          id="costLag"
          name="costLag"
          label="Cost Lag:"
          initialValue={card?.costLag ?? 0}
        />

        <Input
          type="number"
          id="control"
          name="control"
          label="Control:"
          initialValue={card?.control ?? 0}
        />

        <Input
          type="text"
          id="image"
          name="image"
          label="Image URL:"
          initialValue={card?.image ?? ""}
        />

        {card?.cardAbilities?.map(({ ability }) => (
          <li key={ability.id}>
            <Input
              type="checkbox"
              id="abilities"
              name="abilities"
              value={ability.id}
              initialValue={true}
            />
            <Link href={`/sg-admin/abilities/${ability.id}`}>
              <Button variant="listItem">Edit Ability</Button>
            </Link>
          </li>
        ))}
        <Input
          type="textarea"
          id="abilities"
          name="abilities"
          label="Abilities:"
          initialValue={JSON.stringify(
            card?.cardAbilities?.map(({ ability }) => ability.id),
            null,
            2,
          )}
        />
        {abilities.map((ability) => (
          <details key={ability.name}>
            <summary>{ability.name}</summary>
            <Link href={`/sg-admin/abilities/${ability.id}`}>
              <Button variant="listItem">Edit Ability</Button>
            </Link>
            <Card isButton={false}>
              <code>
                <pre>{JSON.stringify(ability, null, 2)}</pre>
              </code>
            </Card>
          </details>
        ))}

        <Input
          type="text"
          id="desc"
          name="desc"
          label="Description:"
          initialValue={card?.desc ?? ""}
        />

        <Input
          type="text"
          id="flavor"
          name="flavor"
          label="Flavor:"
          initialValue={card?.flavor ?? ""}
        />

        <FormButton variant="submit">
          {card?.id ? "Update Card" : "Create Card"}
        </FormButton>
      </form>
      {card?.id && (
        <form
          className="flex flex-col gap-2"
          action={async () => {
            "use server";
            await api.card.delete({ id: card?.id });
            encodedRedirect("success", `/sg-admin/cards/`, `Deleted card`);
          }}
        >
          <FormDeleteButton>Delete card</FormDeleteButton>
        </form>
      )}
    </Card>
  );
}
