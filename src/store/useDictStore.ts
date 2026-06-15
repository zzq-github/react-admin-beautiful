import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllDictDatas } from "@/api/system/dict/index";
import { DictState, DictDataMap } from "./types/dict";
import { message } from "antd";

export const useDictStore = create<DictState>()(
  persist(
    (set, get) => ({
      dictDatas: {},
      isLoading: false,

      fetchDictDatas: async () => {
        if (get().isLoading) {
          return get().dictDatas;
        }

        try {
          set({ isLoading: true });

          const response = await getAllDictDatas();
          if (!response || !response.data) {
            set({ isLoading: false });
            return;
          }

          // 整理数据结构：按 dictType 分组
          const dictDataMap: DictDataMap = {};
          response.data.forEach((dictData: any) => {
            const type = dictData.dictType;
            if (!dictDataMap[type]) {
              dictDataMap[type] = [];
            }
            dictDataMap[type].push({
              dictType: dictData.dictType,
              value: dictData.value,
              label: dictData.label,
              colorType: dictData.colorType,
              cssClass: dictData.cssClass,
            });
          });

          set({
            dictDatas: dictDataMap,
            isLoading: false,
          });
          return dictDataMap;
        } catch (error) {
          console.error("获取字典失败：", error);
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: "dict-store",
      partialize: (state) => ({
        dictDatas: state.dictDatas,
      }),
    }
  )
);
