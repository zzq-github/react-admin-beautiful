import React from "react";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import EditParameterSettingsModal from "@/components/FormModal";
import PageHeader from "@/components/PageHeader";
import { renderParameterSettingsQueryFields } from "./schema/queryFields";
import { renderParameterSettingsColumns } from "./schema/tableColumns";
import { renderParameterSettingsForm } from "./schema/modalForms";
import { useParameterSettings } from "./hooks";

const ParameterSettings: React.FC = () => {
  const {
    query,
    table,
    handleEdit,
    handleDelete,
    handleAddConfig,
    modalRef,
  } = useParameterSettings();

  return (
    <div className="space-y-6">
      {/* 页面标题区 */}
      <PageHeader
        title="参数设置"
        description="管理系统参数配置，支持检索、筛选、新增、修改和删除操作"
        buttons={[
          {
            label: "新增参数",
            icon: "plus" as const,
            type: "blue" as const,
            clickFunc: handleAddConfig,
          },
        ]}
      />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col space-y-4">
          <QueryFilter
            fields={renderParameterSettingsQueryFields({})}
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
            columns={renderParameterSettingsColumns({
              EditAction: handleEdit,
              DeleteAction: handleDelete,
            })}
            dataSource={table.data}
            loading={table.loading}
            pagination={table.pagination}
          />
        </div>
      </div>
      <EditParameterSettingsModal
        ref={modalRef}
        onSuccess={table.reload}
        renderForm={renderParameterSettingsForm}
      />
    </div>
  );
};

export default ParameterSettings;
