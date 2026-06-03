import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import { getUserByPage } from "@/api/system/user";

/**
 * 用户表格自定义 Hook
 * 负责查询参数与表格请求的管理
 */
export const useUserTable = () => {
  const query = useQueryFilter({});
  const table = useTableRequest({
    request: getUserByPage,
    params: query.getParams(),
  });

  return {
    query,
    table,
  };
};