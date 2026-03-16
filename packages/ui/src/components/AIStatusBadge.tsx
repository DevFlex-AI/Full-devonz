"use client";

import React from "react";
import { cn } from "../utils";

type AIStatus = "idle" | "thinking" | "streaming" | "error";

interface AIStatusBadgeProps {
  status: AIStatus;
  model?: string;
  className?: string;
}

const STATUS_CONFIG: Record<AIStatus, { label: string; color: string; pulse: boolean }> = {
  idle: { label: "Ready", color: "bg-emerald-500", pulse: false },
  thinking: { label: "Thinking…", color: "bg-amber-500", pulse: true },
  streaming: { label: "Streaming", color: "bg-blue-500", pulse: true },
  error: { label: "Error", color: "bg-red-500", pulse: false },
};

export function AIStatusBadge({ status, model, className }: AIStatusBadgeProps) {
  const { label, color, pulse } = STATUS_CONFIG[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-black/10 text-current", className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", color, pulse && "animate-pulse")} />
      {model ? `${model} · ${label}` : label}
    </span>
  );
}
