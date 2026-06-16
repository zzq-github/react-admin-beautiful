import React from "react";
import { Button } from "antd";
import { Plus } from "lucide-react";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import EditParameterSettingsModal from "@/components/FormModal";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
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
    <PageContainer
      title="参数设置"
      subtitle="管理系统参数配置，支持检索、筛选、新增、修改和删除。"
      action={
        <Button
          type="primary"
          icon={<Plus size={14} />}
          onClick={handleAddConfig}
        >
          新增参数
        </Button>
      }
    >
      <PagePanel>
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

        <div className="overflow-x-auto">
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
      </PagePanel>
      <EditParameterSettingsModal
        ref={modalRef}
        onSuccess={table.reload}
        renderForm={renderParameterSettingsForm}
      />
    </PageContainer>
  );
};

export default ParameterSettings;
