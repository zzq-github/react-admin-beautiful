import BaseModal from "@/components/BaseModal";
import React, { useMemo, useRef, useState } from "react";
import { Checkbox, Form, Input, message, Select, Tree } from "antd";
import useRequest from "@/hooks/useRequest";
import { handleTree } from "@/utils/ruoyi";
import { assignRoleDataScope } from "@/api/system/permission";
import { RoleRespVO } from "@/api/system/role/types";
import { getDepartmentList } from "@/api/system/department";
import { DICT_TYPE, getDictDatas } from "@/utils/dict";
import { DataNode } from "antd/es/tree";
import { PermissionAssignRoleDataScopeReqVO } from "@/api/system/permission/types";

const DataPermissonModal = ({ editDataPermissonModalRef,refreshTable }) => {
  const [permissionData, setPermissionData] = useState<number[]>([]);
  const [dataScope, setDataScope] = useState<number>(1);
  // 获取菜单树节点
  const deptRequest = useRequest({
    request: getDepartmentList,
  });
  const deptTree = useMemo(() => {
    return handleTree(deptRequest.data || [], "id");
  }, [deptRequest.data]);

  // 初始化值
  const handleBeforeOpen = async (record: RoleRespVO) => {
    let treeSelectedKeys: number[] = record.dataScopeDeptIds || [];
    setPermissionData(treeSelectedKeys);
    setDataScope(record.dataScope);
  };
  // 确定按钮
  const handleOk = async (record: RoleRespVO) => {
    let params: PermissionAssignRoleDataScopeReqVO = {
      roleId: record.id,
      dataScope: dataScope,
    };
    if (dataScope === 2) {
      params.dataScopeDeptIds = permissionData;
    }
    await assignRoleDataScope(params);
    message.success("操作成功");
    refreshTable?.();
  };

  // 2. 直接从平面数据获取所有 ID（用于全选逻辑）
  const allIds = useMemo(() => {
    return (deptRequest.data || []).map((item) => item.id);
  }, [deptRequest.data]);

  return (
    <BaseModal
      ref={editDataPermissonModalRef}
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
          <Form.Item label="权限范围">
            <Select
              placeholder="请选择权限范围"
              onChange={(value) => setDataScope(value)}
              value={dataScope}
            >
              {getDictDatas(DICT_TYPE.SYSTEM_DATA_SCOPE).map((dict) => (
                <Select.Option
                  key={parseInt(dict.value)}
                  value={parseInt(dict.value)}
                >
                  {dict.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {dataScope === 2 && (
            <Form.Item label="数据权限">
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
                  treeData={deptTree as unknown as DataNode[]}
                  fieldNames={{
                    key: "id",
                    title: "name",
                    children: "children",
                  }}
                />
              </div>
            </Form.Item>
          )}
        </Form>
      )}
    </BaseModal>
  );
};

export default DataPermissonModal;
