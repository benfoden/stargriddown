import { DoubleArrowDownIcon } from "@radix-ui/react-icons";

export default function StargridDownIcon({ size = 16 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-sm border-4 border-amber-500 text-xl font-black italic text-amber-500"
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      <DoubleArrowDownIcon className={`h-full w-full text-amber-500`} />
    </div>
  );
}
