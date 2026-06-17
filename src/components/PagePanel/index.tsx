import React from "react";

interface PagePanelProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  hoverable?: boolean;
  children: React.ReactNode;
}

const joinClassNames = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(" ");

const PagePanel: React.FC<PagePanelProps> = ({
  title,
  description,
  action,
  className,
  bodyClassName,
  headerClassName,
  hoverable = false,
  children,
}) => {
  const hasHeader = title || description || action;

  return (
    <section
      className={joinClassNames(
        "page-panel rounded-xl border border-theme-border-secondary bg-theme-bg-container",
        hoverable && "transition-all duration-motion-base ease-motion-out hover:-translate-y-0.5 hover:border-theme-primary-border",
        className
      )}
    >
      {hasHeader ? (
        <div
          className={joinClassNames(
            "flex flex-col gap-3 border-b border-theme-border-secondary px-4 py-3 md:flex-row md:items-center md:justify-between",
            headerClassName
          )}
        >
          <div className="min-w-0">
            {title ? (
              <h2 className="truncate text-sm font-semibold text-theme-text">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-0.5 text-xs leading-5 text-theme-text-secondary">
                {description}
              </p>
            ) : null}
          </div>
          {action ? (
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              {action}
            </div>
          ) : null}
        </div>
      ) : null}
      <div className={joinClassNames("p-4", bodyClassName)}>{children}</div>
    </section>
  );
};

export default PagePanel;
