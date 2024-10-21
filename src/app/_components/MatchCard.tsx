"use client";
import { type Card as CardType } from "@prisma/client";
import { CircleIcon, SquareIcon, VercelLogoIcon } from "@radix-ui/react-icons";
import { CARDS } from "~/game/constants";
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

  const cards1MwDefault = ["operator", "install", "asset"];

  const cardDetails = CARDS[card.type as keyof typeof CARDS];
  const variantAttributes = cardDetails.variants.find(
    (variant) => variant.name === card.variant,
  )?.attributes;

  const attributeColors = {
    physical: "bg-orange-500",
    digital: "bg-blue-500",
    agentic: "bg-fuchsia-500",
    biological: "bg-green-300",
  };

  const attributeDivs = variantAttributes
    ? variantAttributes.map((attribute) => (
        <div
          key={attribute}
          className={`h-1 flex-1 ${attributeColors[attribute]} opacity-60`}
        ></div>
      ))
    : null;

  return (
    <Card variant="play">
      {/* Header Section */}
      <div className="flex w-full flex-row justify-start gap-1 p-1">
        {card.costYen !== 0 && (
          <div className="flex items-center justify-center text-nowrap rounded-full bg-emerald-500/20 px-2 py-1 font-bold text-emerald-500">
            ¥ {card.costYen}
          </div>
        )}
        {cards1MwDefault.some((type) => type === card.type) && (
          <div className="flex items-center justify-center text-nowrap rounded-full bg-yellow-500/20 px-2 py-1 font-bold text-yellow-500">
            ⚡{card.costMw ?? 1}
          </div>
        )}
      </div>

      <div
        className={`flex ${height} ${width} flex-col items-center p-2 font-sans shadow-md`}
      >
        {/* Image/Icon Section */}
        <div className="flex h-36 w-full items-center justify-center">
          {card.image ? (
            "todo: style images"
          ) : card.type === CARDS.cash.name ? (
            <span className="text-6xl">💴</span>
          ) : card.type === CARDS.operator.name ? (
            <span className="text-6xl">🥷</span>
          ) : card.type === CARDS.asset.name ? (
            <span className="text-6xl">🏭</span>
          ) : card.type === CARDS.install.name ? (
            <span className="text-6xl">🕸️</span>
          ) : card.type === CARDS.mod.name ? (
            <span className="text-6xl">🎣</span>
          ) : card.type === CARDS.leader.name ? (
            <span className="text-6xl">👑</span>
          ) : card.type === CARDS.contract.name ? (
            <span className="text-6xl">📜</span>
          ) : card.type === CARDS.command.name ? (
            <span className="text-6xl">📣</span>
          ) : card.type === CARDS.hq.name ? (
            <span className="text-6xl">🏯</span>
          ) : null}
        </div>

        {/* Name Section */}
        <div className="flex h-8 w-full items-center justify-center">
          {card.type !== CARDS.cash.name && (
            <h2 className="text-lg font-medium tracking-wider">{card.name}</h2>
          )}
        </div>
        <div className="flex h-8 w-full flex-row items-center justify-center px-2">
          <p className="text-xs opacity-60">
            {card.type}
            {card.variant ? ` - ${card.variant}` : ""}
          </p>
        </div>

        {/* Description Section */}
        <div className="flex h-20 w-full items-center justify-center p-2">
          <p className="text-sm">{card.shortDesc}</p>
        </div>

        {/* Stats Section */}
        <div className="flex h-10 w-full flex-row items-center justify-around rounded-b-lg">
          {card.attack && card.attack !== 0 ? (
            <div className="flex flex-col items-center text-lg font-bold text-emerald-500">
              <VercelLogoIcon className="h-6 w-6 text-emerald-500" />
              {card.attack}
            </div>
          ) : null}
          {card.datab && card.datab !== 0 ? (
            <div className="flex flex-col items-center text-lg font-bold text-amber-500">
              <CircleIcon className="h-6 w-6 text-amber-500" />
              {card.datab}
            </div>
          ) : null}
          {card.defense && card.defense !== 0 ? (
            <div className="flex flex-col items-center text-lg font-bold text-red-500">
              <SquareIcon className="h-6 w-6 text-red-500" />
              {card.defense}
            </div>
          ) : null}
          {card.yen && card.yen !== 0 ? (
            <div className="flex flex-col items-center text-lg font-bold text-emerald-500">
              <span className="text-xl">¥{card.yen}</span>
            </div>
          ) : null}
          {card.control && card.control !== 0 ? (
            <div className="flex flex-col items-center text-lg font-bold text-sky-500">
              <span className="text-xl">💎{card.control}</span>
            </div>
          ) : null}
          {card.mw && card.mw !== 0 ? (
            <div className="flex flex-col items-center text-lg font-bold text-yellow-500">
              <span className="text-xl">⚡{card.mw}</span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex w-full gap-1 px-12">{attributeDivs}</div>
    </Card>
  );
}
