import { FormMessage } from "~/app/_components/FormMessage";
import { api } from "~/trpc/server";
import AbilityEditForm from "../AbilityEditForm";

export default async function AbilityPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { message: string };
}) {
  const ability = await api.ability.get({ id: params.id });
  if (!ability) {
    throw new Error("ability not found");
  }
  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <FormMessage message={searchParams} />

      <div className="flex flex-row gap-4">
        <AbilityEditForm ability={ability} />
      </div>
    </div>
  );
}
