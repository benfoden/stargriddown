"use client";
import {
  DotsHorizontalIcon,
  DotsVerticalIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";
import Button from "./Button";

const DropDownMenu = ({
  children,
  isUserMenu = false,
  isEntryMenu = false,
  isTopMenu = false,
  userProfileIconUrl,
}: {
  children: React.ReactNode;
  isUserMenu?: boolean;
  isEntryMenu?: boolean;
  isTopMenu?: boolean;
  userProfileIconUrl?: string;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!children) return null;

  return (
    <div
      ref={dropdownRef}
      className={`relative flex flex-col items-end ${open ? "open" : ""} ${isUserMenu && "mr-4"}`}
    >
      <Button variant="dropdownToggle" onClick={toggleDropdown}>
        {isUserMenu && userProfileIconUrl && (
          <Avatar
            src={userProfileIconUrl}
            alt={"your profilepicture"}
            size="medium"
          />
        )}
        {isUserMenu && !userProfileIconUrl && (
          <HamburgerMenuIcon className="h-6 w-6 text-amber-500" />
        )}
        {isEntryMenu && (
          <DotsHorizontalIcon className="h-6 w-6 text-amber-500" />
        )}
        {isTopMenu && <HamburgerMenuIcon className="h-6 w-6 text-amber-500" />}
        {!isUserMenu && !isEntryMenu && !isTopMenu && (
          <DotsVerticalIcon className="h-6 w-6 text-amber-500" />
        )}
      </Button>
      <div
        className={`absolute right-0 mt-16 flex min-w-max flex-col rounded-md border border-yellow-500 bg-amber-500/[.08] shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDownMenu;
