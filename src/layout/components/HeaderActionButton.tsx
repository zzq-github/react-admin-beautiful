import React from "react";

interface HeaderActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: React.ReactNode;
}

const HeaderActionButton: React.FC<HeaderActionButtonProps> = ({
  label,
  children,
  className,
  type = "button",
  ...rest
}) => {
  const buttonClassName = [
    "inline-flex h-8 w-8 items-center justify-center rounded-md text-theme-text-secondary",
    "transition-all duration-motion-base ease-motion-out",
    "hover:bg-theme-hover hover:text-theme-text",
    "active:scale-95",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary-border focus-visible:ring-offset-2 focus-visible:ring-offset-theme-header-bg",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={buttonClassName}
      {...rest}
    >
      {children}
    </button>
  );
};

export default HeaderActionButton;
