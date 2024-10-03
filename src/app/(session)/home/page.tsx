import Button from "~/app/_components/Button";

export default async function Home() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-12">
      <Button>Join a match</Button>
    </div>
  );
}
