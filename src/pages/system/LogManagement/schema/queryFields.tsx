import { UserSimpleRespVO } from "@/api/system/user/types";
import { Input, DatePicker, Select } from "antd";
const { RangePicker } = DatePicker;

interface OperationLogFieldsProps {
  userListData?: UserSimpleRespVO[];
}

/** 操作日志查询列 */
export const OperationLogFields = ({
  userListData = [],
}: OperationLogFieldsProps): QueryFieldItem[] => {
  return [
    {
      name: "userId",
      label: "操作人",
      component: (
        <Select placeholder="请选择操作人" allowClear>
          {userListData.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.nickname}
            </Select.Option>
          ))}
        </Select>
      ),
      span: 6,
    },
    {
      name: "type",
      label: "操作模块",
      component: <Input placeholder="请输入操作模块" />,
      span: 6,
    },
    {
      name: "subType",
      label: "操作名",
      component: <Input placeholder="请输入操作名" />,
      span: 6,
    },
    {
      name: "action",
      label: "操作内容",
      component: <Input placeholder="请输入操作内容" />,
      span: 6,
    },

    {
      name: "bizId",
      label: "业务编号",
      component: <Input placeholder="请输入业务编号" />,
      span: 6,
    },
    {
      name: "createTime",
      label: "操作时间",
      component: <RangePicker format="YYYY-MM-DD" />,
      span: 12,
      transformChangeValue: (value) => {
        if (value) {
          return [
            value[0].format("YYYY-MM-DD 00:00:00"),
            value[1].format("YYYY-MM-DD 23:59:59"),
          ];
        } else {
          return value;
        }
      },
    },
  ];
};

// 登录日志查询列
export const LoginLogFields = () => [
  {
    name: "userIp",
    label: "登录地址",
    span: 6,
    component: <Input placeholder="请输入登录地址" />,
  },
  {
    name: "username",
    label: "用户名称",
    span: 6,
    component: <Input placeholder="请输入用户名称" />,
  },
  {
    name: "status",
    label: "状态",
    span: 6,
    component: (
      <Select placeholder="请选择状态" allowClear>
        <Select.Option value={true}>成功</Select.Option>
        <Select.Option value={false}>失败</Select.Option>
      </Select>
    ),
  },
  {
    name: "createTime",
    label: "登录时间",
    span: 6,
    component: <RangePicker format="YYYY-MM-DD" />,
    transformChangeValue: (value) => {
      if (value) {
        return [
          value[0].format("YYYY-MM-DD 00:00:00"),
          value[1].format("YYYY-MM-DD 23:59:59"),
        ];
      } else {
        return value;
      }
    },
  },
];
