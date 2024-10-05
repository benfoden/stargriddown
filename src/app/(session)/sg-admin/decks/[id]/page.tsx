import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import { api } from "~/trpc/server";

export default async function DeckPage({ params }: { params: { id: string } }) {
  const deck = await api.deck.get({ id: params.id });
  if (!deck) {
    throw new Error("Deck not found");
  }
  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <div className="flex flex-row gap-4">
        <Card variant="form">
          <form
            action={async (formData: FormData) => {
              "use server";

              const name = formData.get("name") as string;
              const desc = formData.get("desc") as string;
              const shortDesc = formData.get("shortDesc") as string;
              const image = formData.get("image") as string;
              const type = formData.get("type") as string;

              await api.deck.update({
                id: params.id,
                name,
                desc,
                shortDesc,
                type,
                image,
              });
            }}
          >
            <code className="text-xs">{deck.id}</code>
            <Input
              type="text"
              id="name"
              name="name"
              label="Name:"
              initialValue={deck.name}
              required
            />
            <Input
              type="text"
              id="type"
              name="type"
              label="Type:"
              initialValue={deck.type ?? ""}
              required
            />

            <Input
              type="text"
              id="desc"
              name="desc"
              label="Description:"
              initialValue={deck.desc ?? ""}
            />
            <Input
              type="text"
              id="shortDesc"
              name="shortDesc"
              label="Short Description:"
              initialValue={deck.shortDesc ?? ""}
            />

            <Input
              type="text"
              id="image"
              name="image"
              label="Image URL:"
              initialValue={deck.image ?? ""}
            />

            <FormButton variant="submit">Update Deck</FormButton>
          </form>
        </Card>
      </div>
    </div>
  );
}
