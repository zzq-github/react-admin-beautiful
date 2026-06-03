import React from "react";
import { Database, Plus } from "lucide-react";
import { useDictStore } from "@/store/useDictStore";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import DictTypeModal from "@/components/FormModal";
import { renderDictTypeColumns } from "./schema/tableColumns";
import { renderDictTypeQueryFields } from "./schema/queryFields";
import { renderDictTypeForm } from "./schema/modalForms";
import PageHeader from "@/components/PageHeader";
import { useDictManagement } from "./hooks";

/**
 * 字典管理页面组件
 */
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
    <div className="space-y-6">
      {/* 页面标题区 */}
      <PageHeader
        title="字典管理"
        description="管理系统中的所有字典配置信息"
        buttons={[
          {
            label: "新增字典类型",
            icon: "plus" as const,
            type: "blue" as const,
            clickFunc: handleAddDictType,
          },
          {
            label: "刷新缓存",
            icon: "database" as const,
            type: "green" as const,
            loading: isLoading,
            clickFunc: () => fetchDictDatas(),
          },
        ]}
      />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col space-y-4">
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
        </div>

        <div className="overflow-x-auto mt-4">
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
      </div>
      <DictTypeModal
        ref={modalRef}
        onSuccess={table.reload}
        // 直接传递一个渲染函数
        renderForm={(form, isEdit) => renderDictTypeForm(isEdit)}
      />
    </div>
  );
};

export default DictManagement;
