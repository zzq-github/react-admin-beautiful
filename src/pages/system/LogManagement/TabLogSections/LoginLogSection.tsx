import React from "react";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import { getLoginLogByPage } from "@/api/system/loginlog";
import { LoginLogFields } from "../schema/queryFields";
import { LoginLogColumns } from "../schema/tableColumns";


const LoginLogSection: React.FC = () => {
  const query = useQueryFilter();

  const table = useTableRequest({
    request: getLoginLogByPage,
    params: query.getParams(), 
  });

  return (
    <>
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <QueryFilter
          fields={LoginLogFields()}
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
          columns={LoginLogColumns()}
          dataSource={table.data}
          loading={table.loading}
          pagination={table.pagination}
        />
      </div>
    </>
  );
};

export default LoginLogSection;