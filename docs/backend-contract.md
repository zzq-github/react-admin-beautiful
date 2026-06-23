# 后端开发协议

本文面向 React Admin Beautiful 的配套后端服务开发，说明后端需要提供的最小接口契约、响应格式、认证流程、菜单权限结构、分页协议和推荐开发顺序。

如果只是把前端从 Mock 切到真实后端，请同时阅读 [后端接入指南](./backend-integration.md)。

## 项目边界

建议后端服务独立成一个项目：

```text
react-admin-beautiful/        # React 前端模板
vue-admin-beautiful/          # Vue 前端模板，可选
admin-beautiful-server/       # React/Vue 共用后端服务
```

前端模板保持纯前端定位；后端服务独立维护数据库、鉴权、日志、部署和接口实现。

## 基础约定

前端请求地址由环境变量拼接：

```text
VITE_BASE_API + VITE_API_PREFIX + src/api 中的 url
```

默认开发配置：

```env
VITE_BASE_API=
VITE_API_PREFIX=/api
VITE_PROXY_TARGET=http://localhost:8080
```

所以后端开发环境默认需要提供：

```text
http://localhost:8080/api/system/auth/login
```

本文后续接口路径均省略 `/api` 前缀。例如 `/system/auth/login` 的完整默认地址是 `/api/system/auth/login`。

## 统一响应格式

后端默认返回：

```ts
interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  msg?: string;
  message?: string;
}
```

成功响应：

```json
{
  "code": 200,
  "data": {},
  "msg": ""
}
```

失败响应：

```json
{
  "code": 400,
  "data": null,
  "msg": "请求参数不正确"
}
```

前端默认约定：

| 字段              | 说明                                                   |
| ----------------- | ------------------------------------------------------ |
| `code`            | 业务状态码。`200` 表示成功，`401` 表示未登录或登录过期 |
| `data`            | 真实业务数据                                           |
| `msg` / `message` | 错误或提示信息，`msg` 优先                             |

如果后端协议不是 `{ code, data, msg }`，优先修改 `src/core/adapters/protocol.ts`，不要在页面里单独兼容。

## 错误码建议

| code  | 含义                | 前端行为                               |
| ----- | ------------------- | -------------------------------------- |
| `200` | 成功                | 读取 `data`                            |
| `400` | 参数错误            | 展示后端 `msg` 或默认参数错误文案      |
| `401` | 未登录 / token 过期 | 尝试刷新 token；刷新失败后引导重新登录 |
| `403` | 无权限              | 展示无权限提示                         |
| `404` | 资源不存在          | 展示资源不存在提示                     |
| `409` | 数据冲突            | 提示刷新后重试                         |
| `429` | 请求过于频繁        | 提示稍后重试                           |
| `500` | 服务异常            | 展示服务异常提示                       |
| `501` | 功能暂未实现        | 展示功能未实现提示                     |
| `901` | 演示模式禁止写操作  | 展示禁止写操作提示                     |

错误码默认文案维护在 `src/utils/errorCode.ts`。

## 分页协议

前端表格默认请求参数：

```ts
interface PageParam {
  pageNo: number;
  pageSize: number;
}
```

推荐分页响应：

```ts
interface PageResult<T> {
  list: T[];
  total: number;
}
```

完整响应示例：

```json
{
  "code": 200,
  "data": {
    "list": [],
    "total": 0
  },
  "msg": ""
}
```

前端的 `src/core/adapters/page.ts` 也兼容 `rows`、`records`、`data`、`count`、`totalCount`，但新后端建议直接使用 `list` 和 `total`。

## 认证接口

### 登录

```http
POST /system/auth/login
```

请求体：

```ts
interface LoginParams {
  username: string;
  password: string;
  captchaVerification?: string;
  socialType?: number;
  socialCode?: string;
  socialState?: string;
}
```

响应数据：

```ts
interface LoginResult {
  accessToken: string;
  refreshToken: string;
  userId: number;
  expiresTime: number;
}
```

`expiresTime` 推荐使用毫秒时间戳。

响应示例：

```json
{
  "code": 200,
  "data": {
    "accessToken": "access-token",
    "refreshToken": "refresh-token",
    "userId": 1,
    "expiresTime": 1790000000000
  },
  "msg": ""
}
```

### 获取用户权限信息

```http
GET /system/auth/get-permission-info
Authorization: Bearer <accessToken>
```

响应数据：

```ts
interface PermissionInfo {
  user: UserInfo;
  roles: string[];
  permissions?: string[];
  menus: BackendMenu | BackendMenu[];
}

interface UserInfo {
  id: string | number;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  deptId?: string | number;
}
```

### 刷新 token

```http
POST /system/auth/refresh-token?refreshToken=<refreshToken>
```

响应数据同登录接口 `LoginResult`。

当前前端把 `refreshToken` 放在 query 参数里。如果后端希望使用请求体，可以同步调整 `src/api/login/index.ts`。

### 退出登录

```http
POST /system/auth/logout
Authorization: Bearer <accessToken>
```

响应：

```json
{
  "code": 200,
  "data": true,
  "msg": ""
}
```

### 可选认证接口

