// 假设这些是从 API 定义文件导入的
import {  AuthPermissionInfoRespVO, MenuVO } from "@/api/login/types";
import { MenuItem } from "@/layout/Sidebar/types";

/** 状态机类型 */
export type UserStatus = 'idle' | 'loading' | 'loaded' | 'error';

/** Store 的整体状态接口 */
export interface UserState {
  // 直接存储整个响应对象，初始为 null
  info: AuthPermissionInfoRespVO | null;
  status: UserStatus;
  
  // 动态菜单数据
  menus: MenuItem[] | null;           // 转换后的菜单数据，用于侧边栏渲染
  rawMenus: MenuVO | null;            // 原始菜单数据，用于调试和后续处理
  
  // 动态路由数据
  
  // Actions
  fetchUserInfo: () => Promise<void>;
  resetUser: () => void;
  setMenus: (menus: MenuItem[] | null) => void;  // 手动更新菜单数据

}