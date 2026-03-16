"use client";

import React, { useState } from "react";
import { cn } from "../utils";

interface DevonzEditorButtonProps {
  projectId: string;
  sessionToken: string;
  editorType?: "web" | "desktop";
  webEditorUrl?: string;
  className?: string;
  onOpen?: (editorType: "web" | "desktop") => void;
}

export function DevonzEditorButton({
  projectId,
  sessionToken,
  editorType = "web",
  webEditorUrl = "https://editor.devonz.ai",
  className,
  onOpen,
}: DevonzEditorButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setLoading(true);
    try {
      if (editorType === "desktop") {
        const url = `devonz://open?project=${projectId}&token=${sessionToken}`;
        window.location.href = url;
      } else {
        const url = `${webEditorUrl}?project=${projectId}&token=${sessionToken}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }
      onOpen?.(editorType);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <button
      onClick={handleOpen}
      disabled={loading}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium",
        "bg-[#5838FF] text-white hover:bg-[#4426ee] active:bg-[#3318d4]",
        "transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="58,4 28,50 52,50 42,96 72,50 48,50"/>
        </svg>
      )}
      {loading ? "Opening…" : "Open in Devonz Editor"}
    </button>
  );
}
