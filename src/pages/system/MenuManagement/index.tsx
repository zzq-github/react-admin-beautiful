import { Plus } from "lucide-react";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import EditMenuModal from "@/components/FormModal";
import { MenuColumns } from "./schema/tableColumns";
import { MenuFields } from "./schema/queryFields";
import { renderEditMenuForm } from "./schema/modalForms";
import PageHeader from "@/components/PageHeader";
import { useMenuManagement } from "./hooks";

const MenuManagement = () => {
  const {
    query,
    request,
    menuTree,
    handleEdit,
    handleDelete,
    handleAddMenu,
    modalRef,
  } = useMenuManagement();

  return (
    <div className="space-y-6">
      <PageHeader
        title="菜单管理"
        description="管理系统菜单结构和权限配置"
        buttons={[
          {
            label: "新增菜单",
            icon: "plus" as const,
            type: "blue" as const,
            clickFunc: handleAddMenu,
          },
        ]}
      />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col space-y-4">
          <QueryFilter
            fields={MenuFields({})}
            onChange={query.onChange}
            onSearch={() => {
              request.fetchData(query.getParams());
            }}
            onReset={() => {
              query.reset();
              request.fetchData(query.getParams());
            }}
          />
        </div>
        <div className="overflow-x-auto">
          <BaseTable
            columns={MenuColumns({
              EditAction: handleEdit,
              DeleteAction: handleDelete,
            })}
            dataSource={menuTree}
            loading={request.loading}
            pagination={false}
          />
        </div>
      </div>
      <EditMenuModal
        width={900}
        ref={modalRef}
        onSuccess={request.fetchData}
        // 直接传递一个渲染函数
        renderForm={(form) => renderEditMenuForm({
          form, menuTree
        })}
      />
    </div>
  );
};

export default MenuManagement;
