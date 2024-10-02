import { resetPasswordAction } from "~/app/(auth-pages)/actions";
import FormButton from "~/app/_components/FormButton";
import { FormMessage, type Message } from "~/app/_components/FormMessage";
import Input from "~/app/_components/Input";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <form
      className="flex w-full max-w-md flex-col gap-2 p-4 [&>input]:mb-4"
      action={async (formData) => {
        "use server";
        await resetPasswordAction(formData);
      }}
    >
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-foreground/60 text-sm">
        Please enter your new password below.
      </p>
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="New password"
        required
      />
      <Input
        label="Confirm password"
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      resetPasswordAction
      <FormButton>Reset password</FormButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
