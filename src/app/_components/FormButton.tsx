"use client";
import { useFormStatus } from "react-dom";
import Button from "./Button";
import Spinner from "./Spinner";

export default function FormButton({
  variant = "primary",
  isDisabled,
  children,
  props,
  onClick,
  isSpecial,
}: {
  variant?:
    | "primary"
    | "menuElement"
    | "cta"
    | "chip"
    | "text"
    | "submit"
    | "action";
  isDisabled?: boolean;
  children: React.ReactNode;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  onClick?: () => void;
  isSpecial?: boolean;
}) {
  const { pending }: { pending: boolean } = useFormStatus();
  return (
    <Button
      variant={variant}
      type="submit"
      disabled={pending || isDisabled}
      onClick={onClick}
      isSpecial={isSpecial}
      {...props}
    >
      <div className="flex w-full flex-row justify-center">
        {pending ? <Spinner size="sm" /> : children}
      </div>
    </Button>
  );
}
