import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import { api } from "~/trpc/server";

export default async function AdminPage() {
  return (
    <div className="flex w-full flex-col items-center justify-start px-8">
      <div>Admin Page</div>

      <details>
        <summary>Create Card</summary>
        <form
          className="flex w-full flex-1 flex-col gap-4 md:w-[512px]"
          action={async (formData) => {
            "use server";
            await api.card.createCard.mutateAsync(formData);
            // await createCardAction(formData);
          }}
        >
          <div>
            <Input type="text" id="name" name="name" label="Name:" required />
          </div>
          <div>
            <Input type="textarea" id="desc" name="desc" label="Description:" />
          </div>
          <div>
            <Input
              type="textarea"
              id="shortDesc"
              name="shortDesc"
              label="Short Description:"
            />
          </div>
          <div>
            <Input type="textarea" id="flavor" name="flavor" label="Flavor:" />
          </div>
          <div>
            <Input type="number" id="yen" name="yen" label="Yen:" />
          </div>
          <div>
            <Input type="number" id="attack" name="attack" label="Attack:" />
          </div>
          <div>
            <Input type="number" id="datab" name="datab" label="Datab:" />
          </div>
          <div>
            <Input type="number" id="defense" name="defense" label="Defense:" />
          </div>
          <div>
            <Input type="number" id="mw" name="mw" label="MW:" />
          </div>
          <div>
            <Input type="number" id="lag" name="lag" label="Lag:" />
          </div>
          <div>
            <Input
              type="number"
              id="costYen"
              name="costYen"
              label="Cost Yen:"
            />
          </div>
          <div>
            <Input
              type="number"
              id="costDatab"
              name="costDatab"
              label="Cost Datab:"
            />
          </div>
          <div>
            <Input type="number" id="costMw" name="costMw" label="Cost MW:" />
          </div>
          <div>
            <Input
              type="number"
              id="costLag"
              name="costLag"
              label="Cost Lag:"
            />
          </div>
          <div>
            <Input type="text" id="image" name="image" label="Image URL:" />
          </div>
          <div>
            <Input
              type="textarea"
              id="abilities"
              name="abilities"
              label="Abilities:"
            />
          </div>
          <FormButton variant="cta">Create Card</FormButton>
        </form>
      </details>
    </div>
  );
}