当前前端 API 文件还保留了这些可选接口，第一阶段可以暂不实现：

| 方法   | 路径                                | 用途           |
| ------ | ----------------------------------- | -------------- |
| `GET`  | `/system/auth/social-auth-redirect` | 三方登录跳转   |
| `POST` | `/system/auth/social-login`         | 三方登录       |
| `POST` | `/system/auth/send-sms-code`        | 发送短信验证码 |
| `POST` | `/system/auth/sms-login`            | 短信登录       |

## 菜单与权限协议

后端菜单节点建议结构：

```ts
interface BackendMenu {
  id: string | number;
  parentId?: string | number;
  name?: string;
  title?: string;
  path?: string;
  component?: string;
  componentName?: string;
  icon?: string;
  visible?: boolean;
  keepAlive?: boolean;
  alwaysShow?: boolean;
  permission?: string;
  type: 1 | 2 | 3 | 'catalog' | 'menu' | 'button';
  children?: BackendMenu[];
}
```

菜单类型：

| type | 内部类型  | 说明                                      |
| ---- | --------- | ----------------------------------------- |
| `1`  | `catalog` | 目录，只参与侧边栏展示和子路由路径拼接    |
| `2`  | `menu`    | 页面菜单，配置 `component` 时生成动态路由 |
| `3`  | `button`  | 按钮权限，不进入侧边栏，不生成页面路由    |

字段说明：

| 字段             | 说明                                                  |
| ---------------- | ----------------------------------------------------- |
| `name` / `title` | 菜单展示名称，优先使用 `title`，没有则使用 `name`     |
| `path`           | 路由路径。可以是 `/system`，也可以是相对路径 `user`   |
| `component`      | 对应 `src/pages` 下的页面入口，不带 `src/pages/` 前缀 |
| `permission`     | 页面访问权限或按钮权限标识                            |
| `visible`        | 只有明确为 `false` 时隐藏，默认可见                   |
| `icon`           | 菜单图标注册名，对应前端 `MenuIcon`                   |

`component` 示例：

```text
system/UserManagement/index -> src/pages/system/UserManagement/index.tsx
examples/BasicList/index    -> src/pages/examples/BasicList/index.tsx
```

### 权限返回方式

支持两种权限返回方式，可以同时使用。

第一种：直接返回 `permissions` 数组。

```json
{
  "roles": ["template_admin"],
  "permissions": ["example:project:create", "example:project:update", "example:project:delete"],
  "menus": []
}
```

第二种：在菜单树中返回 `permission`。

```json
{
  "name": "CRUD 示例",
  "path": "basic-list",
  "component": "examples/BasicList/index",
  "permission": "example:project:list",
  "type": 2,
  "children": [
    {
      "id": 20101,
      "name": "新增项目",
      "type": 3,
      "permission": "example:project:create"
    }
  ]
}
```

前端会递归提取菜单树中的 `permission`，并和 `permissions` 数组去重合并。

页面权限由 `RequirePermission` 处理，按钮权限由 `Auth` 和 `usePermission` 处理。角色中包含 `admin`、`super_admin`，或权限中包含 `*` 时，前端视为超级管理员。

### 最小菜单示例

```json
{
  "id": 0,
  "parentId": 0,
  "name": "Root",
  "path": "/",
  "type": 1,
  "visible": true,
  "children": [
    {
      "id": 100,
      "parentId": 0,
      "name": "仪表盘",
      "path": "/dashboard",
      "component": "Dashboard/index",
      "icon": "dashboard",
      "type": 2,
      "visible": true
    },
    {
      "id": 200,
      "parentId": 0,
      "name": "示例",
      "path": "/examples",
      "icon": "example",
      "type": 1,
      "visible": true,
      "children": [
        {
          "id": 201,
          "parentId": 200,
          "name": "CRUD 示例",
          "path": "basic-list",
          "component": "examples/BasicList/index",
          "permission": "example:project:list",
          "type": 2,
          "visible": true,
          "children": [
            {
              "id": 20101,
              "parentId": 201,
              "name": "新增项目",
              "type": 3,
              "permission": "example:project:create"
            }
          ]
        }
      ]
    }
  ]
}
```

## 字典接口

前端启动后会加载字典数据，最小后端建议先实现：

```http
GET /system/dict-data/list-all-simple
```

响应数据：

```ts
interface DictDataSimpleRespVO {
  dictType: string;
  value: string;
  label: string;
  colorType?: string;
  cssClass?: string;
}
```

示例：

```json
{
  "code": 200,
  "data": [
    {
      "dictType": "common_status",
      "value": "0",
      "label": "正常",
      "colorType": "success"
    },
    {
      "dictType": "common_status",
      "value": "1",
      "label": "停用",
      "colorType": "error"
    }
  ],
  "msg": ""
}
```

完整字典管理页面还会用到：

| 方法     | 路径                                |
| -------- | ----------------------------------- |
| `GET`    | `/system/dict-data/page`            |
| `POST`   | `/system/dict-data/create`          |
| `PUT`    | `/system/dict-data/update`          |
| `DELETE` | `/system/dict-data/delete?id={id}`  |
| `GET`    | `/system/dict-type/page`            |
| `POST`   | `/system/dict-type/create`          |
| `PUT`    | `/system/dict-type/update`          |
| `DELETE` | `/system/dict-type/delete?id={id}`  |
| `GET`    | `/system/dict-type/list-all-simple` |

