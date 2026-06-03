import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import { getPositionListByPage } from "@/api/system/position";

/**
 * 岗位表格自定义 Hook
 * 负责查询参数与表格请求的管理
 */
export const usePositionTable = () => {
  const query = useQueryFilter({});
  const table = useTableRequest({
    request: getPositionListByPage,
    params: query.getParams(),
  });

  return {
    query,
    table,
  };
};
