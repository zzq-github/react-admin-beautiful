import React from 'react';
import PageState from '@/components/PageState';
import { usePermission } from '@/hooks/usePermission';
import type { PermissionCode, PermissionMode } from '@/hooks/usePermission';

interface RequirePermissionProps {
  code?: PermissionCode;
  mode?: PermissionMode;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * 页面级权限保护组件。
 *
 * 动态路由会把菜单节点上的 permission 传进来：
 * - 没有配置 code：默认放行，方便公开页面或过渡阶段使用。
 * - 配置了 code：根据当前用户 permissions 判断，失败时展示统一 403 状态。
 */
const RequirePermission: React.FC<RequirePermissionProps> = ({
  code,
  mode = 'all',
  children,
  fallback,
}) => {
  const { matchPermission } = usePermission();

  if (!code || matchPermission(code, mode)) {
    return <>{children}</>;
  }

  return (
    <>
      {fallback ?? (
        <PageState
          type="forbidden"
          title="暂无页面权限"
          description="当前账号没有访问该页面的权限。"
        />
      )}
    </>
  );
};

export default RequirePermission;
