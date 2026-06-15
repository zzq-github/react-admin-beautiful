import type { AdminMenu, AdminPermissionInfo } from '@/core/types';
import type { MenuItem } from '@/layout/Sidebar/types';

/** 状态机类型 */
export type UserStatus = 'idle' | 'loading' | 'loaded' | 'error';

/** Store 的整体状态接口 */
export interface UserState {
  /** 用户权限信息（包含用户信息、角色、权限、菜单） */
  info: AdminPermissionInfo | null;
  /** 加载状态 */
  status: UserStatus;
  /** 转换后的菜单数据，用于侧边栏渲染 */
  menus: MenuItem[] | null;
  /** 原始菜单数据，用于路由生成 */
  rawMenus: AdminMenu | AdminMenu[] | null;

  // Actions
  fetchUserInfo: () => Promise<void>;
  resetUser: () => void;
  setMenus: (menus: MenuItem[] | null) => void;
}
