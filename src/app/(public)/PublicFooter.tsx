export async function PublicFooter() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-start gap-1 px-4 pb-4 text-xs opacity-60 sm:px-8">
      <p className="p-2">&copy; {new Date().getFullYear()} stargrid down</p>
    </footer>
  );
}
