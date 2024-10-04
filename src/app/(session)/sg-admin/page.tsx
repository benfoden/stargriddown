import { type Card } from "@prisma/client";
import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import { api } from "~/trpc/server";
import Chat from "./Chat";

export default async function AdminPage() {
  return (
    <div className="flex w-full flex-col items-center justify-start px-8">
      <div>Admin Page</div>
      <div className="flex flex-row items-start gap-4">
        <details>
          <summary>Chat</summary>
          <Chat />
        </details>

        <details>
          <summary>Create Deck</summary>
          <form
            className="flex w-full flex-1 flex-col gap-4 md:w-[512px]"
            action={async (formData) => {
              "use server";
              await api.card.create(formData);
              // await createCardAction(formData);
            }}
          >
            <div>
              <Input type="text" id="name" name="name" label="Name:" required />
            </div>
            <div>
              <Input
                type="textarea"
                id="desc"
                name="desc"
                label="Description:"
              />
            </div>
            <div>
              <Input
                type="textarea"
                id="shortDesc"
                name="shortDesc"
                label="Short Description:"
              />
            </div>

            <FormButton variant="cta">Create Deck</FormButton>
          </form>
        </details>

        <details>
          <summary>Create Card</summary>
          <form
            className="flex w-full flex-1 flex-col gap-4 md:w-[512px]"
            action={async (formData: FormData) => {
              "use server";

              const name = formData.get("name") as string;
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
              const abilities = formData.get("abilities") as string;

              await api.card.create({
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
              });
            }}
          >
            <Input type="text" id="name" name="name" label="Name:" required />

            <Input type="textarea" id="desc" name="desc" label="Description:" />

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
        </details>
        <details>
          <summary>Create Cards Json</summary>
          <form
            className="flex w-full flex-1 flex-col gap-4 md:w-[512px]"
            action={async (formData: FormData) => {
              "use server";
              const cardJsonArray = formData.get("cardJsonArray") as string;

              console.log("cardJsonArray", cardJsonArray);

              type CardType = Card[];

              const cards: CardType = JSON.parse(cardJsonArray) as CardType;

              console.log("cards", cards);

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

              // await createCardAction(formData);
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
      </div>
    </div>
  );
}
