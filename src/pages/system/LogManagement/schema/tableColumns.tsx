import dayjs from "dayjs";
import { getDictDataLabel, DICT_TYPE } from '@/utils/dict'
import { OperateLogRespVO } from "@/api/system/operatelog/types";
import { LoginLogRespVO } from "@/api/system/loginlog/types";

export  const OperationLogColumns = () => [
    { title: "日志编号", dataIndex: "id" },
    { title: "操作人", dataIndex: "userName" },
    { title: "操作模块", dataIndex: "type" },
    { title: "操作名", dataIndex: "subType" },
    { title: "操作内容", dataIndex: "action" },
    {
      title: "操作日期",
      dataIndex: "createTime",
      render: (_: any, record: OperateLogRespVO) => dayjs(record.createTime).format("YYYY-MM-DD HH:mm"),
    }, 
    { title: "业务编号", dataIndex: "bizId" },
    { title: "操作 IP", dataIndex: "userIp" },
  ];


  export const LoginLogColumns = () =>  [
      {
        title: "访问编号",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "日志类型",
        dataIndex: "logType",
        key: "logType",
        render: (_: any, record: LoginLogRespVO) => getDictDataLabel(DICT_TYPE.SYSTEM_LOGIN_TYPE, record.logType),
      },
      {
        title: "用户名称",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "登录地址",
        dataIndex: "userIp",
        key: "userIp",
      },
      {
        title: "操作系统",
        dataIndex: "userAgent",
        key: "userAgent",
      },
      {
        title: "结果",
        dataIndex: "result",
        key: "result",
        render: (_: any, record: LoginLogRespVO) => getDictDataLabel(DICT_TYPE.SYSTEM_LOGIN_RESULT, record.result),
      },
      {
        title: "登录日期",
        dataIndex: "createTime",
        render:(_: any, record: LoginLogRespVO)=>dayjs(record.createTime).format('YYYY-MM-DD HH:mm')
      }
  ]