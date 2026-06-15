import type { DictData } from '@/utils/dict';

export interface DictState {
  /** 字典数据映射表：key 是字典类型，value 是字典项数组 */
  dictDatas: DictDataMap;
  /** 是否正在加载 */
  isLoading: boolean;
  /** 获取字典数据的方法 */
  fetchDictDatas: () => Promise<DictDataMap | undefined>;
}

/** 字典数据映射表类型 */
export type DictDataMap = Record<string, DictData[]>;
