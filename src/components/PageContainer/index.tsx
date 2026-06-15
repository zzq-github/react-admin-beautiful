import React from 'react';

interface PageContainerProps {
  /** 页面标题 */
  title?: string;
  /** 页面描述/副标题 */
  subtitle?: string;
  /** 操作栏（右侧按钮区） */
  action?: React.ReactNode;
  /** 底部区域 */
  footer?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * 页面容器组件
 * 统一页面结构：标题 + 操作栏 + 内容区 + 底部
 *
 * @example
 * <PageContainer
 *   title="用户管理"
 *   subtitle="管理系统用户账号"
 *   action={<Button type="primary">新增用户</Button>}
 * >
 *   <Table ... />
 * </PageContainer>
 */
const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  action,
  footer,
  children,
}) => {
  return (
    <div className="space-y-4">
      {/* 标题栏 */}
      {(title || action) && (
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-theme-text">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-theme-text-secondary mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}

      {/* 内容区 */}
      <div>{children}</div>

      {/* 底部区域 */}
      {footer && <div>{footer}</div>}
    </div>
  );
};

export default PageContainer;
