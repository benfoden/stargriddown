import { type Match } from "@prisma/client";
import { api } from "~/trpc/server";

import { InitialMatchState, type MatchStateType } from "~/game/constants";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const {
    id,
    player1StartDeckId,
    player2StartDeckId,
    player1MarketDeckId,
    player2MarketDeckId,
  } = (await req.json()) as Match;
  const match = await api.match.get({ id });

  if (!match) {
    return new Response(
      JSON.stringify({ error: "no match found for given id" }),
      {
        status: 404,
      },
    );
  }
  if (
    !player1StartDeckId ||
    !player2StartDeckId ||
    !player1MarketDeckId ||
    !player2MarketDeckId
  ) {
    return new Response(JSON.stringify({ error: "deck id not found" }), {
      status: 400,
    });
  }

  const [
    player1StartDeck,
    player2StartDeck,
    player1MarketDeck,
    player2MarketDeck,
  ] = await Promise.all([
    api.card.getByDeckId({ deckId: player1StartDeckId }),
    api.card.getByDeckId({ deckId: player2StartDeckId }),
    api.card.getByDeckId({ deckId: player1MarketDeckId }),
    api.card.getByDeckId({ deckId: player2MarketDeckId }),
  ]);

  if (
    !player1StartDeck ||
    !player2StartDeck ||
    !player1MarketDeck ||
    !player2MarketDeck
  ) {
    return new Response(JSON.stringify({ error: "deck not found" }), {
      status: 400,
    });
  }

  //todo: what else needs to be added here to the state to initialize?
  const matchState: MatchStateType = InitialMatchState;
  matchState.player1.startDeck = player1StartDeck;
  matchState.player2.startDeck = player2StartDeck;
  matchState.player1.marketDeck = player1MarketDeck;
  matchState.player2.marketDeck = player2MarketDeck;

  await api.match.update({
    id,
    player1StartDeckId,
    player2StartDeckId,
    player1MarketDeckId,
    player2MarketDeckId,
    statuses: JSON.stringify([
      ...(JSON.parse(match.statuses) as string[]),
      "started",
    ]),
    matchState,
    startedAt: new Date(),
  });

  return new Response(JSON.stringify(matchState), { status: 200 }); // Return a Response object
}
