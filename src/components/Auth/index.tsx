import React from "react";
import { usePermission } from "@/hooks/usePermission";
import type { PermissionCode, PermissionMode } from "@/hooks/usePermission";

interface AuthProps {
  code: PermissionCode;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  mode?: PermissionMode;
}

const Auth: React.FC<AuthProps> = ({
  code,
  children,
  fallback = null,
  mode = "all",
}) => {
  const { matchPermission } = usePermission();

  if (!matchPermission(code, mode)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default Auth;
