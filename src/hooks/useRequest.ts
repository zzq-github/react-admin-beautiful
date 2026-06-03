import { useState, useEffect, useCallback, useRef } from "react";
import { UseRequestOptions } from "./types/request";

const useRequest = <P = any, T = any>({
  request,
  params = {} as P,
  manual = false,
}: UseRequestOptions<P, T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const fetchedRef = useRef(false);
  const paramsRef = useRef<P>(params);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  const fetchData = useCallback(async (overrideParams?: P) => {
    setLoading(true);
    try {
      const res = await request(overrideParams ?? paramsRef.current);
      const result = (res as any).data ?? res;
      setData(result);
      return result as T; // 显式断言返回类型，方便外部 await
    } catch (error) {
      console.error("Request Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    if (manual || fetchedRef.current) return;
    fetchedRef.current = true;
    fetchData();
  }, [manual, fetchData]);

  return { data, loading, fetchData, setData };
};

export default useRequest;