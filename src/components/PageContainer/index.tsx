import React from "react";

interface PageContainerProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: React.ReactNode;
  headerMeta?: React.ReactNode;
  action?: React.ReactNode;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  compact?: boolean;
  children: React.ReactNode;
}

const joinClassNames = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(" ");

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  description,
  headerMeta,
  action,
  extra,
  footer,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  compact = false,
  children,
}) => {
  const helperText = description ?? subtitle;
  const hasHeader = title || helperText || headerMeta || action || extra;

  return (
    <div
      className={joinClassNames(
        "page-container",
        compact ? "space-y-3" : "space-y-4",
        className
      )}
    >
      {hasHeader ? (
        <header
          className={joinClassNames(
            "page-container-header rounded-xl border border-theme-border-secondary bg-theme-bg-container px-4 py-4 sm:px-5",
            headerClassName
          )}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              {headerMeta ? (
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {headerMeta}
                </div>
              ) : null}

              {title ? (
                <h1 className="truncate text-xl font-semibold leading-tight text-theme-text">
                  {title}
                </h1>
              ) : null}

              {helperText ? (
                <p className="mt-1 max-w-3xl text-sm leading-6 text-theme-text-secondary">
                  {helperText}
                </p>
              ) : null}
            </div>

            {(action || extra) ? (
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                {extra}
                {action}
              </div>
            ) : null}
          </div>
        </header>
      ) : null}

      <div className={contentClassName}>{children}</div>

      {footer ? (
        <footer className={joinClassNames("text-sm", footerClassName)}>
          {footer}
        </footer>
      ) : null}
    </div>
  );
};

export default PageContainer;
