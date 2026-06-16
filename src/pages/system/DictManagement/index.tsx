import React from "react";
import { Button, Space } from "antd";
import { Database, Plus } from "lucide-react";
import { useDictStore } from "@/store/useDictStore";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import DictTypeModal from "@/components/FormModal";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
import { renderDictTypeColumns } from "./schema/tableColumns";
import { renderDictTypeQueryFields } from "./schema/queryFields";
import { renderDictTypeForm } from "./schema/modalForms";
import { useDictManagement } from "./hooks";

const DictManagement: React.FC = () => {
  const fetchDictDatas = useDictStore((state) => state.fetchDictDatas);
  const isLoading = useDictStore((state) => state.isLoading);

  const {
    query,
    table,
    handleEdit,
    handleDelete,
    handleAddDictType,
    modalRef,
  } = useDictManagement();

  return (
    <PageContainer
      title="字典管理"
      subtitle="管理字典类型和字典数据，适合存放状态、枚举和选项配置。"
      action={
        <Space>
          <Button
            icon={<Database size={14} />}
            loading={isLoading}
            onClick={() => fetchDictDatas()}
          >
            刷新缓存
          </Button>
          <Button
            type="primary"
            icon={<Plus size={14} />}
            onClick={handleAddDictType}
          >
            新增字典类型
          </Button>
        </Space>
      }
    >
      <PagePanel>
        <QueryFilter
          fields={renderDictTypeQueryFields()}
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
            columns={renderDictTypeColumns({
              EditAction: handleEdit,
              DeleteAction: handleDelete,
            })}
            dataSource={table.data}
            loading={table.loading}
            pagination={table.pagination}
          />
        </div>
      </PagePanel>
      <DictTypeModal
        ref={modalRef}
        onSuccess={table.reload}
        renderForm={(form, isEdit) => renderDictTypeForm(isEdit)}
      />
    </PageContainer>
  );
};

export default DictManagement;
