import Link from "next/link";
import { FormMessage, type Message } from "~/app/_components/FormMessage";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <>
      <form className="text-foreground mx-auto flex w-full min-w-64 max-w-64 flex-1 flex-col gap-2 [&>input]:mb-6">
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-secondary-foreground text-sm">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-2 [&>input]:mb-3">
          Contact me for a password reset! <br />
          Ill automate this another time.
        </div>
        <FormMessage message={searchParams} />
      </form>
    </>
  );
}
