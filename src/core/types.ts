import type React from 'react';

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  msg?: string;
  message?: string;
  [key: string]: any;
}

export interface PageParam {
  pageNo: number;
  pageSize: number;
}

export interface PageResult<T = any> {
  list: T[];
  total: number;
  [key: string]: any;
}

export interface PageResponseLike<T = any> {
  list?: T[];
  rows?: T[];
  records?: T[];
  data?: T[];
  total?: number;
  count?: number;
  totalCount?: number;
  [key: string]: any;
}

export type AdminMenuType = 'catalog' | 'menu' | 'button';
export type BackendMenuType = 1 | 2 | 3 | AdminMenuType;

export interface AdminUser {
  id: string | number;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  deptId?: string | number;
  [key: string]: any;
}

export interface BackendMenu {
  id: string | number;
  parentId?: string | number;
  name?: string;
  title?: string;
  path?: string;
  component?: string;
  componentName?: string;
  icon?: string;
  visible?: boolean;
  keepAlive?: boolean;
  alwaysShow?: boolean;
  permission?: string;
  type: BackendMenuType;
  children?: BackendMenu[];
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

export interface BackendPermissionInfo {
  user: AdminUser;
  roles?: string[];
  permissions?: string[];
  menus?: BackendMenu | BackendMenu[] | AdminMenu | AdminMenu[] | null;
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
