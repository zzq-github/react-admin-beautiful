# 后端接入指南

本文说明项目从 MSW Mock 切换到真实后端时需要关注的配置、接口协议和代码入口。

## 请求流程

项目的接口调用链路如下：

```text
页面 / hooks
  -> src/api/*
  -> src/utils/request.ts
  -> MSW Mock 或真实后端
  -> src/core/services/*
  -> src/core/adapters/*
```

- `src/api/*`：按业务模块封装接口地址、请求方法和参数。
- `src/utils/request.ts`：统一 axios 实例、token 注入、错误处理、token 刷新。
- `src/core/services/*`：面向页面和 store 的业务服务入口。
- `src/core/adapters/*`：适配后端响应协议、分页结构、权限信息和菜单字段。
- `src/mock/handlers/*`：本地演示用接口契约，不建议写成第二套业务逻辑。

## 环境变量

接口相关配置集中在 `.env.*` 中，并由 `src/config/app.ts` 统一读取。

```env
VITE_BASE_API=
VITE_API_PREFIX=/api
VITE_PROXY_TARGET=http://localhost:8080
VITE_MSW_ENABLE=true
```

含义如下：

| 变量                | 说明                                                                            |
| ------------------- | ------------------------------------------------------------------------------- |
| `VITE_MSW_ENABLE`   | 是否启用 MSW Mock。接真实后端时改为 `false`。                                   |
| `VITE_BASE_API`     | axios 的后端 origin。开发代理模式通常留空，生产环境可配置为真实后端地址。       |
| `VITE_API_PREFIX`   | API 前缀，默认 `/api`。最终请求地址为 `VITE_BASE_API + VITE_API_PREFIX + url`。 |
| `VITE_PROXY_TARGET` | Vite 开发代理目标，只在开发服务器下生效。                                       |

## 三种运行模式

### 1. Mock 演示模式

适合无后端启动、GitHub Pages 在线预览和页面开发初期。

```env
VITE_MSW_ENABLE=true
VITE_BASE_API=
VITE_API_PREFIX=/api
```

此时 `src/mock/handlers/*` 会拦截 `/api/**` 请求并返回本地数据。

### 2. 本地后端代理模式

适合前端开发服务器连接本地或测试环境后端。

```env
VITE_MSW_ENABLE=false
VITE_BASE_API=
VITE_API_PREFIX=/api
VITE_PROXY_TARGET=http://localhost:8080
```

浏览器请求 `/api/system/auth/login`，Vite 会代理到：

```text
http://localhost:8080/api/system/auth/login
```

代理配置位于 `vite.config.js`。

### 3. 生产后端模式

适合构建后直接访问真实后端。

```env
VITE_MSW_ENABLE=false
VITE_BASE_API=https://api.example.com
VITE_API_PREFIX=/api
```

最终请求地址为：

```text
https://api.example.com/api/system/auth/login
```

如果后端地址本身已经包含 API 前缀，也可以这样配置：

```env
VITE_BASE_API=https://api.example.com/admin-api
VITE_API_PREFIX=
```

## 默认响应协议

模板默认后端响应格式为：

```ts
interface ApiResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}
```

默认成功码是 `200`，未授权码是 `401`。配置位于：

```text
src/core/adapters/protocol.ts
```

如果你的后端返回格式不同，例如：

```json
{
  "status": 0,
  "result": {},
  "message": "success"
}
```

优先修改 `apiProtocol`，而不是在每个页面或接口里单独处理。

## 分页响应协议

模板内部推荐分页结构为：

```ts
interface PageResult<T = any> {
  list: T[];
  total: number;
}
```

表格请求会通过 `src/core/adapters/page.ts` 统一归一化分页数据。默认兼容这些常见字段：

| 后端字段                             | 内部字段 |
| ------------------------------------ | -------- |
| `list` / `rows` / `records` / `data` | `list`   |
| `total` / `count` / `totalCount`     | `total`  |

如果后端分页字段不同，优先修改 `normalizePageResult`，不要在页面或 hook 里分散判断。

## 登录与权限接口

默认认证接口位于 `src/api/login/index.ts`：

