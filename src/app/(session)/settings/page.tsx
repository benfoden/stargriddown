import { redirect } from "next/navigation";
import { Card } from "~/app/_components/Card";
import { getUser } from "~/utils/supabase/getUser";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    return redirect("/log-in");
  }

  return (
    <div className="container mx-auto flex w-full flex-1 flex-col items-center gap-12">
      <div className="flex flex-col items-start gap-2">
        <Card variant="form">
          <h1 className="mb-4 text-2xl font-bold">Settings</h1>
          name: {user.name}
          <br />
          email: {user.email}
        </Card>
      </div>
    </div>
  );
}
