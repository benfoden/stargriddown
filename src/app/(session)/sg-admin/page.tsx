import Chat from "./Chat";

export default async function AdminPage() {
  return (
    <div className="flex w-full flex-col items-center justify-start px-8">
      <div>Admin Page</div>

      <div className="flex flex-row items-start gap-4">
        <details>
          <summary>Chat</summary>
          <Chat />
        </details>
      </div>
    </div>
  );
}
