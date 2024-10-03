export const cardColors = (
  variant?:
    | "default"
    | "narrow"
    | "wide"
    | "form"
    | "textBlock"
    | "hero"
    | "comment"
    | "transparent"
    | "prompt"
    | "play",
) =>
  ` bg-white/30 dark:bg-white/10 ${variant === "form" ? "shadow-xl dark:shadow-black" : ""}`;
export function Card({
  children,
  isButton = true,
  variant = "default",
}: {
  children: React.ReactNode;
  isButton?: boolean;
  variant?:
    | "default"
    | "narrow"
    | "wide"
    | "form"
    | "textBlock"
    | "hero"
    | "comment"
    | "transparent"
    | "prompt"
    | "play";
}) {
  if (variant === "form") isButton = false;

  const sharedHover =
    " cursor-pointer transition hover:bg-white/60 hover:dark:bg-white/20 ";

  const DefaultCard = () => (
    <div
      className={
        `w-full min-w-64 rounded-xl px-8 py-6 ${isButton ? sharedHover : ""} ` +
        cardColors(variant)
      }
    >
      <div className="flex w-full flex-col items-center justify-between gap-2">
        {children}
      </div>
    </div>
  );

  switch (variant) {
    case "default":
      return <DefaultCard />;

    case "narrow":
      return (
        <div
          className={
            `w-64 rounded-xl px-4 py-2 ${isButton ? sharedHover : ""} ` +
            cardColors(variant)
          }
        >
          <div className="flex flex-col items-center gap-2">{children}</div>
        </div>
      );
    case "wide":
      return (
        <div
          className={
            `w-full min-w-[512px] rounded-xl px-8 py-2 ${isButton ? sharedHover : ""} ` +
            cardColors(variant)
          }
        >
          <div className="flex flex-col items-center justify-between gap-2">
            {children}
          </div>
        </div>
      );

    case "form":
      return (
        <div
          className={
            `flex w-full flex-col gap-2 rounded-xl bg-white/50 px-8 py-6 shadow-lg dark:bg-white/10 ${isButton && sharedHover} ` +
            cardColors(variant)
          }
        >
          <div className="flex flex-col items-center justify-between gap-2">
            {children}
          </div>
        </div>
      );

    case "textBlock":
      return (
        <div
          className={`flex w-full flex-col gap-2 rounded-xl bg-white/30 px-6 py-4 dark:bg-white/10 ${isButton && sharedHover} `}
        >
          <div className="flex w-fit flex-col items-start justify-between gap-2">
            {children}
          </div>
        </div>
      );

    case "hero":
      return (
        <div
          className={`flex h-fit w-fit flex-col gap-2 rounded-md bg-amber-500/10 px-6 py-4 ${isButton && sharedHover} border-4 border-amber-500 shadow-black backdrop-blur-sm`}
        >
          <div className="flex flex-col items-center justify-center gap-2 px-16 py-8">
            {children}
          </div>
        </div>
      );

    case "transparent":
      return (
        <div
          className={`px-22 flex w-fit flex-col items-start justify-between gap-2 rounded-full bg-transparent py-12 dark:bg-transparent ${isButton && sharedHover}`}
        >
          {children}
        </div>
      );

    case "comment":
      return (
        <div
          className={`flex w-fit flex-col items-start justify-between gap-2 rounded-xl bg-white/30 px-6 py-4 dark:bg-white/10 ${isButton && sharedHover} `}
        >
          {children}
        </div>
      );

    case "prompt":
      return (
        <div
          className={`flex w-full flex-col items-start justify-between gap-2 rounded-full bg-white/30 px-3 py-1 dark:bg-white/10 ${isButton && sharedHover} `}
        >
          {children}
        </div>
      );

    case "play":
      return (
        <div
          className={`flex aspect-[1/1.618] w-full max-w-xs flex-col items-center justify-center gap-2 rounded-xl bg-white/10 ${isButton && sharedHover} border border-white/10 drop-shadow-sm backdrop-blur-sm`}
        >
          {children}
        </div>
      );

    default:
      return <DefaultCard />;
  }
}
