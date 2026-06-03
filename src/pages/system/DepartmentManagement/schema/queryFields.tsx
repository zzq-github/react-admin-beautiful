import { Input, DatePicker, Select } from "antd";
import { getDictDatas, DICT_TYPE } from "@/utils/dict";

// 字典菜单字段
export const DepartmentFields = ({}): QueryFieldItem[] => [
  {
    name: "name",
    label: "部门名称",
    span: 6,
    component: <Input placeholder="请输入部门名称" />,
  },

  {
    name: "status",
    label: "状态",
    span: 6,
    component: (
      <Select placeholder="请选择状态" allowClear>
        {getDictDatas(DICT_TYPE.COMMON_STATUS).map((dict) => (
          <Select.Option key={dict.value} value={dict.value}>
            {dict.label}
          </Select.Option>
        ))}
      </Select>
    ),
  },
];
