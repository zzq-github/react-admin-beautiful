import type React from 'react';

export type AdminMenuType = 'catalog' | 'menu' | 'button';

export interface AdminUser {
  id: string | number;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  deptId?: string | number;
  [key: string]: any;
}

export interface AdminMenu {
  id: string | number;
  parentId?: string | number;
  title: string;
  path: string;
  component?: string;
  componentName?: string;
  icon?: string;
  visible?: boolean;
  keepAlive?: boolean;
  alwaysShow?: boolean;
  permission?: string;
  type: AdminMenuType;
  children?: AdminMenu[];
  [key: string]: any;
}

export interface AdminPermissionInfo {
  user: AdminUser;
  roles: string[];
  permissions: string[];
  menus: AdminMenu | AdminMenu[];
}

export interface AdminSidebarMenuItem {
  id: string | number;
  label: string;
  path: string;
  icon?: React.ComponentType<any> | React.ReactElement;
  children?: AdminSidebarMenuItem[];
}

