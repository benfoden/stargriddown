import Link from "next/link";
import Button from "~/app/_components/Button";
import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import { api } from "~/trpc/server";

export default async function DeckssPage() {
  const decks = await api.deck.getAll();

  return (
    <div>
      decks
      <div className="flex w-full flex-row items-start justify-center gap-4">
        <aside className="flex flex-col gap-2">
          {decks.map((deck) => (
            <Link href={`/sg-admin/decks/${deck.id}`} key={deck.id}>
              <Button variant="listItem">{deck.name}</Button>
            </Link>
          ))}
        </aside>
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

              await api.deck.create({
                name,
                desc,
                shortDesc,
                type,
                image,
              });
            }}
          >
            <Input type="text" id="name" name="name" label="Name:" required />
            <Input type="text" id="type" name="type" label="Type:" required />

            <Input type="textarea" id="desc" name="desc" label="Description:" />

            <Input
              type="textarea"
              id="shortDesc"
              name="shortDesc"
              label="Short Description:"
            />

            <Input type="text" id="image" name="image" label="Image URL:" />

            <FormButton variant="cta">Create Deck</FormButton>
          </form>
        </Card>
      </div>
    </div>
  );
}
