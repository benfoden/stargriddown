"use client";
import { useFormStatus } from "react-dom";

export default function Button({
  variant = "primary",
  children,
  isSpecial,
  ...props
}: {
  variant?:
    | "primary"
    | "text"
    | "menuElement"
    | "cta"
    | "chip"
    | "submit"
    | "nav"
    | "dropdownToggle"
    | "action"
    | "listItem";
  isServerSideForm?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  isSpecial?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  let isDisabled = props.disabled;
  const { pending }: { pending: boolean } = useFormStatus();
  if (isDisabled === undefined) {
    isDisabled = pending;
  }

  let buttonClass = "";
  const defaults =
    " flex items-center justify-between px-4 py-2 gap-4 rounded-md text-decoration-none transition ";
  const sharedColors = " bg-amber-500/[.12] hover:bg-amber-500/[.24] ";

  const specialColors = " bg-emerald-500 hover:bg-emerald-700 ";

  if (isDisabled) {
    buttonClass += " animate-pulse opacity-40 transition cursor-not-allowed";
  }

  switch (variant) {
    case "primary":
      buttonClass += defaults + sharedColors;
      break;
    case "text":
      buttonClass += defaults + "hover:bg-amber-500/[.24]";
      break;
    case "menuElement":
      buttonClass +=
        " flex px-6 py-3 sm:px-4 sm:py-2 items-center justify-between gap-4 w-full rounded-md text-decoration-none transition " +
        (isSpecial ? specialColors : " hover:bg-amber-500/[.24] ");
      break;
    case "cta":
      buttonClass +=
        " z-10 rounded-full border-8 border-emerald-500 px-8 py-3 text-lg font-black uppercase text-emerald-400 shadow-lg transition hover:bg-emerald-500/40 ";
      break;
    case "chip":
      buttonClass +=
        " flex px-2 py-1 w-fit items-center justify-between gap-4 rounded-md text-decoration-none transition text-xs font-medium " +
        (isSpecial
          ? specialColors
          : " bg-amber-500/[.08] hover:bg-amber-500/[.16] ");
      break;
    case "submit":
      buttonClass +=
        " mt-2 flex h-12 w-full text-base items-center justify-center space-x-2 rounded-lg px-4 transition text-decoration-none " +
        (isSpecial
          ? specialColors
          : " bg-white/[.16] hover:bg-amber-500/[.32] active:bg-amber-500/[.35] ");
      break;
    case "nav":
      buttonClass +=
        " flex px-6 py-3 sm:px-4 sm:py-2 items-center justify-between gap-1 rounded-md text-decoration-none transition " +
        (isSpecial ? specialColors : " hover:bg-amber-500/[.16] ");
      break;
    case "dropdownToggle":
      buttonClass +=
        " flex p-2 w-fit items-center justify-between rounded-sm text-decoration-none transition text-xs text-amber-500 " +
        (isSpecial ? specialColors : " hover:bg-amber-500/[.24] ");
      break;
    case "action":
      buttonClass +=
        " rounded-xl hover:pulsating-glow z-10 bg-amber-500/10 px-8 py-3 text-lg font-bold uppercase text-amber-500 transition hover:bg-amber-600/60 border-4 border-amber-500/60 hover:border-yellow-500 hover:text-yellow-300 backdrop-blur-sm ";
      break;
    case "listItem":
      buttonClass +=
        " flex py-2 px-4 w-48 gap-2 flex-row wrap:no-wrap items-center justify-start rounded-lg text-sm " +
        (isSpecial
          ? specialColors
          : " bg-amber-500/[.08] hover:bg-amber-500/[.16] ");
      break;
    default:
      buttonClass += defaults + sharedColors;
      break;
  }

  return (
    <button
      className={buttonClass}
      disabled={isDisabled}
      type={variant === "submit" ? "submit" : "button"}
      {...props}
    >
      {children}
    </button>
  );
}
