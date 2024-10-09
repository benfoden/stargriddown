"use client";

import Button from "~/app/_components/Button";
import ButtonCopyLink from "~/app/_components/ButtonCopyLink";
import { FormMessage } from "~/app/_components/FormMessage";
import { encodedRedirect } from "~/utils/misc";
import { type AuthUser } from "~/utils/supabase/getUser";

export default function MatchPage({
  user,
  params,
  searchParams,
}: {
  user?: AuthUser;
  params: { id: string };
  searchParams: { message: string };
}) {
  const { id } = params;
  if (!user) {
    encodedRedirect(
      "success",
      `/sign-up`,
      "Please sign up to join your match.",
      id,
    );
  }
  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <FormMessage message={searchParams} />
      <div>Match {id}</div>
      <ButtonCopyLink />
      <div className="flex flex-col gap-4">
        <Button variant="cta">Player 1 ready</Button>
        <Button variant="cta">Player 2 ready</Button>
        Starting match...5
      </div>
    </div>
  );
}
