import Image from "next/image";

export default function StargridIcon({ size = 8 }: { size?: number }) {
  return (
    <Image
      src="/sd_logo_square.png"
      alt="stargrid logo"
      width={size * 4}
      height={size * 4}
    />
  );
}
