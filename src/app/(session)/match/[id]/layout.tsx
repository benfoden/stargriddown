import { type Metadata } from "next";
import { getUser } from "~/utils/supabase/getUser";
import MatchPage from "./page";

export const metadata: Metadata = {
  title: `Match`,
  description: "Stargrid Match page",
};

export default async function MatchLayout({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { message: string };
}) {
  const user = await getUser();
  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-12">
        <MatchPage
          user={user ?? undefined}
          params={params}
          searchParams={searchParams}
        />
      </div>
    </>
  );
}
