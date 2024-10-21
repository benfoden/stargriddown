"use client";

import { useState } from "react";
import Button from "./Button";

export default function ButtonCopyLink() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const currentUrl = window.location.href;
    await navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <Button onClick={handleCopy} variant="cta">
        {copied ? "Copied!" : "Copy invite link"}
      </Button>
    </div>
  );
}
