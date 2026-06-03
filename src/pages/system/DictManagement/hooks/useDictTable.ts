import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import { getDictTypeByPage } from "@/api/system/dict";

/**
 * 字典表格自定义 Hook
 * 负责查询参数与表格请求的管理
 */
export const useDictTable = () => {
  const query = useQueryFilter({});
  const table = useTableRequest({
    request: getDictTypeByPage,
    params: query.getParams(),
  });

  return {
    query,
    table,
  };
};
