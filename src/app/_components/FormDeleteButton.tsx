"use client";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Button from "./Button";
import Spinner from "./Spinner";

export default function FormDeleteButton({
  hasText = true,
  children,
  isDisabled,
  isCancel,
}: {
  hasText?: boolean;
  children?: React.ReactNode;
  isDisabled?: boolean;
  isCancel?: boolean;
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
          <Spinner tall={false} />
        </>
      ) : confirmDelete ? (
        <>
          {(hasText || children) && isCancel ? "Cancel?" : "Delete?"}{" "}
          <CheckIcon className="h-5 w-5" />{" "}
        </>
      ) : (
        <>
          <Cross1Icon className="h-5 w-5" />{" "}
          {hasText && !children ? (isCancel ? "Cancel?" : "Delete?") : children}
        </>
      )}
    </Button>
  );
}
