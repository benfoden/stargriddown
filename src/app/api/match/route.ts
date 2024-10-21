import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const { id, turn } = await req.json();
  const match = await api.match.get({ id });

  // Assuming gameState is defined somewhere in your code
  const gameState = {}; // Placeholder for actual game state logic

  return new Response(JSON.stringify(gameState), { status: 200 }); // Return a Response object
}
