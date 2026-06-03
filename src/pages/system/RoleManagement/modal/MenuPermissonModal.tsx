import BaseModal from "@/components/BaseModal";
import { BaseModalRef } from "@/components/BaseModal/types";
import React, { useMemo, useRef, useState } from "react";
import { Checkbox, Form, Input, message, Tree } from "antd";
import useRequest from "@/hooks/useRequest";
import { getListMenu } from "@/api/system/menu";
import { handleTree } from "@/utils/ruoyi";
import { assignRoleMenu, listRoleMenus } from "@/api/system/permission";
import { RoleRespVO } from "@/api/system/role/types";

const MenuPermissonModal = ({ editMenuPermissionModalRef, refreshTable }) => {
  // 获取菜单树节点
  const treeRequest = useRequest({
    request: getListMenu,
  });
  const menuTree = useMemo(() => {
    return handleTree(treeRequest.data || [], "id");
  }, [treeRequest.data]);
  const [permissionData, setPermissionData] = useState<number[]>([]);

  // 初始化权限树节点勾选状态
  const handleBeforeOpen = async (record: RoleRespVO) => {
    const res = await listRoleMenus(record.id);
    setPermissionData(res.data);
  };
  // 确定按钮
  const handleOk = async (record: RoleRespVO) => {
    await assignRoleMenu({ roleId: record.id, menuIds: permissionData });
    message.success("操作成功");
    refreshTable?.();
  };

  // 2. 直接从平面数据获取所有 ID（用于全选逻辑）
  const allIds = useMemo(() => {
    return (treeRequest.data || []).map((item: any) => item.id);
  }, [treeRequest.data]);

  return (
    <BaseModal
      ref={editMenuPermissionModalRef}
      onBeforeOpen={handleBeforeOpen}
      onOk={handleOk}
    >
      {(record: RoleRespVO) => (
        <Form
          layout="vertical" // 统一控制所有 Item 的布局
          component={false} // 关键：不渲染底层的 <form> 标签，避免触发原生提交
          onFinish={(e) => e.preventDefault()} // 双重保险
        >
          <Form.Item label="角色名称">
            <Input disabled value={record?.name} />
          </Form.Item>

          <Form.Item label="角色标识">
            <Input disabled value={record?.code} />
          </Form.Item>

          <Form.Item label="菜单权限">
            <div className="mb-2 px-1">
              <Checkbox
                // 优化：使用平面数组长度快速判断
                indeterminate={
                  permissionData.length > 0 &&
                  permissionData.length < allIds.length
                }
                checked={
                  allIds.length > 0 && permissionData.length === allIds.length
                }
                onChange={(e) => {
                  setPermissionData(e.target.checked ? allIds : []);
                }}
              >
                全选/全不选
              </Checkbox>
            </div>
            <div className="rounded-md border border-gray-300 p-3 max-h-[400px] overflow-auto hover:border-blue-400 transition-colors">
              <Tree
                checkable
                selectable={false}
                checkedKeys={permissionData} // 绑定数据
                onCheck={(data) => setPermissionData(data as number[])} // 勾选回调
                treeData={menuTree}
                fieldNames={{
                  key: "id",
                  title: "name",
                  children: "children",
                }}
              />
            </div>
          </Form.Item>
        </Form>
      )}
    </BaseModal>
  );
};

export default MenuPermissonModal;
