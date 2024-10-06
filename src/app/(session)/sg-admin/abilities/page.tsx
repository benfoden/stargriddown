import Link from "next/link";
import Button from "~/app/_components/Button";
import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import { api } from "~/trpc/server";

export default async function AbilitesPage() {
  const abilities = await api.ability.getAll();

  return (
    <div>
      abilities
      <details>
        <summary>All abilities</summary>
        <code>
          <pre>{JSON.stringify(abilities, null, 2)}</pre>
        </code>
      </details>
      <div className="flex w-full flex-row items-start justify-center gap-4">
        <aside className="flex flex-col gap-2">
          {abilities.map((ability) => (
            <Link href={`/sg-admin/abilities/${ability.id}`} key={ability.id}>
              <Button variant="listItem" key={ability.id}>
                {ability.name}
              </Button>
            </Link>
          ))}
        </aside>
        <Card variant="form">
          <form
            className="flex w-full flex-1 flex-col gap-4 md:w-[512px]"
            action={async (formData: FormData) => {
              "use server";

              const name = formData.get("name") as string;
              const variant = formData.get("variant") as string;
              const shortDesc = formData.get("shortDesc") as string | null;
              const isUsable = formData.get("isUsable") === "true";
              const desc = formData.get("desc") as string | null;
              const attack = formData.get("attack")
                ? parseFloat(formData.get("attack") as string)
                : null;
              const defense = formData.get("defense")
                ? parseFloat(formData.get("defense") as string)
                : null;
              const yen = formData.get("yen")
                ? parseFloat(formData.get("yen") as string)
                : null;
              const lag = formData.get("lag")
                ? parseFloat(formData.get("lag") as string)
                : null;
              const datab = formData.get("datab")
                ? parseFloat(formData.get("datab") as string)
                : null;
              const mw = formData.get("mw")
                ? parseFloat(formData.get("mw") as string)
                : null;
              const logic = formData.get("logic") as string | null;
              const costYen = formData.get("costYen")
                ? parseFloat(formData.get("costYen") as string)
                : null;
              const costDatab = formData.get("costDatab")
                ? parseFloat(formData.get("costDatab") as string)
                : null;
              const costMw = formData.get("costMw")
                ? parseFloat(formData.get("costMw") as string)
                : null;
              const costLag = formData.get("costLag")
                ? parseFloat(formData.get("costLag") as string)
                : null;
              const image = formData.get("image") as string | null;

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const abilityData = {
                name,
                variant,
                isUsable,
                shortDesc: shortDesc ?? undefined,
                desc: desc ?? undefined,
                attack: attack ?? undefined,
                defense: defense ?? undefined,
                yen: yen ?? undefined,
                lag: lag ?? undefined,
                datab: datab ?? undefined,
                mw: mw ?? undefined,
                logic: logic ?? undefined,
                costYen: costYen ?? undefined,
                costDatab: costDatab ?? undefined,
                costMw: costMw ?? undefined,
                costLag: costLag ?? undefined,
                image: image ?? undefined,
              };

              await api.ability.create(abilityData);
            }}
          >
            <Input type="text" id="name" name="name" label="Name:" required />

            <Input
              type="text"
              id="variant"
              name="variant"
              label="Variant (passive, active, beginningOfTurn, endOfTurn):"
              required
            />
            <Input type="textarea" id="desc" name="desc" label="Description:" />

            <Input
              type="textarea"
              id="shortDesc"
              name="shortDesc"
              label="Short Description:"
            />

            <Input
              type="checkbox"
              id="isUsable"
              name="isUsable"
              label="Is Usable:"
            />

            <Input type="number" id="attack" name="attack" label="Attack:" />

            <Input type="number" id="defense" name="defense" label="Defense:" />

            <Input type="number" id="yen" name="yen" label="Yen:" />

            <Input type="number" id="lag" name="lag" label="Lag:" />

            <Input type="number" id="datab" name="datab" label="Datab:" />

            <Input type="number" id="mw" name="mw" label="MW:" />

            <Input type="text" id="logic" name="logic" label="Logic:" />

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

            <FormButton variant="cta">Create Ability</FormButton>
          </form>
        </Card>
      </div>
    </div>
  );
}
