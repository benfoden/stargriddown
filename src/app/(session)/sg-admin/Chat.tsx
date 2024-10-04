"use client";

import ChatThread from "~/app/_components/ChatThread";

export default function Chat() {
  return (
    <div className="flex w-full flex-col items-center justify-start px-8">
      <ChatThread />
    </div>
  );
}
