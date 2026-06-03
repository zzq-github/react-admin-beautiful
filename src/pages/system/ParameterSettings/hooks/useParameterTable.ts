import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import { getConfigListByPage } from "@/api/system/parameterSettings";

/**
 * 参数表格自定义 Hook
 * 负责查询参数与表格请求的管理
 */
export const useParameterTable = () => {
  const query = useQueryFilter({});
  const table = useTableRequest({
    request: getConfigListByPage,
    params: query.getParams(),
  });

  return {
    query,
    table,
  };
};
