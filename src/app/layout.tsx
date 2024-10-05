import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Stargrid",
  description: "Created by ben",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`font-sans ${GeistSans.variable} bg-transparent`}
      suppressHydrationWarning={true}
    >
      <body>
        <div className="relative min-h-screen w-full">
          <div className="absolute inset-0 z-[-20] min-h-full w-full bg-gradient-to-b from-[#07090a] from-65% via-[#18203a] to-[#234e5c]" />
          <div className="relative z-0 flex w-full flex-col">
            <TRPCReactProvider>
              <HydrateClient>{children}</HydrateClient>
            </TRPCReactProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