| 方法   | 地址                               | 用途                                   |
| ------ | ---------------------------------- | -------------------------------------- |
| `POST` | `/system/auth/login`               | 登录，返回 accessToken 和 refreshToken |
| `GET`  | `/system/auth/get-permission-info` | 获取用户信息、角色、权限码、菜单树     |
| `POST` | `/system/auth/logout`              | 退出登录                               |
| `POST` | `/system/auth/refresh-token`       | 刷新 accessToken                       |

登录成功后，token 会通过 `src/utils/auth.ts` 写入 `localStorage`。

请求层会自动注入：

```http
Authorization: Bearer <accessToken>
```

当接口返回未授权码时，`src/utils/request.ts` 会尝试使用 refreshToken 刷新令牌，并重放刷新期间挂起的请求。刷新失败时会提示用户重新登录。

## 权限信息结构

默认权限信息结构参考：

```ts
interface PermissionInfo {
  user: UserInfo;
  roles: string[];
  permissions: string[];
  menus: MenuItem;
}
```

菜单类型默认使用数字：

```text
1 - 目录
2 - 菜单
3 - 按钮
```

前端会在 `src/core/adapters/menu.ts` 中转换为内部类型：

```text
catalog
menu
button
```

如果你的后端字段名不同，优先修改：

```text
src/core/adapters/auth.ts
src/core/adapters/menu.ts
src/core/adapters/page.ts
```

## 菜单到路由的映射

后端菜单会同时驱动侧栏菜单和动态路由：

```text
后端 menus
  -> src/core/adapters/menu.ts
  -> src/store/useUserStore.ts
  -> src/utils/menu.ts
  -> src/utils/route.ts
  -> src/layout/Sidebar
  -> src/router/DynamicRoutes.tsx
```

默认规则如下：

| 字段             | 规则                                                                |
| ---------------- | ------------------------------------------------------------------- |
| `visible`        | 只有明确为 `false` 时才隐藏，未传时默认可见。                       |
| `type = catalog` | 作为目录参与侧栏展示和子路由路径拼接，不直接生成页面路由。          |
| `type = menu`    | 参与侧栏展示；当 `component` 存在时生成动态页面路由。               |
| `type = button`  | 用于按钮权限，不进入侧栏，也不生成页面路由。                        |
| `path`           | 支持相对路径和 `/` 开头的绝对路径。                                 |
| `component`      | 对应 `src/pages` 下的页面入口，例如 `system/UserManagement/index`。 |

例如后端返回：

```json
{
  "name": "用户管理",
  "path": "user",
  "component": "system/UserManagement/index",
  "type": 2
}
```

在父目录 `/system` 下会生成：

```text
侧栏路径：/system/user
路由组件：src/pages/system/UserManagement/index.tsx
```

## 新增接口建议

新增真实业务接口时建议按以下顺序处理：

1. 在 `src/api/<module>/types.ts` 定义请求和响应类型。
2. 在 `src/api/<module>/index.ts` 封装接口函数。
3. 页面或 hook 只调用 `src/api` 或 `src/core/services`，不直接拼 axios。
4. 如需本地演示，再在 `src/mock/handlers/*` 中补同路径 mock。
5. 如果返回协议或字段不一致，优先改 adapter。

示例：

```ts
import request from '@/utils/request';

export function getUserPage(params: UserPageReq): Promise<ApiResponse<PageResult<UserResp>>> {
  return request({
    url: '/system/user/page',
    method: 'get',
    params,
  });
}
```

## 接入检查清单

- 已将 `VITE_MSW_ENABLE` 改为 `false`。
- 开发环境已配置 `VITE_PROXY_TARGET`，或生产环境已配置 `VITE_BASE_API`。
- 后端响应格式已匹配 `src/core/adapters/protocol.ts`。
- 分页响应格式已匹配 `src/core/adapters/page.ts`。
- 登录接口能返回 `accessToken` 和 `refreshToken`。
- 权限接口能返回 `user`、`roles`、`permissions`、`menus`。
- 菜单 `component` 能匹配 `src/pages/**/index.tsx` 页面路径。
- 浏览器 Network 中请求地址符合预期。
