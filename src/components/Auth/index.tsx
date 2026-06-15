import React from 'react';
import { usePermission } from '@/hooks/usePermission';

interface AuthProps {
  /** 权限标识，如 "system:user:create" */
  code: string;
  children: React.ReactNode;
  /** 无权限时的回退内容 */
  fallback?: React.ReactNode;
}

/**
 * 权限控制组件
 * 根据权限标识控制子组件是否渲染
 *
 * @example
 * <Auth code="system:user:create">
 *   <Button type="primary">新增</Button>
 * </Auth>
 *
 * <Auth code="system:user:delete" fallback={null}>
 *   <Button danger>删除</Button>
 * </Auth>
 */
const Auth: React.FC<AuthProps> = ({ code, children, fallback = null }) => {
  const { hasPermission } = usePermission();

  if (!hasPermission(code)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default Auth;
