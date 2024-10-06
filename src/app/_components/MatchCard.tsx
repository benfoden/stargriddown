"use client";
import { type Card as CardType } from "@prisma/client";
import { CircleIcon, SquareIcon, VercelLogoIcon } from "@radix-ui/react-icons";
import { CARDTYPES } from "~/gameConfig/constants";
import { Card } from "./Card";

export default function MatchCard({ card }: { card: CardType }) {
  return (
    <Card variant="play">
      <div className="flex h-full w-full flex-col items-center justify-between gap-2 p-2 font-sans">
        <div className="flex flex-col items-center">
          <div className="flex w-full flex-row justify-between">
            {!!card.costYen && (
              <div className="flex flex-col items-center text-lg font-medium">
                ¥ {card.costYen}
              </div>
            )}
            {card.type === CARDTYPES.funds.name && <span>{card.name}</span>}
          </div>
          <p className="text-xs opacity-60">
            {card.type}
            {card.variant ? ` - ${card.variant}` : ""}
          </p>
        </div>

        <div className="flex h-full w-full items-center justify-center rounded border border-black/40 bg-black/20">
          {card.image ? (
            "todo: style images"
          ) : card.type === CARDTYPES.funds.name ? (
            <span className="text-8xl">💴</span>
          ) : card.type === CARDTYPES.operator.name ? (
            <span className="text-8xl">🥷</span>
          ) : card.type === CARDTYPES.asset.name ? (
            <span className="text-8xl">🏭</span>
          ) : card.type === CARDTYPES.install.name ? (
            <span className="text-8xl">🕸️</span>
          ) : card.type === CARDTYPES.mod.name ? (
            <span className="text-8xl">🎣</span>
          ) : card.type === CARDTYPES.leader.name ? (
            <span className="text-8xl">👑</span>
          ) : card.type === CARDTYPES.contract.name ? (
            <span className="text-8xl">📜</span>
          ) : card.type === CARDTYPES.command.name ? (
            <span className="text-8xl">📣</span>
          ) : card.type === CARDTYPES.hq.name ? (
            <span className="text-8xl">🏯</span>
          ) : null}
        </div>
        <div className="flex w-full flex-col items-center rounded bg-black/20 px-2 py-1">
          {card.type !== CARDTYPES.funds.name && (
            <h2 className="text-xl font-bold">{card.name}</h2>
          )}
        </div>
        <div className="flex w-full flex-col items-center rounded bg-black/20 px-2 py-1">
          <p className="pt-4 text-sm">{card.shortDesc}</p>

          <div className="flex h-16 w-full flex-row justify-between pt-4">
            {(card.type === CARDTYPES.operator.name ||
              card.type === CARDTYPES.asset.name ||
              card.type === CARDTYPES.install.name) && (
              <>
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
              </>
            )}
            {card.type === CARDTYPES.funds.name && (
              <div className="flex w-full flex-col items-center text-lg font-bold text-white">
                <span className="text-xl">¥ {card.yen}</span>
              </div>
            )}
            {card.type === CARDTYPES.hq.name && (
              <div className="flex w-full flex-col items-center text-lg font-bold text-white">
                <span className="text-xl">🥚{card.might}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
