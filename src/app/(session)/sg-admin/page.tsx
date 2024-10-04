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
