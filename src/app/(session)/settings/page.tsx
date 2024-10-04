import { redirect } from "next/navigation";
import { getUser } from "~/utils/supabase/getUser";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    return redirect("/log-in");
  }

  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <div className="flex flex-col items-start gap-2">
        <h2 className="mb-4 text-2xl font-bold">Your details</h2>
        <pre className="max-h-32 overflow-auto rounded border p-3 font-mono text-xs">
          email: {user.email}
        </pre>
      </div>
    </div>
  );
}
