import FormButton from "~/app/_components/FormButton";
import { api } from "~/trpc/server";
import { encodedRedirect } from "~/utils/misc";

export default function NewMatchButton() {
  return (
    <form
      className="flex flex-col gap-2"
      action={async () => {
        "use server";
        const match = await api.match.create();
        if (match?.id) {
          encodedRedirect("success", `/match/${match?.id}`, `Match created.`);
        } else {
          encodedRedirect("error", `/home`, `Error creating match.`);
        }
      }}
    >
      <FormButton variant="action">
        <span className="flex w-32 justify-center">Create game</span>
      </FormButton>
    </form>
  );
}
