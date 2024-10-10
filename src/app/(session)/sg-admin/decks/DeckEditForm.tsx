import { type Deck } from "@prisma/client";
import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import { api } from "~/trpc/server";
import { DECKTYPES } from "~/utils/game/constants";
import { encodedRedirect } from "~/utils/misc";

export default function DeckEditForm({ deck }: { deck?: Deck }) {
  return (
    <Card variant="form">
      <form
        className="flex w-full flex-1 flex-col gap-4 md:w-[512px]"
        action={async (formData: FormData) => {
          "use server";

          const name = formData.get("name") as string;
          const type = formData.get("type") as string;
          const desc = formData.get("desc") as string;
          const shortDesc = formData.get("shortDesc") as string;
          const image = formData.get("image") as string;

          const data = {
            name,
            desc,
            shortDesc,
            type,
            image,
          };

          if (deck?.id) {
            await api.deck.update({ id: deck?.id, ...data });
          } else {
            await api.deck.create(data);
          }

          encodedRedirect(
            "success",
            `${deck?.id ? `/sg-admin/decks/${deck?.id}` : `/sg-admin/decks`}`,
            `${deck?.id ? "Updated" : "Created"} deck`,
          );
        }}
      >
        <Input name="name" label="Name:" initialValue={deck?.name} required />
        <Input
          type="text"
          id="type"
          name="type"
          label="Type:"
          initialValue={deck?.type ?? ""}
          required
        />
        <div className="flex flex-row gap-2">
          {Object.values(DECKTYPES).map((deckType) => (
            <div key={deckType}>{deckType}</div>
          ))}
        </div>

        <Input
          type="text"
          id="desc"
          name="desc"
          label="Description:"
          initialValue={deck?.desc ?? ""}
        />
        <Input
          type="text"
          id="shortDesc"
          name="shortDesc"
          label="Short Description:"
          initialValue={deck?.shortDesc ?? ""}
        />

        <Input
          type="text"
          id="image"
          name="image"
          label="Image URL:"
          initialValue={deck?.image ?? ""}
        />

        <FormButton variant="cta">
          {deck?.id ? "Update" : "Create"} deck
        </FormButton>
      </form>
    </Card>
  );
}
