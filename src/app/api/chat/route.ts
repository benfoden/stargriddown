import { type NextRequest } from "next/server";
import { getResponseFromChatMessages } from "~/utils/ai";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    userId: string;
    messages: { id: string | undefined | null; content: string }[];
    returnJson: boolean;
  };

  const { messages, userId, returnJson } = body;

  return Response.json({
    newMessage: await getResponseFromChatMessages({
      messages,
      userId,
      model: "gpt-4o",
      returnJson,
    }),
  });
}
