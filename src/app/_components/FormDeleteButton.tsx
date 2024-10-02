"use client";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Button from "./Button";
import ButtonSpinner from "./ButtonSpinner";

export default function FormDeleteButton({
  hasText = true,
  children,
  isDisabled,
}: {
  hasText?: boolean;
  children?: React.ReactNode;
  isDisabled?: boolean;
}) {
  const { pending }: { pending: boolean } = useFormStatus();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [readyToDelete, setReadyToDelete] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (confirmDelete) {
      timer = setTimeout(() => {
        setConfirmDelete(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [confirmDelete]);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!confirmDelete && readyToDelete) {
      event.preventDefault();
      setConfirmDelete(true);
      setReadyToDelete(false);
      setTimeout(() => {
        setReadyToDelete(true);
      }, 150);
    }
  };

  return (
    <Button
      variant="menuElement"
      type="submit"
      disabled={pending || !readyToDelete || isDisabled}
      onClick={handleDelete}
    >
      {pending ? (
        <>
          <span>Deleting...</span>
          <ButtonSpinner />
        </>
      ) : confirmDelete ? (
        <>
          {(hasText || children) && "Delete?"} <CheckIcon className="h-5 w-5" />{" "}
        </>
      ) : (
        <>
          <Cross1Icon className="h-5 w-5" />{" "}
          {hasText && !children ? "Delete" : children}
        </>
      )}
    </Button>
  );
}
