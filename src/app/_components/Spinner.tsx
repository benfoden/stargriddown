export default function Spinner({
  size = "sm",
}: {
  size?: "sm" | "md" | "lg";
}) {
  let heightClass, widthClass, borderClass, roundedClass;

  switch (size) {
    case "sm":
      heightClass = "h-4";
      widthClass = "w-4";
      borderClass = "border-2";
      roundedClass = "rounded-sm";
      break;
    case "md":
      heightClass = "h-8";
      widthClass = "w-8";
      borderClass = "border-4";
      roundedClass = "rounded-md";

      break;
    case "lg":
      heightClass = "h-16";
      widthClass = "w-16";
      borderClass = "border-8";
      roundedClass = "rounded-xl";

      break;
    default:
      heightClass = "h-4";
      widthClass = "w-4";
      borderClass = "border-2";
      break;
  }

  return (
    <div
      className={`${heightClass} ${widthClass} animate-pulse ${roundedClass} ${borderClass} rotate-45 border-b-amber-500 border-l-transparent border-r-amber-500 border-t-transparent`}
    />
  );
}
