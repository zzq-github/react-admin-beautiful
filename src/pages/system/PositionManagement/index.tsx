import React from "react";
import { Button } from "antd";
import { Plus } from "lucide-react";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import EditPositonModal from "@/components/FormModal";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
import { renderPositionColumns } from "./schema/tableColumns";
import { renderPositionQueryFields } from "./schema/queryFields";
import { renderPositionForm } from "./schema/modalForms";
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
    <PageContainer
      title="岗位管理"
      subtitle="管理岗位编码、排序、状态和岗位说明。"
      action={
        <Button
          type="primary"
          icon={<Plus size={14} />}
          onClick={handleAddPosition}
        >
          新增岗位
        </Button>
      }
    >
      <PagePanel>
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

        <div className="overflow-x-auto">
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
      </PagePanel>
      <EditPositonModal
        ref={modalRef}
        onSuccess={table.reload}
        renderForm={renderPositionForm}
      />
    </PageContainer>
  );
};

export default PositionManagement;
