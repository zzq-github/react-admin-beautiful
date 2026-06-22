import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '@/core/services/authService';
import { convertMenuVOToMenuItems } from '@/utils/menu';
import type { UserState } from './types/user';

export function recoverPersistedUserState(
  persistedState: unknown,
  currentState: UserState,
): UserState {
  const restoredState = (persistedState || {}) as Partial<UserState>;
  const info = restoredState.info ?? null;
  const rawMenus = restoredState.rawMenus ?? null;
  const hasRestoredPermissionInfo = Boolean(info) && rawMenus !== null;

  // Zustand persist 只保存 rawMenus 和 info。页面刷新后需要重新派生侧边栏菜单，
  // 否则用户已经登录但菜单为空，动态路由也无法立即恢复。
  return {
    ...currentState,
    ...restoredState,
    info,
    rawMenus,
    menus: hasRestoredPermissionInfo ? convertMenuVOToMenuItems(rawMenus) : null,
    status: hasRestoredPermissionInfo ? 'loaded' : 'idle',
  };
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      info: null,
      status: 'idle',
      menus: null,
      rawMenus: null,

      fetchUserInfo: async () => {
        // 已经加载完成或正在加载时不重复请求，避免路由和布局同时触发接口。
        if (get().status === 'loading' || get().status === 'loaded') return;

        set({ status: 'loading' });

        try {
          const userInfo = await authService.getPermissionInfo();
          const rawMenus = userInfo.menus;
          const menus = convertMenuVOToMenuItems(rawMenus);

          set({
            info: userInfo,
            menus,
            rawMenus,
            status: 'loaded',
          });
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          set({ status: 'error' });
        }
      },

      resetUser: () => {
        set({
          info: null,
          status: 'idle',
          menus: null,
          rawMenus: null,
        });
      },

      setMenus: (menus) => {
        set({ menus });
      },
    }),
    {
      name: 'user-store',
      merge: recoverPersistedUserState,
      partialize: (state) => ({
        rawMenus: state.rawMenus,
        info: state.info,
      }),
    },
  ),
);
