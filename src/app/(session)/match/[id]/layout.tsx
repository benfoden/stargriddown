export default async function MatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-12">
        {children}
      </div>
    </>
  );
}
