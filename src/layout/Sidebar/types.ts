import React from 'react';

export interface MenuItem {
  id: string | number;
  label: string;
  path: string;
  icon?: React.ComponentType<any> | React.ReactElement; // 图标可以是 React 组件或元素
  children?: MenuItem[]; // 递归定义子菜单
}
