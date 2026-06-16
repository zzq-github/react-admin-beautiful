# React Admin Plus

一个面向开源复用的 React Admin 通用模板。目标是让你 clone 后 5 分钟跑起来，然后用少量配置替换成自己的后台项目。

## 特性

- React 18 + TypeScript + Vite + Ant Design 6 + Tailwind CSS
- 代码级主题系统：品牌色、成功、警告、错误、信息色统一配置
- 动态路由：根据后端菜单生成路由，页面按需懒加载
- 后端协议适配：通过 adapter 抹平不同后端返回结构
- 认证服务抽象：登录、退出、权限信息、刷新 token 统一走 `authService`
- 权限控制：支持路由级和按钮级权限
- 配置化 CRUD：沉淀表格、查询、表单、弹窗等通用组件
- MSW Mock：无后端也能直接开发和演示

## 内置示例

默认 Mock 菜单分为三部分：

- `Dashboard`：首页示例
- `Examples`：最小学习示例，包含 Basic List、Form Demo 和 Theme Tokens
- `System Demo`：复杂 CRUD 和权限示例，展示用户、角色、菜单等管理页面

新增页面可以参考 [创建页面指南](./docs/create-page.md)。

## 快速开始

```bash
pnpm install
pnpm dev
```

浏览器打开终端输出的本地地址，默认开发端口是 `3030`。

默认 Mock 账号：

```text
username: admin
password: admin123
```

常用命令：

```bash
pnpm dev       # 启动开发环境，默认读取 .env.dev
pnpm build     # 构建生产版本，默认读取 .env.prod
pnpm preview   # 预览生产构建产物
```

## 创建自己的项目

1. 复制环境变量示例：

```bash
cp .env.example .env.dev
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.dev
```

2. 修改应用信息：

```env
VITE_APP_NAME=Your Admin
VITE_APP_SHORT_NAME=Y
VITE_APP_DESCRIPTION=Your Platform
VITE_APP_COPYRIGHT=(c) 2026 Your Company
```

3. 修改默认路由和接口地址：

```env
VITE_APP_DEFAULT_ROUTE=/dashboard
VITE_BASE_API=
VITE_API_PREFIX=/api
VITE_PROXY_TARGET=http://localhost:8080
VITE_MSW_ENABLE=true
```

4. 修改主题：

```text
src/theme/appTheme.ts
```

5. 接真实后端时关闭 Mock：

```env
VITE_MSW_ENABLE=false
```

然后根据你的后端返回格式调整：

```text
src/core/adapters/protocol.ts
src/core/adapters/auth.ts
src/core/adapters/menu.ts
src/core/services/authService.ts
```

## 配置入口

项目级配置集中在：

```text
src/config/app.ts
```

这里统一读取应用名称、描述、默认路由、登录路由、通知路由、API 前缀、Mock 开关等配置。页面和布局不要直接读取散落的环境变量，优先使用 `appConfig`。

## 目录结构

```text
src/
├── api/              # API 请求封装
├── components/       # 通用组件
├── config/           # 应用级配置入口
├── core/             # 模板核心模型、adapter、service
├── hooks/            # 通用 Hooks
├── layout/           # 布局组件
├── mock/             # MSW Mock
├── pages/            # 页面和示例业务，examples 是最小示例，system 是复杂示例
├── router/           # 静态路由、动态路由、页面扫描
├── store/            # Zustand 状态管理
├── theme/            # 主题 token 和 ThemeProvider
├── types/            # TypeScript 类型定义
└── utils/            # 通用工具
```

## 环境变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `VITE_APP_NAME` | 应用名称 | React Admin Plus |
| `VITE_APP_SHORT_NAME` | Logo 短名称 | R |
| `VITE_APP_DESCRIPTION` | 应用描述 | Admin Platform |
| `VITE_APP_COPYRIGHT` | 登录页版权文案 | (c) 2026 React Admin Plus |
| `VITE_APP_DEFAULT_ROUTE` | 登录后的默认路由 | /dashboard |
| `VITE_APP_LOGIN_ROUTE` | 登录页路由 | /login |
| `VITE_APP_NOTIFY_ROUTE` | 消息中心路由 | /user/notify-message |
| `VITE_BASE_API` | 后端 API 基础地址 | 空字符串 |
| `VITE_API_PREFIX` | API 请求前缀 | /api |
| `VITE_PROXY_TARGET` | Vite 开发代理目标 | http://localhost:8080 |
| `VITE_CAPTCHA_ENABLE` | 验证码开关 | false |
| `VITE_MSW_ENABLE` | MSW Mock 开关 | dev: true / prod: false |
| `VITE_TAGGER_ENABLE` | 开发辅助插件开关 | false |

## 主题定制

主题不再提供运行时预设颜色切换，适合作为开源模板的稳定基座。你可以在 `src/theme/appTheme.ts` 中统一配置：

- `colorPrimary`
- `colorSuccess`
- `colorWarning`
- `colorError`
- `colorInfo`
- 各状态的 hover、active、bg、border 色
- `borderRadius`
- `componentSize`：Ant Design 全局组件尺寸，默认 `small`

这些配置会同步到 Ant Design token、CSS 变量和 Tailwind 语义类，例如：

```tsx
<span className="text-theme-success">已启用</span>
<div className="bg-theme-error-bg border border-theme-error-border">错误提示</div>
```

## 对接后端

模板内部尽量不绑定某个后端协议。接入真实后端时推荐顺序：

1. 关闭 Mock：`VITE_MSW_ENABLE=false`
2. 配置 `VITE_BASE_API` 或 `VITE_PROXY_TARGET`
3. 在 `src/api/` 中替换接口路径
4. 在 `src/core/adapters` 中适配返回结构
5. 在 `src/core/services/authService.ts` 中统一认证行为

## 文档

- [模板设计说明](./docs/admin-template-guide.md)
- [创建页面指南](./docs/create-page.md)

## License

[MIT](./LICENSE)
