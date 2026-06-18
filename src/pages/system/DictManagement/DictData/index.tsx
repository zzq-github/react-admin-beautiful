import React, { useCallback, useRef } from "react";
import { Button } from "antd";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";
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
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
import Auth from "@/components/Auth";

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
    <PageContainer
      title="字典数据"
      subtitle={`管理 ${dictType || "当前字典"} 下的选项值和展示样式。`}
      action={
        <Auth code="system:dict:create">
          <Button
            type="primary"
            icon={<Plus size={14} />}
            onClick={() =>
              modalRef.current?.open({
                title: "新增字典数据",
                record: { dictType, status: 0 },
                api: addDictData,
              })
            }
          >
            新增字典数据
          </Button>
        </Auth>
      }
    >
      <PagePanel>
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
      <DictDataModal
        ref={modalRef}
        onSuccess={table.reload}
        renderForm={renderDictDataForm}
      />
    </PageContainer>
  );
};

export default DictData;
