/**
 * Common utility methods.
 */

import { appConfig } from "@/config/app";

type TimeInput = string | number | Date | null | undefined;

export function parseTime(time: TimeInput, pattern?: string): string | null {
  if (!time) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date: Date;

  if (typeof time === "object") {
    date = time as Date;
  } else {
    let t = time;
    if (typeof t === "string" && /^[0-9]+$/.test(t)) {
      t = parseInt(t);
    } else if (typeof t === "string") {
      t = t.replace(/-/gm, "/").replace("T", " ").replace(/\.\d{3}/gm, "");
    }
    if (typeof t === "number" && t.toString().length === 10) {
      t = t * 1000;
    }
    date = new Date(t);
  }

  const formatObj: Record<string, number> = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };

  return format.replace(/{([ymdhisa])+}/g, (_result, key) => {
    const value = formatObj[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value < 10 ? `0${value}` : `${value}`;
  });
}

export function addDateRange(params: any, dateRange: any[], propName?: string) {
  const search = params;
  search.params = {};
  if (dateRange && Array.isArray(dateRange) && dateRange.length === 2) {
    if (typeof propName === "undefined") {
      search.beginTime = dateRange[0];
      search.endTime = dateRange[1];
    } else {
      search["begin" + propName] = dateRange[0];
      search["end" + propName] = dateRange[1];
    }
  }
  return search;
}

export function addBeginAndEndTime(
  params: any,
  dateRange: any[] | undefined,
  propName?: string
) {
  if (!dateRange) return params;

  const pName = !propName
    ? "Time"
    : propName.charAt(0).toUpperCase() + propName.slice(1);

  if (dateRange[0]) {
    params["begin" + pName] = dateRange[0] + " 00:00:00";
  }
  if (dateRange[1]) {
    params["end" + pName] = dateRange[1] + " 23:59:59";
  }
  return params;
}

export function praseStrEmpty(str: any): string {
  if (!str || str === "undefined" || str === "null") {
    return "";
  }
  return String(str);
}

export function handleTree<T = any>(
  data: T[],
  id: string = "id",
  parentId: string = "parentId",
  children: string = "children",
  rootId?: any
): T[] {
  const config = {
    id,
    parentId,
    childrenList: children,
    rootId: rootId ?? Math.min(...data.map((item: any) => item[parentId])) ?? 0,
  };

  const childrenListMap: Record<string, any[]> = {};
  const nodeIds: Record<string, any> = {};
  const tree: T[] = [];

  for (const item of data as any[]) {
    const itemParentId = item[config.parentId];
    if (childrenListMap[itemParentId] == null) {
      childrenListMap[itemParentId] = [];
    }
    nodeIds[item[config.id]] = item;
    childrenListMap[itemParentId].push(item);
  }

  for (const item of data as any[]) {
    const itemParentId = item[config.parentId];
    if (nodeIds[itemParentId] == null && itemParentId === config.rootId) {
      tree.push(item);
    }
  }

  const attachChildren = (node: any) => {
    if (childrenListMap[node[config.id]] != null) {
      node[config.childrenList] = childrenListMap[node[config.id]];
    }
    if (node[config.childrenList]) {
      for (const child of node[config.childrenList]) {
        attachChildren(child);
      }
    }
  };

  for (const item of tree as any[]) {
    attachChildren(item);
  }

  return tree;
}

export function getNowDateTime(timeStr?: string | null): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  if (timeStr) {
    return `${year}-${month}-${day} ${timeStr}`;
  }
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getCaptchaEnable(): boolean {
  return appConfig.captchaEnabled;
}

export function divide(
  divisor: number | null,
  dividend: number | null
): number | null {
  if (divisor == null || dividend == null || dividend === 0) {
    return null;
  }
  return Math.floor((divisor / dividend) * 100) / 100;
}
