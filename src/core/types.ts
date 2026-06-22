import type React from 'react';

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  msg?: string;
  message?: string;
  [key: string]: any;
}

/**
 * 模板内部统一使用 pageNo/pageSize。
 * 如果真实后端使用 current/page 或 size/limit，优先在 API 层或 adapter 中转换。
 */
export interface PageParam {
  pageNo: number;
  pageSize: number;
}

/**
 * 页面和表格 Hook 只消费这个标准分页结构。
 * 这样不同后端的 rows/records/data 字段不会扩散到业务页面。
 */
export interface PageResult<T = any> {
  list: T[];
  total: number;
  [key: string]: any;
}

/**
 * 后端分页响应的兼容输入。
 * 新项目不需要全部支持，只保留这里是为了降低接入不同后端时的改造成本。
 */
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

/**
 * 模板内部的用户最小模型。
 * 后端可以返回更多字段，业务页面仍可通过索引签名读取扩展信息。
 */
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

/**
 * 动态路由和侧边栏最终消费的菜单模型。
 * adapter 会把后端菜单统一整理成这个结构，布局和路由不直接关心后端字段差异。
 */
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

/**
 * 用户权限信息的内部标准模型。
 * roles 用于角色判断，permissions 用于页面和按钮级权限判断，menus 用于生成菜单和动态路由。
 */
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
