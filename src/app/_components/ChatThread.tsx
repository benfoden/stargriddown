"use client";
import { useState } from "react";
import { Card } from "~/app/_components/Card";
import FormButton from "~/app/_components/FormButton";
import Input from "~/app/_components/Input";
import Spinner from "~/app/_components/Spinner";
import { useUser } from "~/utils/supabase/useUser";

export default function ChatThread({
  firstMessage,
}: {
  firstMessage?: string;
}) {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { id: string | undefined | null; content: string }[]
  >([{ id: "system", content: firstMessage ?? "" }]);

  const handleMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const chatInput =
      e.currentTarget.querySelector<HTMLInputElement>("#chatInput");
    const returnJson =
      e.currentTarget.querySelector<HTMLInputElement>("#returnJson");
    const currentContent = chatInput?.value ?? "";

    if (!currentContent || currentContent.length === 0) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { id: "user", content: currentContent }],
          userId: user?.id,
          returnJson: returnJson?.checked ?? false,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const reply = (await response.json()) as {
        newMessage: {
          id: string | null | undefined;
          content: string;
        };
      };
      setMessages((prevMessages) => [...prevMessages, reply.newMessage]);
    } catch (error) {
      console.error("Failed to fetch new messages:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="my-2 w-full md:max-w-2xl">
      <Card isButton={false}>
        <div className="w-full">
          {messages.slice(1).map((message, index) => (
            <Card key={index} isButton={false}>
              <div
                key={index}
                className="flex w-full flex-row items-start gap-2"
              >
                <p className="text-xs font-bold">{message.id?.slice(0, 10)}</p>
                <p>{message.content}</p>
              </div>
            </Card>
          ))}
          {isLoading && (
            <div className="my-2 flex w-full flex-row items-center justify-center">
              <Spinner />
            </div>
          )}

          <form
            onSubmit={(event) => handleMessage(event)}
            className="flex w-full flex-col"
          >
            <Input type="textarea" id="chatInput" initialValue={""} />
            <Input type="checkbox" id="returnJson" label="Return JSON" />
            <FormButton isDisabled={isLoading} variant="submit">
              enter
            </FormButton>
          </form>
        </div>
      </Card>
    </div>
  );
}
