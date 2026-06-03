import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getInfo } from "@/api/login";
import type { UserState } from "./types/user";
import { convertMenuVOToMenuItems } from "@/utils/menu";

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
          const res = await getInfo();
          const userInfo = res.data;
          
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
      name: "user-store", // localStorage 中的 key
      partialize: (state) => ({
        rawMenus: state.rawMenus, // 只持久化 rawMenus
        info: state.info, // 也持久化用户信息
      }),
    }
  )
);
