import { useDictStore } from "@/store/useDictStore";

/**
 * 字典项数据结构定义
 */
export interface DictData {
  label: string;
  value: any;
  dictType?: string;
  colorType?: string;
  cssClass?: string;
}

/**
 * 数据字典类型常量
 * 可根据实际后端字典类型扩展
 */
export const DICT_TYPE = {
  COMMON_STATUS: "common_status",
  SYSTEM_USER_SEX: "system_user_sex",
  SYSTEM_ROLE_TYPE: "system_role_type",
  SYSTEM_DATA_SCOPE: "system_data_scope",
  SYSTEM_MENU_TYPE: "system_menu_type",
  SYSTEM_LOGIN_TYPE: "system_login_type",
  SYSTEM_LOGIN_RESULT: "system_login_result",
  INFRA_CONFIG_TYPE: "infra_config_type",
} as const;

export type DictType = typeof DICT_TYPE[keyof typeof DICT_TYPE];

/**
 * 获取 dictType 对应的数据字典数组
 * @param dictType 字典类型
 * @returns 数据字典数组
 */
export function getDictDatas(dictType: string): DictData[] {
  const dictDatas = useDictStore.getState().dictDatas;
  return dictDatas[dictType] || [];
}

/**
 * 获取指定的多个字典项
 * @param dictType 字典类型
 * @param values 数组或单个元素
 * @returns 数据字典数组
 */
export function getDictDatas2(dictType: string, values: any): DictData[] {
  if (values === undefined || values === null) {
    return [];
  }

  const valueArray = Array.isArray(values) ? values : [values];
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
 * @param dictType 字典类型
 * @param value 字典值
 */
export function getDictData(dictType: string, value: any): DictData | undefined {
  const dictDatas = getDictDatas(dictType);
  if (!dictDatas || dictDatas.length === 0) {
    return undefined;
  }
  const strValue = String(value);
  return dictDatas.find((dictData) => String(dictData.value) === strValue);
}

/**
 * 获取字典标签 (Label)
 * @param dictType 字典类型
 * @param value 字典值
 */
export function getDictDataLabel(dictType: string, value: any): string {
  const dict = getDictData(dictType, value);
  return dict ? dict.label : "";
}
