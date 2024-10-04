export async function SessionNav({ children }: { children: React.ReactNode }) {
  return (
    <nav className="container mx-auto flex w-full items-center justify-between bg-transparent px-2 py-4 md:px-4">
      {children}
    </nav>
  );
}
