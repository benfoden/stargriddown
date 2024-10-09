"use client";

import { type MatchState } from "@prisma/client";
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
  initialMatch: MatchState;
  user?: AuthUser;
  params: { id: string };
  searchParams: { message: string };
}) {
  if (!initialMatch) {
    throw new Error("no match found!");
  }
  const supabase = createClient();
  const { id } = params;

  const [state, setState] = useState<MatchState["state"]>(initialMatch.state);

  const update = api.match.updateState.useMutation();

  if (!user) {
    encodedRedirect(
      "success",
      `/sign-up`,
      "Please sign up to join your match.",
      id,
    );
  }

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
          table: "MatchState",
          filter: `id=eq.${initialMatch.id}`,
        },
        (payload) => {
          console.log("Received payload from Supabase:", payload);

          const updatedState = payload.new;
          if (updatedState) {
            console.log("Updating state with new data:", updatedState.state);
            setState(updatedState.state);
          } else {
            console.error("Invalid payload structure", payload);
          }
        },
      )
      .subscribe();

    return () => {
      console.log("Cleaning up Supabase channel");
      void supabase.removeChannel(channel);
    };
  }, [initialMatch.id, supabase]);

  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <FormMessage message={searchParams} />
      <div>Match {id}</div>
      <nav className="flex flex-row items-center justify-between gap-4">
        <ButtonCopyLink />
        <form
          action={async () => {
            await deleteMatchAction({ id });
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
        onClick={() => {
          update.mutate({
            id: initialMatch.id,
            state: { hello: `1` },
          });
        }}
      >
        Change State
      </button>
      {initialMatch.id}
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}
