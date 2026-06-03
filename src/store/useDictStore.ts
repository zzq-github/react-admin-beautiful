import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllDictDatas } from "@/api/system/dict/index";
import { DictState, DictDataMap } from "./types/dict";
import { DictDataSimpleRespVO } from "@/api/system/dict/types";
import { message } from "antd";

export const useDictStore = create<DictState>()(
  persist(
    (set, get) => ({
      dictDatas: {},
      isLoading: false,

      fetchDictDatas: async () => {
        // 如果已经在加载，直接返回当前数据
        if (get().isLoading) {
          return get().dictDatas;
        }

        try {
          set({ isLoading: true });

          const response = await getAllDictDatas();
          // 如果未加载到数据，则重置加载状态并返回
          if (!response || !response.data) {
            set({ isLoading: false });
            return;
          }

          // 整理数据结构
          const dictDataMap: DictDataMap = {};

          response.data.forEach((dictData: DictDataSimpleRespVO) => {
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

          // 存储到 Store 中
          set({
            dictDatas: dictDataMap,
            isLoading: false,
          });
          message.success("字典加载成功");
          return dictDataMap;
        } catch (error) {
          console.error("获取字典失败：", error);
          set({ isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: "dict-store", // localStorage 中的 key
      partialize: (state) => ({
        dictDatas: state.dictDatas, // 只持久化字典数据
      }),
    }
  )
);
