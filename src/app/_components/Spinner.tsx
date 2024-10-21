export default function Spinner({
  size = "sm",
  tall = true,
}: {
  size?: "sm" | "md" | "lg";
  tall?: boolean;
}) {
  let heightClass, widthClass, borderClass, roundedClass, marginClass;

  switch (size) {
    case "sm":
      heightClass = "h-2";
      widthClass = "w-2";
      borderClass = "border-2";
      roundedClass = "rounded-xs";
      marginClass = "mt-[-2px]";
      break;
    case "md":
      heightClass = "h-4";
      widthClass = "w-4";
      borderClass = "border-4";
      roundedClass = "rounded-sm";
      marginClass = "mt-[-4px]";
      break;
    case "lg":
      heightClass = "h-8";
      widthClass = "w-8";
      borderClass = "border-8";
      roundedClass = "rounded-md";
      marginClass = "mt-[-8px]";
      break;
    default:
      heightClass = "h-4";
      widthClass = "w-4";
      borderClass = "border-2";
      break;
  }

  return tall ? (
    <div className={`${size === "sm" ? "h-6" : ""}`}>
      <div
        className={`${heightClass} ${widthClass} animate-pulse ${roundedClass} ${borderClass} ${marginClass} rotate-45 border-b-amber-500 border-l-transparent border-r-amber-500 border-t-transparent`}
      />
      <div
        className={`${heightClass} ${widthClass} animate-pulse ${roundedClass} ${borderClass} ${marginClass} rotate-45 border-b-amber-500 border-l-transparent border-r-amber-500 border-t-transparent`}
        style={{ animationDelay: "0.25s" }}
      />
      <div
        className={`${heightClass} ${widthClass} animate-pulse ${roundedClass} ${borderClass} ${marginClass} rotate-45 border-b-amber-500 border-l-transparent border-r-amber-500 border-t-transparent`}
        style={{ animationDelay: "0.5s" }}
      />
    </div>
  ) : (
    <div className="flex flex-row items-center justify-center gap-2">
      <div
        className={`${heightClass} ${widthClass} animate-pulse ${roundedClass} ${borderClass} rotate-45 border-b-amber-500 border-l-transparent border-r-amber-500 border-t-transparent`}
      />
      <div
        className={`${heightClass} ${widthClass} animate-pulse ${roundedClass} ${borderClass} rotate-45 border-b-amber-500 border-l-transparent border-r-amber-500 border-t-transparent`}
        style={{ animationDelay: "0.25s" }}
      />
      <div
        className={`${heightClass} ${widthClass} animate-pulse ${roundedClass} ${borderClass} rotate-45 border-b-amber-500 border-l-transparent border-r-amber-500 border-t-transparent`}
        style={{ animationDelay: "0.5s" }}
      />
    </div>
  );
}
