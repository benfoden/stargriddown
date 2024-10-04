"use client";
import { type Card as CardType } from "@prisma/client";
import {
  AccessibilityIcon,
  CircleIcon,
  SquareIcon,
  VercelLogoIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { Card } from "./Card";

export default function MatchCard({ card }: { card: CardType }) {
  console.log("the card", card);
  return (
    <Card variant="play">
      <div className="flex h-full w-full flex-col items-center justify-between gap-2 p-2 font-sans">
        {card.costYen ?? card.costDatab ?? card.costMw ?? (
          <div className="flex w-full flex-row justify-between">
            {card.costYen && (
              <div className="flex flex-col items-center text-lg font-medium">
                ¥ {card.costYen}
              </div>
            )}
          </div>
        )}
        <div className="flex h-full w-full items-center justify-center rounded border border-black/40 bg-black/20">
          {card.image ? (
            <Image src={card.image} alt={card.name} className="h-auto w-full" />
          ) : (
            <AccessibilityIcon className="h-24 w-auto" />
          )}
        </div>
        <div className="flex w-full flex-col items-center rounded bg-black/20 px-2 py-1">
          <h2 className="text-xl font-bold">{card.name}</h2>
          <p className="pt-4 text-sm">{card.shortDesc}</p>

          <div className="flex w-full flex-row justify-between pt-4">
            <div className="flex flex-col items-center text-lg font-bold text-emerald-500">
              <VercelLogoIcon className="h-6 w-6 text-emerald-500" />
              {card.attack}
            </div>
            <div className="flex flex-col items-center text-lg font-bold text-amber-500">
              <CircleIcon className="h-6 w-6 text-amber-500" />
              {card.datab}
            </div>
            <div className="flex flex-col items-center text-lg font-bold text-red-500">
              <SquareIcon className="h-6 w-6 text-red-500" />
              {card.defense}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
