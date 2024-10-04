import Link from "next/link";
import Button from "~/app/_components/Button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-row">
        <Button>
          <Link href="/sg-admin">Dashboard</Link>
        </Button>
        <Button>
          <Link href="/sg-admin/cards">Cards</Link>
        </Button>
      </div>
      {children}
    </>
  );
}
