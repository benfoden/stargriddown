import { type Ability } from "@prisma/client";
import Link from "next/link";
import Button from "~/app/_components/Button";
import FormButton from "~/app/_components/FormButton";
import { FormMessage } from "~/app/_components/FormMessage";
import Input from "~/app/_components/Input";
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
      <div className="flex w-full flex-row items-start justify-center gap-4">
        <aside className="flex flex-col gap-2">
          <details>
            <summary>Create Abilities Json</summary>
            <form
              className="flex w-full flex-1 flex-col gap-4 md:w-[512px]"
              action={async (formData: FormData) => {
                "use server";
                const abilityJsonArray = formData.get(
                  "abilityJsonArray",
                ) as string;

                const abilities: Ability[] = JSON.parse(
                  abilityJsonArray,
                ) as Ability[];

                for (const ability of abilities) {
                  const {
                    name,
                    type,
                    shortDesc,
                    targetType,
                    desc,
                    attack,
                    defense,
                    yen,
                    lag,
                    datab,
                    mw,
                    logic,
                    costYen,
                    costDatab,
                    costMw,
                    costLag,
                    image,
                    ruleSet,
                  } = ability;

                  await api.ability.create({
                    name: name ?? undefined,
                    type: type ?? undefined,
                    shortDesc: shortDesc ?? undefined,
                    targetType: targetType ?? undefined,
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
                    ruleSet: ruleSet ?? undefined,
                  });
                }
              }}
            >
              <Input
                type="textarea"
                id="abilityJsonArray"
                name="abilityJsonArray"
                label="JSON Array:"
              />
              <details>
                <summary>Example</summary>
                <code>
                  <pre>
                    {JSON.stringify(
                      [
                        {
                          name: "Ability 1",
                          shortName: "Ability 1",
                          variant: "active",
                          shortDesc: "Ability 1 short desc",
                          isUsable: true,
                          targetType: "opponent",
                          desc: "Ability 1 desc",
                          attack: 1,
                          defense: 1,
                          yen: 1,
                          lag: 1,
                          datab: 1,
                          mw: 1,
                          logic: "and",
                          costYen: 1,
                          costDatab: 1,
                          costMw: 1,
                          costLag: 1,
                          image: "https://example.com/image.png",
                        },
                      ],
                      null,
                      2,
                    )}
                  </pre>
                </code>
              </details>

              <FormButton variant="cta">Create Abilities</FormButton>
            </form>
          </details>
          <div className="flex flex-col gap-2">
            {abilities.map((ability) => (
              <Link href={`/sg-admin/abilities/${ability.id}`} key={ability.id}>
                <Button variant="listItem">
                  <div className="flex w-full justify-between">
                    {ability.name}
                    <span className="text-xs opacity-60">
                      {ability.ruleSet ? "Ruleset" : ""} {ability.ruleSet}
                    </span>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </aside>
        <AbilityEditForm />
      </div>
    </div>
  );
}
