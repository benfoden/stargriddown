export async function PublicFooter() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-start gap-1 border-t border-t-white/10 px-4 py-4 text-xs opacity-60 sm:px-8">
      <p className="p-2">&copy; {new Date().getFullYear()} KEYJUMP</p>
    </footer>
  );
}
