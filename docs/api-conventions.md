# API 命名规范

本文约定 `src/api` 的目录和函数命名，方便前端模板与真实后端服务保持一致。

## 目录结构

接口按业务域拆分：

```text
src/api/<domain>/<module>/
├── index.ts
└── types.ts
```

示例：

```text
src/api/system/user
src/api/system/role
src/api/examples/project
```

## 函数命名

新增接口优先使用下面的命名：

| 场景        | 推荐命名           | 示例                |
| ----------- | ------------------ | ------------------- |
| 分页查询    | `getXxxPage`       | `getUserPage`       |
| 列表/树查询 | `getXxxList`       | `getDepartmentTree` |
| 精简列表    | `getXxxSimpleList` | `getRoleSimpleList` |
| 详情查询    | `getXxxDetail`     | `getUserDetail`     |
| 新增        | `createXxx`        | `createUser`        |
| 修改        | `updateXxx`        | `updateUser`        |
| 删除        | `deleteXxx`        | `deleteUser`        |
| 批量删除    | `deleteXxxList`    | `deleteUserList`    |
| 状态切换    | `updateXxxStatus`  | `updateUserStatus`  |
| 导出        | `exportXxx`        | `exportLoginLog`    |

历史接口中仍保留了 `getUserByPage`、`addRole`、`getRoleListAllSimple` 等命名，避免影响现有页面。新代码优先使用推荐别名：

```ts
import { getUserPage } from '@/api/system/user';
import { createRole, getRoleSimpleList } from '@/api/system/role';
```

## 类型命名

请求和响应类型保留当前项目常用的 `ReqVO` / `RespVO` 风格。新增模块建议按以下方式命名：

```ts
export interface UserPageReq {}
export interface UserRespVO {}
export interface UserSaveReqVO {}
```

如果项目后端已经有代码生成工具，可以在生成层保留后端原始命名，在页面层通过 adapter 或 service 统一成模板内部类型。

## 请求封装原则

- 页面和 hooks 只调用 `src/api` 或 `src/core/services`，不要直接调用 axios。
- `src/api` 只负责地址、方法、参数和返回类型，不写 UI 提示。
- 响应协议、分页字段、权限菜单字段优先在 `src/core/adapters` 收口。
- Mock 的 URL、方法、分页结构和错误结构应尽量与真实后端一致。
