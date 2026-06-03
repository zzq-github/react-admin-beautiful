/**
 * 通用 ts 方法封装处理
 */

// 日期格式化类型定义
type TimeInput = string | number | Date | null | undefined;

/**
 * 日期格式化
 * @param time 时间
 * @param pattern 格式模版
 */
export function parseTime(time: TimeInput, pattern?: string): string | null {
  if (!time) {
    return null;
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date: Date;
  
  if (typeof time === 'object') {
    date = time as Date;
  } else {
    let t = time;
    if (typeof t === 'string' && /^[0-9]+$/.test(t)) {
      t = parseInt(t);
    } else if (typeof t === 'string') {
      t = t.replace(/-/gm, '/').replace('T', ' ').replace(/\.\d{3}/gm, '');
    }
    if (typeof t === 'number' && t.toString().length === 10) {
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
    a: date.getDay()
  };

  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    const strValue = value < 10 ? `0${value}` : `${value}`;
    return strValue || '0';
  });
}

/**
 * 添加日期范围
 */
export function addDateRange(params: any, dateRange: any[], propName?: string) {
  const search = params;
  search.params = {};
  if (dateRange && Array.isArray(dateRange) && dateRange.length === 2) {
    if (typeof propName === "undefined") {
      search["beginTime"] = dateRange[0];
      search["endTime"] = dateRange[1];
    } else {
      search["begin" + propName] = dateRange[0];
      search["end" + propName] = dateRange[1];
    }
  }
  return search;
}

/**
 * 添加开始和结束时间到 params 参数中
 */
export function addBeginAndEndTime(params: any, dateRange: any[] | undefined, propName?: string) {
  if (!dateRange) return params;
  
  let pName = !propName ? 'Time' : propName.charAt(0).toUpperCase() + propName.slice(1);
  
  if (dateRange[0]) {
    params['begin' + pName] = dateRange[0] + ' 00:00:00';
  }
  if (dateRange[1]) {
    params['end' + pName] = dateRange[1] + ' 23:59:59';
  }
  return params;
}

/**
 * 转换字符串，undefined,null等转化为""
 */
export function praseStrEmpty(str: any): string {
  if (!str || str === "undefined" || str === "null") {
    return "";
  }
  return String(str);
}

/**
 * 构造树型结构数据
 */
export function handleTree<T = any>(
  data: T[], 
  id: string = 'id', 
  parentId: string = 'parentId', 
  children: string = 'children', 
  rootId?: any
): T[] {
  const config = {
    id: id,
    parentId: parentId,
    childrenList: children,
    rootId: rootId ?? Math.min(...data.map((item: any) => item[parentId])) ?? 0
  };

  const childrenListMap: Record<string, any> = {};
  const nodeIds: Record<string, any> = {};
  const tree: T[] = [];

  for (const d of data as any[]) {
    const pId = d[config.parentId];
    if (childrenListMap[pId] == null) {
      childrenListMap[pId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[pId].push(d);
  }

  for (const d of data as any[]) {
    const pId = d[config.parentId];
    if (nodeIds[pId] == null && pId === config.rootId) {
      tree.push(d);
    }
  }

  for (const t of tree as any[]) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: any) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * 获取当前时间
 */
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

/**
 * 环境变量相关方法
 */
export function getTenantEnable(): boolean {
  const val = import.meta.env.VITE_TENANT_ENABLE;
  return val === "true" || val === true;
}

export function getCaptchaEnable(): boolean {
  const val = import.meta.env.VITE_CAPTCHA_ENABLE;
  return val === "true" || val === true;
}

export function getBasePath(): string {
  return (import.meta.env.VITE_APP_NAME as string) || '/';
}

export function getPath(path: string): string {
  const basePath = getBasePath();
  const safeBasePath = basePath.endsWith('/') ? basePath : basePath + '/';
  const safePath = path.startsWith('/') ? path.substring(1) : path;
  return safeBasePath + safePath;
}

/**
 * 除法保留两位小数
 */
export function divide(divisor: number | null, dividend: number | null): number | null {
  if (divisor == null || dividend == null || dividend === 0) {
    return null;
  }
  return Math.floor((divisor / dividend) * 100) / 100;
}