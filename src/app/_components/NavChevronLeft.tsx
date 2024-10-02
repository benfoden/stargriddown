"use client";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";

// Start of Selection
export function NavChevronLeft({
  targetPathname,
  label,
  isDisabled,
  isBack = false,
}: {
  targetPathname?: string;
  label?: string;
  isDisabled?: boolean;
  isBack?: boolean;
}) {
  const router = useRouter();

  return (
    <Link
      href={!isDisabled && !isBack && targetPathname ? targetPathname : ""}
      className={`${isDisabled && "cursor-not-allowed"}`}
      prefetch={true}
      onClick={() => isBack && router.back()}
    >
      <Button variant="nav">
        <ChevronLeftIcon className="h-5 w-5" />
        <span>{isBack ? "Back" : label}</span>
      </Button>
    </Link>
  );
}