## CRUD 示例接口

建议第一阶段实现示例项目 CRUD，用于验证分页、查询、增删改查、按钮权限和错误码。

### 数据结构

```ts
type ExampleProjectCategory = 'console' | 'workflow' | 'report';
type ExampleProjectStatus = 'enabled' | 'disabled' | 'draft';

interface ExampleProjectResp {
  id: number;
  name: string;
  owner: string;
  category: ExampleProjectCategory;
  status: ExampleProjectStatus;
  progress: number;
  updatedAt: string;
  description?: string;
}

interface ExampleProjectPageReq {
  pageNo?: number;
  pageSize?: number;
  keyword?: string;
  category?: ExampleProjectCategory;
  status?: ExampleProjectStatus;
}

interface ExampleProjectSaveReq {
  id?: number;
  name: string;
  owner: string;
  category: ExampleProjectCategory;
  status: ExampleProjectStatus;
  progress: number;
  description?: string;
}
```

### 接口清单

| 方法     | 路径                               | 说明                          |
| -------- | ---------------------------------- | ----------------------------- |
| `GET`    | `/examples/project/page`           | 分页查询                      |
| `POST`   | `/examples/project/create`         | 新增                          |
| `PUT`    | `/examples/project/update`         | 修改                          |
| `DELETE` | `/examples/project/delete?id={id}` | 删除单条                      |
| `DELETE` | `/examples/project/delete-list`    | 批量删除，请求体为 `number[]` |

## 系统管理接口

系统管理页面属于完整示例，后端可以在最小闭环之后逐步实现。

| 模块     | 主要接口                                                                                                                                                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 用户     | `/system/user/page`、`/system/user/list-all-simple`、`/system/user/create`、`/system/user/update`、`/system/user/get`、`/system/user/update-status`、`/system/user/update-password`、`/system/user/delete`、`/system/user/delete-list`                             |
| 角色     | `/system/role/page`、`/system/role/list-all-simple`、`/system/role/create`、`/system/role/update`、`/system/role/delete`                                                                                                                                           |
| 菜单     | `/system/menu/list`、`/system/menu/get`、`/system/menu/create`、`/system/menu/update`、`/system/menu/delete`                                                                                                                                                       |
| 权限分配 | `/system/permission/list-role-menus`、`/system/permission/assign-role-menu`、`/system/permission/list-user-roles`、`/system/permission/assign-user-role`、`/system/permission/assign-role-data-scope`                                                              |
| 部门     | `/system/dept/list`、`/system/dept/list-all-simple`、`/system/dept/create`、`/system/dept/update`、`/system/dept/delete`                                                                                                                                           |
| 岗位     | `/system/post/page`、`/system/post/list-all-simple`、`/system/post/create`、`/system/post/update`、`/system/post/delete`                                                                                                                                           |
| 参数     | `/infra/config/page`、`/infra/config/create`、`/infra/config/update`、`/infra/config/delete`                                                                                                                                                                       |
| 通知     | `/system/notify-message/page`、`/system/notify-message/my-page`、`/system/notify-message/get`、`/system/notify-message/get-unread-list`、`/system/notify-message/get-unread-count`、`/system/notify-message/update-read`、`/system/notify-message/update-all-read` |
| 日志     | `/system/login-log/page`、`/system/login-log/export-excel`、`/system/operate-log/page`、`/system/operate-log/export-excel`                                                                                                                                         |

## 推荐开发顺序

1. 实现统一响应结构和错误码。
2. 实现 `POST /system/auth/login`。
3. 实现 `GET /system/auth/get-permission-info`，返回用户、角色、权限和菜单树。
4. 实现 `POST /system/auth/refresh-token` 和 `POST /system/auth/logout`。
5. 实现 `GET /system/dict-data/list-all-simple`。
6. 实现 `/examples/project/*` CRUD 示例接口。
7. 前端关闭 Mock：`VITE_MSW_ENABLE=false`。
8. 跑通登录、刷新页面、侧边栏菜单、动态路由、页面权限、按钮权限和 CRUD。
9. 再逐步实现系统管理完整接口。

## 联调验收清单

- 登录成功后能拿到 `accessToken`、`refreshToken`、`expiresTime`。
- 普通请求会携带 `Authorization: Bearer <accessToken>`。
- `401` 能触发刷新 token，刷新失败后能回到登录页。
- `get-permission-info` 能返回 `user`、`roles`、`menus`。
- 菜单 `component` 能匹配前端 `src/pages/**/index.tsx`。
- 菜单节点 `permission` 能控制页面访问权限。
- 按钮节点或 `permissions` 数组能控制按钮显示。
- 刷新浏览器后侧边栏和动态路由能恢复。
- 分页接口返回 `{ list, total }`。
- CRUD 失败时返回非 `200` code 和可读 `msg`。
- 字典接口能返回页面所需的 `dictType`、`value`、`label`。
