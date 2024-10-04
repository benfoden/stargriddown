export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message }) {
  return (
    <div className="flex w-full max-w-md flex-col text-sm">
      {"success" in message && (
        <div className="sharp-sm flex flex-col items-start justify-center border-l-8 border-emerald-600 bg-emerald-600/20 px-4 py-2 text-emerald-500">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="sharp-sm flex flex-col items-start justify-center border-l-8 border-red-600 bg-red-600/20 px-4 py-2 text-red-500">
          {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="sharp-sm flex flex-col items-start justify-center border-l-8 border-amber-600 bg-amber-600/20 px-4 py-2 text-amber-500">
          {message.message}
        </div>
      )}
    </div>
  );
}
