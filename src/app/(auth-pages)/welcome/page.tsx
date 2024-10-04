import FormButton from "~/app/_components/FormButton";
import { FormMessage, type Message } from "~/app/_components/FormMessage";
import Input from "~/app/_components/Input";
import { welcomeAction } from "../actions";

export default function WelcomePage({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <div className="mt-16 flex w-full max-w-5xl flex-1 flex-col items-center gap-12">
      <h1 className="text-2xl font-medium">Welcome to Stargrid</h1>
      <form
        className="flex w-full min-w-64 flex-1 flex-col rounded-md border border-yellow-500 bg-amber-500/10 px-8 py-8 backdrop-blur-md md:w-[380px] md:px-8 md:py-16"
        action={async (formData) => {
          "use server";
          await welcomeAction(formData);
        }}
      >
        <div className="my-8 flex flex-col gap-4">
          <Input name="name" label="Username" placeholder="ZeroCool" required />
        </div>

        <FormButton variant="cta">Continue</FormButton>
        <FormMessage message={searchParams} />
      </form>
    </div>
  );
}
