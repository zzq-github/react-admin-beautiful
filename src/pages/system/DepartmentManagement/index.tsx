import { Button } from "antd";
import { Plus } from "lucide-react";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import EditDepartmentModal from "@/components/FormModal";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
import { DepartmentColumns } from "./schema/tableColumns";
import { DepartmentFields } from "./schema/queryFields";
import { renderEditDepartmentForm } from "./schema/modalForms";
import { useDepartmentManagement } from "./hooks";

const DepartmentManagement = () => {
  const {
    query,
    request,
    departmentTree,
    userList,
    handleEdit,
    handleDelete,
    handleAddDepartment,
    modalRef,
  } = useDepartmentManagement();

  return (
    <PageContainer
      title="部门管理"
      subtitle="管理组织架构、部门负责人和上下级关系。"
      action={
        <Button
          type="primary"
          icon={<Plus size={14} />}
          onClick={handleAddDepartment}
        >
          新增部门
        </Button>
      }
    >
      <PagePanel>
        <QueryFilter
          fields={DepartmentFields({})}
          onChange={query.onChange}
          onSearch={() => {
            request.fetchData(query.getParams());
          }}
          onReset={() => {
            query.reset();
            request.fetchData(query.getParams());
          }}
        />
        <div className="overflow-x-auto">
          <BaseTable
            columns={DepartmentColumns({
              EditAction: handleEdit,
              DeleteAction: handleDelete,
            })}
            dataSource={departmentTree}
            loading={request.loading}
            pagination={false}
          />
        </div>
      </PagePanel>
      <EditDepartmentModal
        width={900}
        ref={modalRef}
        onSuccess={request.fetchData}
        renderForm={() =>
          renderEditDepartmentForm({
            userListData: userList || [],
            departmentTree,
          })
        }
      />
    </PageContainer>
  );
};

export default DepartmentManagement;
