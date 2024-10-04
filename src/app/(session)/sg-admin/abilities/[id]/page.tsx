import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import { api } from "~/trpc/server";

export default async function AbilityPage({
  params,
}: {
  params: { id: string };
}) {
  const ability = await api.ability.get({ id: params.id });
  if (!ability) {
    throw new Error("ability not found");
  }
  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <div className="flex flex-row gap-4">
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

              await api.ability.update({ id: params.id, ...abilityData });
            }}
          >
            <Input
              type="text"
              id="name"
              name="name"
              label="Name:"
              initialValue={ability.name}
              required
            />
            <Input
              type="text"
              id="variant"
              name="variant"
              label="Variant (passive, active, beginningOfTurn, endOfTurn):"
              initialValue={ability.variant}
              required
            />
            <Input
              type="text"
              id="desc"
              name="desc"
              label="Description:"
              initialValue={ability.desc ?? ""}
            />

            <Input
              type="text"
              id="shortDesc"
              name="shortDesc"
              label="Short Description:"
              initialValue={ability.shortDesc ?? ""}
            />

            <Input
              type="number"
              id="yen"
              name="yen"
              label="Yen:"
              initialValue={ability.yen ?? 0}
            />

            <Input
              type="number"
              id="attack"
              name="attack"
              label="Attack:"
              initialValue={ability.attack ?? 0}
            />

            <Input
              type="number"
              id="datab"
              name="datab"
              label="Datab:"
              initialValue={ability.datab ?? 0}
            />

            <Input
              type="number"
              id="defense"
              name="defense"
              label="Defense:"
              initialValue={ability.defense ?? 0}
            />

            <Input
              type="number"
              id="mw"
              name="mw"
              label="MW:"
              initialValue={ability.mw ?? 0}
            />

            <Input
              type="number"
              id="lag"
              name="lag"
              label="Lag:"
              initialValue={ability.lag ?? 0}
            />

            <Input
              type="number"
              id="costYen"
              name="costYen"
              label="Cost Yen:"
              initialValue={ability.costYen ?? 0}
            />

            <Input
              type="number"
              id="costDatab"
              name="costDatab"
              label="Cost Datab:"
              initialValue={ability.costDatab ?? 0}
            />

            <Input
              type="number"
              id="costMw"
              name="costMw"
              label="Cost MW:"
              initialValue={ability.costMw ?? 0}
            />

            <Input
              type="number"
              id="costLag"
              name="costLag"
              label="Cost Lag:"
              initialValue={ability.costLag ?? 0}
            />

            <Input
              type="text"
              id="image"
              name="image"
              label="Image URL:"
              initialValue={ability.image ?? ""}
            />

            <Input
              type="text"
              id="desc"
              name="desc"
              label="Description:"
              initialValue={ability.desc ?? ""}
            />

            <FormButton variant="submit">Update ability</FormButton>
          </form>
        </Card>
      </div>
    </div>
  );
}
