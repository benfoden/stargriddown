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
        </Card>
      </div>
    </div>
  );
}
