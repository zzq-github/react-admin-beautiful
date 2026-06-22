import type { PageResponseLike, PageResult } from '@/core/types';

/**
 * 把不同后端的分页结构整理成 { list, total }。
 *
 * 支持 list/rows/records/data 和 total/count/totalCount，是为了让 BaseTable、
 * useTableRequest 以及业务页面不关心真实后端字段名。
 */
export function normalizePageResult<T = any>(
  response: PageResult<T> | PageResponseLike<T> | T[] | null | undefined,
): PageResult<T> {
  if (Array.isArray(response)) {
    return {
      list: response,
      total: response.length,
    };
  }

  if (!response || typeof response !== 'object') {
    return {
      list: [],
      total: 0,
    };
  }

  const list = pickFirstArray<T>(response, ['list', 'rows', 'records', 'data']);

  return {
    ...response,
    list,
    total: pickFirstNumber(response, ['total', 'count', 'totalCount'], list.length),
  };
}

function pickFirstArray<T>(source: Record<string, any>, keys: string[]): T[] {
  for (const key of keys) {
    if (Array.isArray(source[key])) {
      return source[key];
    }
  }

  return [];
}

function pickFirstNumber(source: Record<string, any>, keys: string[], fallback: number): number {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
  }

  return fallback;
}
