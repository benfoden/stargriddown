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
      <div className="flex h-full w-48 flex-col items-center justify-between px-2 font-sans">
        <div className="flex w-full flex-row justify-between">
          {card.costYen && (
            <div className="flex flex-col items-center text-lg font-medium">
              <VercelLogoIcon className="h-4 w-4" />
              {card.costYen}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          {card.image ? (
            <Image src={card.image} alt={card.name} className="h-auto w-full" />
          ) : (
            <AccessibilityIcon className="h-36 w-36" />
          )}
        </div>
        <h2 className="text-2xl font-bold">{card.name}</h2>

        <div className="text-sm">{card.shortDesc}</div>
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col items-center text-lg font-medium">
            <VercelLogoIcon className="h-4 w-4" />
            {card.attack}
          </div>
          <div className="flex flex-col items-center text-lg font-medium">
            <CircleIcon className="h-4 w-4" />
            {card.datab}
          </div>
          <div className="flex flex-col items-center text-lg font-medium">
            <SquareIcon className="h-4 w-4" />
            {card.defense}
          </div>
        </div>
      </div>
    </Card>
  );
}
