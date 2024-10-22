"use client";

import { type Deck, type Match } from "@prisma/client";
import { type RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import Button from "~/app/_components/Button";
import ButtonCopyLink from "~/app/_components/ButtonCopyLink";
import { Card } from "~/app/_components/Card";
import { FormMessage } from "~/app/_components/FormMessage";
import Spinner from "~/app/_components/Spinner";
import { api } from "~/trpc/react";
import { encodedRedirect } from "~/utils/misc";
import { createClient } from "~/utils/supabase/client";
import { type AuthUser } from "~/utils/supabase/getUser";

export default function MatchPage({
  initialMatch,
  initialDecks,
  user,
  searchParams,
}: {
  initialMatch: Match;
  initialDecks: Deck[];
  user?: AuthUser;
  searchParams: { message: string };
}) {
  if (!initialMatch) {
    throw new Error("no match found!");
  }
  const supabase = createClient();
  const channel = useRef<RealtimeChannel | null>(null);
  const update = api.match.update.useMutation();

  const [state, setState] = useState<Match>(initialMatch);
  const [present, setPresent] = useState<string[]>([]);

  const [player, setPlayer] = useState({
    startingDeckId: "",
    startingDeckConfirmed: false,
    marketDeckId: "",
    marketDeckConfirmed: false,
  });

  useEffect(() => {
    if (!channel.current) {
      channel.current = supabase.channel(`match-${initialMatch.id}`);
    }
    console.log(
      "Setting up Supabase channel for match updates and presence on:",
      initialMatch.id,
    );

    const userStatus = {
      user: user?.id ?? "anonymous",
      online_at: new Date().toISOString(),
    };

    channel.current
      ?.on("presence", { event: "sync" }, () => {
        const newState = channel.current?.presenceState();
        console.log("sync", newState);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("join", key, newPresences);
        setPresent((prev) => [
          ...prev,
          ...newPresences.map((presence) => presence.user as string),
        ]);
        console.log("joined", newPresences);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("leave", key, leftPresences);
        setPresent((prev) =>
          prev.filter(
            (id) => !leftPresences.some((presence) => presence.user === id),
          ),
        );
      })
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Match",
        },
        (payload) => {
          const updatedState = payload.new as Match;
          if (updatedState?.matchState) {
            setState((prev) => ({
              ...prev,
              matchState: updatedState.matchState,
            }));
          } else {
            console.error("Invalid payload structure", payload);
          }
        },
      )

      .subscribe((status) => {
        if (status !== "SUBSCRIBED") {
          return;
        }

        void channel.current?.track(userStatus);
      });

    return () => {
      void channel.current?.unsubscribe();
      channel.current = null;
    };
  }, [initialMatch.id, supabase, user?.id]);

  if (!user) {
    encodedRedirect(
      "success",
      `/sign-up`,
      "Please sign up to join your match.",
      initialMatch.id,
    );
    return;
  }

  /*
  todo
  - match prep component
  - display available decks - simplified list of cards, title, emoji
  - select starting deck and market deck
  - wait for both players to confirm both decks
  - lobby details

  */

  return (
    <>
      <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
        <FormMessage message={searchParams} />

        <div className="flex flex-col gap-4">
          {present.length === 2 ? (
            <Button variant="cta">Ready up</Button>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <Spinner size="md" />
              {present.length === 1 && <p>Loaded, waiting for player 2</p>}
            </div>
          )}
          {present.length < 2 && <ButtonCopyLink />}
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-4 md:max-w-5xl">
          {!player.startingDeckConfirmed ? (
            <>
              <h2 className="text-2xl">Select a starting deck</h2>
              <ul className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
                {initialDecks
                  .filter((deck) => deck.type === "starting")
                  .map((deck) => (
                    <button
                      key={deck.id}
                      onClick={() =>
                        setPlayer((prev) => ({
                          ...prev,
                          startingDeckId: deck.id,
                        }))
                      }
                    >
                      <Card
                        variant="narrow"
                        status={
                          deck.id === player.startingDeckId ? "active" : null
                        }
                      >
                        {deck.name}{" "}
                        <span className="font-white capitalize-none text-sm">
                          {deck.desc}
                        </span>
                      </Card>
                    </button>
                  ))}
              </ul>
              <Button
                variant="cta"
                disabled={!player.startingDeckId}
                onClick={() =>
                  setPlayer((prev) => ({
                    ...prev,
                    startingDeckConfirmed: true,
                  }))
                }
              >
                Confirm
              </Button>
            </>
          ) : (
            <div>
              Starting deck
              {initialDecks
                .filter((deck) => deck.id === player.startingDeckId)
                .map((deck) => (
                  <Card variant="narrow" isButton={false} key={deck.id}>
                    {deck.name}
                    <span className="font-white capitalize-none text-sm">
                      {deck.desc}
                    </span>
                  </Card>
                ))}
            </div>
          )}

          {player.startingDeckConfirmed && !player.marketDeckConfirmed ? (
            <>
              <h2 className="text-2xl">Select a market deck</h2>
              <ul className="flex w-full flex-row flex-wrap items-center justify-center gap-4">
                {initialDecks
                  .filter((deck) => deck.type === "market")
                  .map((deck) => (
                    <button
                      key={deck.id}
                      onClick={() =>
                        setPlayer((prev) => ({
                          ...prev,
                          marketDeckId: deck.id,
                        }))
                      }
                    >
                      <Card
                        variant="narrow"
                        status={
                          deck.id === player.marketDeckId ? "active" : null
                        }
                      >
                        {deck.name}
                        <span className="font-white text-sm opacity-90">
                          {deck.desc}
                        </span>
                      </Card>
                    </button>
                  ))}
              </ul>
              <Button
                variant="cta"
                disabled={!player.marketDeckId}
                onClick={() =>
                  setPlayer((prev) => ({ ...prev, marketDeckConfirmed: true }))
                }
              >
                Confirm
              </Button>
            </>
          ) : (
            <div>
              Market deck
              {initialDecks
                .filter((deck) => deck.id === player.marketDeckId)
                .map((deck) => (
                  <Card variant="narrow" isButton={false} key={deck.id}>
                    {deck.name}{" "}
                    <span className="font-white capitalize-none text-sm">
                      {deck.desc}
                    </span>
                  </Card>
                ))}
            </div>
          )}
        </div>
        <Button
          onClick={async () => {
            update.mutate({
              id: initialMatch.id,
              matchState: { hello: `${Math.random()}` },
            });
          }}
        >
          Change State
        </Button>
        <div>
          Match state:
          <pre>{JSON.stringify(state.matchState, null, 2)}</pre>
          Player state:
          <pre>{JSON.stringify(player, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}
