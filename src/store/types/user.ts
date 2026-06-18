import type { AdminMenu, AdminPermissionInfo } from '@/core/types';
import type { MenuItem } from '@/layout/Sidebar/types';

export type UserStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface UserState {
  info: AdminPermissionInfo | null;
  status: UserStatus;
  menus: MenuItem[] | null;
  rawMenus: AdminMenu | AdminMenu[] | null;
  fetchUserInfo: () => Promise<void>;
  resetUser: () => void;
  setMenus: (menus: MenuItem[] | null) => void;
}
