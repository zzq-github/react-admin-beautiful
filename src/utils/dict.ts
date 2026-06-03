import { useDictStore } from "@/store/useDictStore";

/**
 * 字典项数据结构定义
 */
export interface DictData {
  label: string;
  // 与 store 中保持一致，允许任意类型的 value
  value: any;
  dictType?: string;
  colorType?: string;
  cssClass?: string;
}

/**
 * 数据字典常量定义
 * 使用 as const 将属性锁定为只读字面量类型
 */
export const DICT_TYPE = {
  USER_TYPE: "user_type",
  COMMON_STATUS: "common_status",
  TERMINAL: "terminal",
  SYSTEM_MENU_TYPE: 'system_menu_type',

  // ========== SYSTEM 模块 ==========
  SYSTEM_USER_SEX: "system_user_sex",
  SYSTEM_LOGIN_TYPE: "system_login_type",
  SYSTEM_LOGIN_RESULT: "system_login_result",
  SYSTEM_ROLE_TYPE: 'system_role_type',
  SYSTEM_DATA_SCOPE: 'system_data_scope',
    // ========== INFRA 模块 ==========
  INFRA_CONFIG_TYPE: 'infra_config_type',
} ;

// 提取 DICT_TYPE 的所有值作为类型（例如 "user_type" | "common_status" ...）
export type DictType = typeof DICT_TYPE[keyof typeof DICT_TYPE];

/**
 * 获取 dictType 对应的数据字典数组
 *
 * @param dictType 数据类型
 * @returns 数据字典数组
 */
export function getDictDatas(dictType: string): DictData[] {
  // 假设 Pinia/Zustand store 的状态结构
  const dictDatas = useDictStore.getState().dictDatas;
  return dictDatas[dictType] || [];
}

/**
 * 获取指定的多个字典项
 *
 * @param dictType 数据类型
 * @param values 数组或单个元素
 * @returns 数据字典数组
 */
export function getDictDatas2(dictType: string, values: any): DictData[] {
  if (values === undefined || values === null) {
    return [];
  }
  
  // 如果是单个元素，则转换成数组
  const valueArray = Array.isArray(values) ? values : [values];
  
  // 获得字典数据
  const results: DictData[] = [];
  for (const value of valueArray) {
    const dict = getDictData(dictType, value);
    if (dict) {
      results.push(dict);
    }
  }
  return results;
}

/**
 * 获取单个字典项
 * * @param dictType 字典类型
 * @param value 字典值
 */
export function getDictData(dictType: string, value: any): DictData | undefined {
  const dictDatas = getDictDatas(dictType);
  if (!dictDatas || dictDatas.length === 0) {
    return undefined;
  }
  
  // 强制转换成字符串进行比较
  const strValue = String(value);
  return dictDatas.find((dictData) => String(dictData.value) === strValue);
}

/**
 * 获取字典标签 (Label)
 * * @param dictType 字典类型
 * @param value 字典值
 */
export function getDictDataLabel(dictType: string, value: any): string {
  const dict = getDictData(dictType, value);
  return dict ? dict.label : "";
}