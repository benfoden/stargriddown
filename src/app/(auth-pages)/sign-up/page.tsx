import Link from "next/link";
import FormButton from "~/app/_components/FormButton";
import { FormMessage, type Message } from "~/app/_components/FormMessage";
import Input from "~/app/_components/Input";
import { signUpAction } from "../actions";

export default function Signup({
  searchParams,
}: {
  searchParams: Message & { match?: string };
}) {
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center gap-2 p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  const { match } = searchParams;

  return (
    <>
      <form
        action={async (formData) => {
          "use server";
          await signUpAction(formData);
        }}
      >
        <h1 className="text-2xl font-medium">Sign up to Stargrid</h1>
        <p className="text text-foreground text-sm">
          Already have an account?
          <br />
          <Link className="text-primary font-medium underline" href="/log-in">
            Log in
          </Link>
        </p>
        <div className="my-8 flex flex-col gap-4">
          <FormMessage message={searchParams} />
          <Input name="match" initialValue={match} hidden />
          <Input
            name="email"
            label="Email"
            placeholder="you@example.com"
            required
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Your password"
            minLength={12}
            required
          />
          <Input
            type="password"
            label="Confirm password"
            name="confirmPassword"
            placeholder="Confirm password"
            minLength={12}
            required
          />
        </div>

        <FormButton variant="cta">Sign up</FormButton>
      </form>
    </>
  );
}
