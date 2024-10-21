"use server";
import { api } from "~/trpc/server";
import { encodedRedirect } from "~/utils/misc";

export async function deleteMatchAction({ id }: { id: string }) {
  await api.match.delete({ id });
  encodedRedirect("success", `/home`, `Match deleted.`);
}

export async function createMatchAction() {
  const userMatches = await api.match.getAllUserMatches();

  if (userMatches.some((match) => match.statuses.includes("active"))) {
    encodedRedirect(
      "error",
      `/home`,
      `You're already in a match. Leave or finish first.`,
    );
    return;
  }

  const match = await api.match.create();
  if (match?.id) {
    encodedRedirect("success", `/match/${match?.id}`, `Match created.`);
  } else {
    encodedRedirect("error", `/home`, `Error creating match.`);
  }
}
