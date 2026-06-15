import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserState } from "./types/user";
import { convertMenuVOToMenuItems } from "@/utils/menu";
import { authService } from "@/core/services/authService";

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      info: null,
      status: "idle",
      menus: null,
      rawMenus: null,

      fetchUserInfo: async () => {
        if (get().status === "loading" || get().status === "loaded") return;

        set({ status: "loading" });

        try {
          const userInfo = await authService.getPermissionInfo();

          // 转换菜单数据
          const rawMenus = userInfo.menus;
          const menus = convertMenuVOToMenuItems(rawMenus);

          set({
            info: userInfo,
            menus,
            rawMenus,
            status: "loaded",
          });
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          set({ status: "error" });
        }
      },

      resetUser: () => {
        set({
          info: null,
          status: "idle",
          menus: null,
          rawMenus: null,
        });
      },

      setMenus: (menus) => {
        set({ menus });
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        rawMenus: state.rawMenus,
        info: state.info,
      }),
    }
  )
);
