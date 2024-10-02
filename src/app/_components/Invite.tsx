"use client";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

export default function InviteModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return !isOpen ? (
    <Button variant="chip" isSpecial onClick={() => setIsOpen(true)}>
      tell up to 2 friends
    </Button>
  ) : (
    <Modal>
      <div className="mr-[-24px] flex w-full flex-row items-end justify-end">
        <Button variant="text" onClick={() => setIsOpen(false)}>
          <Cross1Icon className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </Modal>
  );
}
