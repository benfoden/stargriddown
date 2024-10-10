"use client";
import { type Card as CardType } from "@prisma/client";
import { CircleIcon, SquareIcon, VercelLogoIcon } from "@radix-ui/react-icons";
import { CARDTYPES } from "~/utils/game/constants";
import { Card } from "./Card";

export default function MatchCard({
  card,
  size = "lg",
}: {
  card: CardType;
  size?: "sm" | "lg";
}) {
  const height = size === "sm" ? "h-40" : "h-80"; // Standard playing card height
  const width = size === "sm" ? "w-28" : "w-56"; // Standard playing card width

  return (
    <Card variant="play">
      <div
        className={`flex ${height} ${width} flex-col items-center p-2 font-sans shadow-md`}
      >
        {/* Header Section */}
        <div className="flex w-full flex-row justify-between">
          {card.costYen !== 0 && (
            <p className="text-nowrap text-lg font-medium">¥ {card.costYen}</p>
          )}
          <div className="flex h-10 w-full flex-row items-center justify-center rounded-t-lg px-2">
            <p className="text-xs opacity-60">
              {card.type}
              {card.variant ? ` - ${card.variant}` : ""}
            </p>
          </div>
          {card.costMw !== 0 && (
            <p className="text-nowrap text-lg font-medium">⚡{card.costMw}</p>
          )}
        </div>

        {/* Image/Icon Section */}
        <div className="flex h-32 w-full items-center justify-center">
          {card.image ? (
            "todo: style images"
          ) : card.type === CARDTYPES.cash.name ? (
            <span className="text-5xl">💴</span>
          ) : card.type === CARDTYPES.operator.name ? (
            <span className="text-5xl">🥷</span>
          ) : card.type === CARDTYPES.asset.name ? (
            <span className="text-5xl">🏭</span>
          ) : card.type === CARDTYPES.install.name ? (
            <span className="text-5xl">🕸️</span>
          ) : card.type === CARDTYPES.mod.name ? (
            <span className="text-5xl">🎣</span>
          ) : card.type === CARDTYPES.leader.name ? (
            <span className="text-5xl">👑</span>
          ) : card.type === CARDTYPES.contract.name ? (
            <span className="text-5xl">📜</span>
          ) : card.type === CARDTYPES.command.name ? (
            <span className="text-5xl">📣</span>
          ) : card.type === CARDTYPES.hq.name ? (
            <span className="text-5xl">🏯</span>
          ) : null}
        </div>

        {/* Name Section */}
        <div className="flex h-8 w-full items-center justify-center">
          {card.type !== CARDTYPES.cash.name && (
            <h2 className="text-lg font-medium tracking-wider">{card.name}</h2>
          )}
        </div>

        {/* Description Section */}
        <div className="flex h-20 w-full items-center justify-center p-2">
          <p className="text-sm">{card.shortDesc}</p>
        </div>

        {/* Stats Section */}
        <div className="flex h-10 w-full flex-row items-center justify-around rounded-b-lg">
          {card.attack !== 0 && (
            <div className="flex flex-col items-center text-lg font-bold text-emerald-500">
              <VercelLogoIcon className="h-6 w-6 text-emerald-500" />
              {card.attack}
            </div>
          )}
          {card.datab !== 0 && (
            <div className="flex flex-col items-center text-lg font-bold text-amber-500">
              <CircleIcon className="h-6 w-6 text-amber-500" />
              {card.datab}
            </div>
          )}
          {card.defense !== 0 && (
            <div className="flex flex-col items-center text-lg font-bold text-red-500">
              <SquareIcon className="h-6 w-6 text-red-500" />
              {card.defense}
            </div>
          )}
          {card.yen !== 0 && (
            <div className="flex flex-col items-center text-lg font-bold text-white">
              <span className="text-xl">¥{card.yen}</span>
            </div>
          )}
          {card.control !== 0 && (
            <div className="flex flex-col items-center text-lg font-bold text-white">
              <span className="text-xl">💎{card.control}</span>
            </div>
          )}
          {card.mw !== 0 && (
            <div className="flex flex-col items-center text-lg font-bold text-white">
              <span className="text-xl">⚡{card.mw}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
