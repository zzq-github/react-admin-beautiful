import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";

import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import useRequest from "@/hooks/useRequest";

import { getOperateLogByPage } from "@/api/system/operatelog";
import { getUsersSimpleList } from "@/api/system/user";
import { OperationLogColumns } from "../schema/tableColumns";
import { OperationLogFields } from "../schema/queryFields";
import { useMemo } from "react";

const OperationLogSection = () => {
  /** 查询参数 */
  const query = useQueryFilter();

  /** 表格请求 */
  const table = useTableRequest({
    request: getOperateLogByPage,
    params: query.getParams(),
  });

  // 用户列表请求
  const userList = useRequest({
    request: getUsersSimpleList,
  });

  const formatOperationLogFields = useMemo(() => {
    return OperationLogFields({ userListData: userList.data || [] });
  }, [userList.data]);

  return (
    <>
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <QueryFilter
          fields={formatOperationLogFields}
          onChange={query.onChange}
          onSearch={() => {
            table.reload(query.getParams());
          }}
          onReset={() => {
              query.reset();
            table.reload(query.getParams());
          }}
        />
      </div>
      <div className="overflow-x-auto">
        <BaseTable
          columns={OperationLogColumns()}
          dataSource={table.data}
          loading={table.loading}
          pagination={table.pagination}
        />
      </div>
    </>
  );
};

export default OperationLogSection;
