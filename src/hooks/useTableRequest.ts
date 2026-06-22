import { useCallback, useEffect, useRef, useState } from 'react';
import { apiProtocol } from '@/core/adapters/protocol';
import { normalizePageResult } from '@/core/adapters/page';
import type { PageResponseLike } from '@/core/types';
import { PaginationState, UseTableOptions } from './types/tableRequest';

const DEFAULT_PAGINATION: PaginationState = {
  current: 1,
  pageSize: 10,
  total: 0,
};

const useTableRequest = <P extends Record<string, any> = any, T = any>({
  request,
  params = {} as P,
  defaultPagination = {},
  manual = false,
}: UseTableOptions<P, T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationState>({
    ...DEFAULT_PAGINATION,
    ...defaultPagination,
  });

  const fetchedRef = useRef(false);
  const mountedRef = useRef(false);
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchParamsSnapshot = useRef<P>(params);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  const fetchData = useCallback(
    async (page = pagination.current, size = pagination.pageSize, currentParams?: P) => {
      const requestId = requestIdRef.current + 1;
      const abortController = new AbortController();

      // 表格查询经常由分页、筛选、刷新连续触发。
      // 取消旧请求并用 requestId 保护状态，可以避免旧响应覆盖最新表格数据。
      requestIdRef.current = requestId;
      abortControllerRef.current?.abort();
      abortControllerRef.current = abortController;

      if (mountedRef.current) {
        setLoading(true);
      }

      if (currentParams) {
        // reload(newParams) 会更新筛选快照；翻页时继续沿用最近一次筛选条件。
        searchParamsSnapshot.current = currentParams;
      }

      try {
        const res = await request(
          {
            pageNo: page,
            pageSize: size,
            ...searchParamsSnapshot.current,
          },
          {
            signal: abortController.signal,
          },
        );
        const result = apiProtocol.getData<PageResult<T> | PageResponseLike<T> | T[]>(res);
        const pageResult = normalizePageResult<T>(result);

        // 只允许最新请求落库，解决快速切页或筛选时的并发返回顺序问题。
        if (mountedRef.current && requestIdRef.current === requestId) {
          setData(pageResult.list);
          setPagination((p) => ({
            ...p,
            current: page,
            pageSize: size,
            total: pageResult.total,
          }));
        }
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        console.error('Table fetch error:', error);
      } finally {
        if (mountedRef.current && requestIdRef.current === requestId) {
          setLoading(false);
        }
      }
    },
    [request],
  );

  useEffect(() => {
    if (manual || fetchedRef.current) return;
    fetchedRef.current = true;
    fetchData(DEFAULT_PAGINATION.current, DEFAULT_PAGINATION.pageSize, params);
  }, [manual, fetchData]);

  const onTableChange = (current: number, pageSize: number) => {
    fetchData(current, pageSize);
  };

  return {
    data,
    loading,
    pagination: { ...pagination, onChange: onTableChange },
    reload: (newParams?: P) => fetchData(1, pagination.pageSize, newParams),
  };
};

export default useTableRequest;
