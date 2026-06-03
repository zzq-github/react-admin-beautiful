import React from "react";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import EditPositonModal from "@/components/FormModal";
import { renderPositionColumns } from "./schema/tableColumns";
import { renderPositionQueryFields } from "./schema/queryFields";
import { renderPositionForm } from "./schema/modalForms";
import PageHeader from "@/components/PageHeader";
import { usePositionManagement } from "./hooks";

const PositionManagement: React.FC = () => {
  const {
    query,
    table,
    handleEdit,
    handleDelete,
    handleAddPosition,
    modalRef,
  } = usePositionManagement();

  return (
    <div className="space-y-6">
      {/* 页面标题区 */}
      <PageHeader
        title="岗位管理"
        description="管理系统中的所有岗位信息"
        buttons={[
          {
            label: "新增岗位",
            icon: "plus" as const,
            type: "blue" as const,
            clickFunc: handleAddPosition,
          },
        ]}
      />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col space-y-4">
          <QueryFilter
            fields={renderPositionQueryFields({})}
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

        <div className="overflow-x-auto mt-4">
          <BaseTable
            columns={renderPositionColumns({
              EditAction: handleEdit,
              DeleteAction: handleDelete,
            })}
            dataSource={table.data}
            loading={table.loading}
            pagination={table.pagination}
          />
        </div>
      </div>
      <EditPositonModal
        ref={modalRef}
        onSuccess={table.reload}
        renderForm={renderPositionForm}
      />
    </div>
  );
};

export default PositionManagement;
