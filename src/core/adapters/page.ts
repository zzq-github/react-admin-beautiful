import type { PageResponseLike, PageResult } from '@/core/types';

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
