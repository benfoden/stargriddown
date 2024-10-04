import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import MatchCard from "~/app/_components/MatchCard";
import { api } from "~/trpc/server";

export default async function CardPage({ params }: { params: { id: string } }) {
  const card = await api.card.get({ id: params.id });
  if (!card) {
    throw new Error("Card not found");
  }
  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <div className="flex flex-row gap-4">
        <MatchCard card={card} />
        <Card variant="form">
          <Input
            type="text"
            id="name"
            name="name"
            label="Name:"
            initialValue={card.name}
            required
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
            type="text"
            id="image"
            name="image"
            label="Image URL:"
            initialValue={card.image ?? ""}
          />

          <Input
            type="textarea"
            id="abilities"
            name="abilities"
            label="Abilities:"
            initialValue={JSON.stringify(card.abilities) ?? ""}
          />

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
        </Card>
      </div>
    </div>
  );
}
