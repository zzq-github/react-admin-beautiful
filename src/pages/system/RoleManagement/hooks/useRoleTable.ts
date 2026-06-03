import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import { getRolePage } from "@/api/system/role";

/**
 * 角色表格自定义 Hook
 * 负责查询参数与表格请求的管理
 */
export const useRoleTable = () => {
  const query = useQueryFilter({});
  const table = useTableRequest({
    request: getRolePage,
    params: query.getParams(),
  });

  return {
    query,
    table,
  };
};
