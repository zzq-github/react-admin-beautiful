import { DictDataSimpleRespVO } from "@/api/system/dict/types";

export interface DictState {
  dictDatas: DictDataMap;
  isLoading: boolean;
  /** 获取字典数据的方法 */
  fetchDictDatas: () => Promise<DictDataMap | undefined>;
}

/** 字典数据映射表：key 是字典类型(如 'sys_user_sex')，value 是字典项数组 */
export type DictDataMap = Record<string, DictDataSimpleRespVO[]>;