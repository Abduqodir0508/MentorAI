import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  color?: "indigo" | "emerald" | "amber" | "purple" | "rose";
  showLabel?: boolean;
}

export function Progress({
  value,
  color = "indigo",
  showLabel = false,
  className,
  ...props
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value || 0));

  const colors = {
    indigo: "bg-indigo-600",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    purple: "bg-purple-600",
    rose: "bg-rose-500",
  };

  return (
    <div className={cn("w-full space-y-1", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Progress</span>
          <span>{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colors[color])}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}
