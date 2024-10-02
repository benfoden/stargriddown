import Link from "next/link";
import Button from "./_components/Button";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center gap-12">
      <div className="bg-accent text-foreground mb-4 flex items-center gap-3 rounded-md p-3 px-5">
        404 | Page Not found!
      </div>

      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
