import { useRef, useCallback } from "react";

const useQueryFilter = <T extends Record<string, any>>(
  initialParams: T = {} as T,
  fixedParams: Record<string, any> = {},
) => {
  // 1. 只用 ref 存储“可变”的表单数据 (不包含 fixedParams)
  const formParamsRef = useRef<T>(initialParams);

  // 2. 更新函数：只更新表单数据
  const onChange = useCallback((values: Partial<T>) => {
    // 这里做浅合并，防止丢失未被修改的字段
    formParamsRef.current = {
      ...formParamsRef.current,
      ...values,
    };
  }, []);

  // 3. 获取最终参数：动态合并 fixedParams
  const getParams = useCallback(() => {
    return {
      ...formParamsRef.current,
      ...fixedParams, // fixedParams 优先级最高，覆盖同名 key
    };
  }, [fixedParams]); // 这里的依赖其实可以为空，因为 ref 是引用，但为了闭包安全加上也可以

  // 4. 重置函数 
  const reset = useCallback(() => {
    formParamsRef.current = initialParams;
  }, [initialParams]);

  return {
    getParams,
    onChange,
    reset,
  };
};

export default useQueryFilter;