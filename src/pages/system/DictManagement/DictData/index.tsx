import React, { useCallback, useMemo, useRef, useState } from "react";
import { Button } from "antd";
import {
  addDictData,
  deleteDictData,
  getDictDataByPage,
  getDictTypeListSimple,
  updateDictData,
} from "@/api/system/dict/index";
import { renderDictTypeColumns } from "./schema/tableColumns";
import { renderDictDataQueryFields } from "./schema/queryFields";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import useQueryFilter from "@/hooks/useQueryFilter";
import useTableRequest from "@/hooks/useTableRequest";
import { DictTypeRespVO } from "@/api/system/dict/types";
import DictDataModal from "@/components/FormModal";
import { FormModalRef } from "@/components/FormModal/types";
import { renderDictDataForm } from "./schema/modalForms";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";

/**
 * 字典管理页面组件
 */
const DictData: React.FC = () => {
  const { dictType } = useParams();
  /** * 查询参数 Hook
   * 传入 DictRecord 约束查询对象的结构
   */
  const query = useQueryFilter({}, { dictType });

  /** * 表格请求 Hook
   */
  const table = useTableRequest({
    request: getDictDataByPage,
    params: query.getParams(),
  });
  const handleEdit = useCallback((record: DictTypeRespVO) => {
    modalRef.current?.open("编辑字典数据", record, updateDictData);
  }, []);

  const handleDelete = useCallback((record: DictTypeRespVO) => {
    deleteDictData(record.id).then(() => {
      table.reload();
    });
  }, []);

  // modal表单相关
  const modalRef = useRef<FormModalRef>(null);
  return (
    <div className="space-y-6">
      {/* 页面标题区 */}
      <PageHeader
        title="字典管理"
        description="管理系统中的所有字典配置信息"
        buttons={[
          {
            label: "新增字典数据",
            icon: "plus" as const,
            type: "blue" as const,
            clickFunc: () =>
              modalRef.current?.open(
                "新增字典数据",
                { dictType, status: 0 },
                addDictData,
              ),
          },
        ]}
      />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
