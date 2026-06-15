import React, { useCallback, useRef } from "react";
import {
  addDictData,
  deleteDictData,
  getDictDataByPage,
  updateDictData,
} from "@/api/system/dict/index";
import { renderDictTypeColumns } from "./schema/tableColumns";
import { renderDictDataQueryFields } from "./schema/queryFields";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import { DictDataRespVO } from "@/api/system/dict/types";
import DictDataModal from "@/components/FormModal";
import { FormModalRef } from "@/components/FormModal/types";
import { renderDictDataForm } from "./schema/modalForms";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";

/**
 * 字典数据管理页面组件
 */
const DictData: React.FC = () => {
  const { dictType } = useParams();
  const modalRef = useRef<FormModalRef>(null);

  const query = useQueryFilter({}, { dictType });
  const table = useTableRequest({
    request: getDictDataByPage,
    params: query.getParams(),
  });

  const handleEdit = useCallback((record: DictDataRespVO) => {
    modalRef.current?.open({
      title: "编辑字典数据",
      record,
      api: updateDictData,
    });
  }, []);

  const handleDelete = useCallback((record: DictDataRespVO) => {
    deleteDictData(record.id).then(() => {
      table.reload();
    });
  }, [table]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="字典管理"
        description="管理系统中的所有字典配置信息"
        buttons={[
          {
            label: "新增字典数据",
            icon: "plus" as const,
            type: "blue" as const,
            clickFunc: () =>
              modalRef.current?.open({
                title: "新增字典数据",
                record: { dictType, status: 0 },
                api: addDictData,
              }),
          },
        ]}
      />
      <div className="bg-theme-bg rounded-lg shadow-sm border border-theme-border p-6">
        <div className="flex flex-col space-y-4">
          <QueryFilter
            fields={renderDictDataQueryFields({})}
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
      <DictDataModal
        ref={modalRef}
        onSuccess={table.reload}
        renderForm={renderDictDataForm}
      />
    </div>
  );
};

export default DictData;
