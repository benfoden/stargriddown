import Link from "next/link";
import FormButton from "~/app/_components/FormButton";
import { FormMessage, type Message } from "~/app/_components/FormMessage";
import Input from "~/app/_components/Input";
import { signInAction } from "../actions";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form
      className="flex w-full min-w-64 flex-1 flex-col rounded-md border border-yellow-500 bg-amber-500/10 px-8 py-8 backdrop-blur-md md:w-[380px] md:px-8 md:py-16"
      action={async (formData) => {
        "use server";
        await signInAction(formData);
      }}
    >
      <h1 className="text-2xl font-medium">Log in to Stargrid</h1>
      <p className="text-foreground text-sm">
        Dont have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="my-8 flex flex-col gap-4">
        <FormMessage message={searchParams} />
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
          required
        />
      </div>

      <FormButton variant="cta">Log in</FormButton>
      <div className="mt-8 flex w-full flex-row items-center justify-between">
        <Link className="text-nowrap text-xs underline" href="/forgot-password">
          Forgot Password?
        </Link>
      </div>
    </form>
  );
}
