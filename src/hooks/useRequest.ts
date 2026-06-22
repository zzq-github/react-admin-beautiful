import { useCallback, useEffect, useRef, useState } from 'react';
import { apiProtocol } from '@/core/adapters/protocol';
import { UseRequestOptions } from './types/request';

const useRequest = <P = any, T = any>({
  request,
  params = {} as P,
  manual = false,
}: UseRequestOptions<P, T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchedRef = useRef(false);
  const mountedRef = useRef(false);
  const requestIdRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const paramsRef = useRef<P>(params);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  const fetchData = useCallback(
    async (overrideParams?: P) => {
      const requestId = requestIdRef.current + 1;
      const abortController = new AbortController();

      // 新请求发起时取消上一个请求，并记录本次请求编号。
      // 这样快速切换筛选条件或组件卸载时，不会被过期响应覆盖状态。
      requestIdRef.current = requestId;
      abortControllerRef.current?.abort();
      abortControllerRef.current = abortController;

      if (mountedRef.current) {
        setLoading(true);
      }

      try {
        const res = await request(overrideParams ?? paramsRef.current, {
          signal: abortController.signal,
        });
        const result = apiProtocol.getData<T>(res);

        // 只有最新一次请求允许更新数据，避免慢请求后返回时覆盖新结果。
        if (mountedRef.current && requestIdRef.current === requestId) {
          setData(result);
        }

        return result;
      } catch (error) {
        if (abortController.signal.aborted) {
          // 主动取消不是业务错误，不向页面继续抛出。
          return undefined as T;
        }

        console.error('Request Error:', error);
        throw error;
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
    fetchData();
  }, [manual, fetchData]);

  return { data, loading, fetchData, setData };
};

export default useRequest;
