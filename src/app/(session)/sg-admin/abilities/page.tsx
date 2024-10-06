import Link from "next/link";
import Button from "~/app/_components/Button";
import { FormMessage } from "~/app/_components/FormMessage";
import { api } from "~/trpc/server";
import AbilityEditForm from "./AbilityEditForm";

export default async function AbilitiesPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const abilities = await api.ability.getAll();

  return (
    <div>
      abilities
      <FormMessage message={searchParams} />
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
        <AbilityEditForm />
      </div>
    </div>
  );
}
