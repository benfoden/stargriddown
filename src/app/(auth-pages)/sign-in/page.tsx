import Link from "next/link";
import FormButton from "~/app/_components/FormButton";
import { FormMessage, type Message } from "~/app/_components/FormMessage";
import Input from "~/app/_components/Input";
import { signInAction } from "../actions";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form
      className="flex min-w-64 flex-1 flex-col"
      action={async (formData) => {
        "use server";
        await signInAction(formData);
      }}
    >
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-foreground text-sm">
        Dont have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
        <Input
          name="email"
          label="Email"
          placeholder="you@example.com"
          required
        />
        <div className="flex items-center justify-between">
          <Link
            className="text-foreground text-xs underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Your password"
          required
        />
        <FormButton>Sign in</FormButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
