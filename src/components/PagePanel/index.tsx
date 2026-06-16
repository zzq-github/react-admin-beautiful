import React from "react";

interface PagePanelProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

const PagePanel: React.FC<PagePanelProps> = ({
  title,
  description,
  action,
  className,
  bodyClassName,
  children,
}) => {
  const panelClassName = [
    "rounded-lg border border-theme-border bg-theme-bg shadow-sm",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClassName = ["p-4", bodyClassName].filter(Boolean).join(" ");

  return (
    <section className={panelClassName}>
      {(title || description || action) && (
        <div className="flex flex-col gap-3 border-b border-theme-border-secondary px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-theme-text">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-0.5 text-xs text-theme-text-secondary">
                {description}
              </p>
            )}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </section>
  );
};

export default PagePanel;
