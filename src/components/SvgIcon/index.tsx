// src/components/SvgIcon/index.tsx
import React from 'react';

interface SvgIconProps {
  iconClass: string;      // 图标名称，对应文件名
  className?: string;     // 额外样式类
  color?: string;         // 图标颜色
  style?: React.CSSProperties;
}

const SvgIcon: React.FC<SvgIconProps> = ({ iconClass, className, color, style }) => {
  // 这里的 #icon- 前缀必须与 vite.config.ts 中的 symbolId 保持一致
  const iconName = `#icon-${iconClass}`;

  return (
    <svg
      aria-hidden="true"
      className={`svg-icon ${className || ''}`}
      style={{
        width: '1em',
        height: '1em',
        verticalAlign: '-0.15em',
        fill: color || 'currentColor',
        overflow: 'hidden',
        ...style
      }}
    >
      <use xlinkHref={iconName} />
    </svg>
  );
};

export default SvgIcon;