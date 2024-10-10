"use client";

import { type Match } from "@prisma/client";
import { useEffect, useState } from "react";
import Button from "~/app/_components/Button";
import ButtonCopyLink from "~/app/_components/ButtonCopyLink";
import FormDeleteButton from "~/app/_components/FormDeleteButton";
import { FormMessage } from "~/app/_components/FormMessage";
import { api } from "~/trpc/react";
import { encodedRedirect } from "~/utils/misc";
import { createClient } from "~/utils/supabase/client";
import { type AuthUser } from "~/utils/supabase/getUser";
import { deleteMatchAction } from "../actions";

export default function MatchPage({
  initialMatch,
  user,
  params,
  searchParams,
}: {
  initialMatch: Match;
  user?: AuthUser;
  params: { id: string };
  searchParams: { message: string };
}) {
  if (!initialMatch) {
    throw new Error("no match found!");
  }
  const supabase = createClient();

  const [state, setState] = useState<Match["matchState"]>(
    initialMatch.matchState,
  );
  const update = api.match.update.useMutation();

  if (!user) {
    encodedRedirect(
      "success",
      `/sign-up`,
      "Please sign up to join your match.",
      initialMatch.id,
    );
  }

  //  investigate using RLS: https://github.com/supabase/supabase-flutter/issues/954
  useEffect(() => {
    console.log(
      "Setting up Supabase channel for match updates on:",
      initialMatch.id,
    );
    const channel = supabase
      .channel(`match-${initialMatch.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Match",
        },
        (payload) => {
          const updatedState = payload.new;
          if (updatedState) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setState(updatedState.matchState);
          } else {
            console.error("Invalid payload structure", payload);
          }
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [initialMatch.id, supabase]);

  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <FormMessage message={searchParams} />
      <div>match-{initialMatch.id}</div>
      <nav className="flex flex-row items-center justify-between gap-4">
        <ButtonCopyLink />
        <form
          action={async () => {
            await deleteMatchAction({ id: initialMatch.id });
          }}
        >
          <FormDeleteButton>Cancel match</FormDeleteButton>
        </form>
      </nav>
      <div className="flex flex-col gap-4">
        <Button variant="cta">Player 1 ready</Button>
        <Button variant="cta">Player 2 ready</Button>
        Starting match...5
      </div>
      <button
        onClick={async () => {
          update.mutate({
            id: initialMatch.id,
            matchState: { hello: `${Math.random()}` },
          });
        }}
      >
        Change State
      </button>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}
