import React from "react";
import { Loader } from "lucide-react";

interface PageLoadingProps {
  fullscreen?: boolean;
  compact?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

const PageLoading: React.FC<PageLoadingProps> = ({
  fullscreen = false,
  compact = false,
  label = "加载中",
  description,
  className,
}) => {
  const wrapperClassName = [
    "flex items-center justify-center text-theme-text-secondary",
    fullscreen ? "min-h-screen bg-theme-bg-base" : "",
    compact ? "min-h-28" : fullscreen ? "" : "min-h-[240px]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-full px-2 py-1">
          <Loader
            className="page-loading-spinner text-theme-primary"
            size={compact ? 14 : 16}
            strokeWidth={2}
          />
          <span className="text-sm font-medium leading-none text-theme-text-secondary">
            {label}
          </span>
        </div>
        {description ? (
          <p className="max-w-xs text-center text-xs leading-5 text-theme-text-tertiary">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default PageLoading;
