# 我做了一个更适合二开的 React Admin 开源模板：React Admin Plus

> 在线预览：https://zzq-github.github.io/react-admin-beautiful/  
> GitHub：https://github.com/zzq-github/react-admin-beautiful

## 前言

做后台管理系统时，大家大概率都经历过这几个阶段：

一开始找一个 admin 模板，觉得页面挺全、组件挺多、看起来也很成熟。真正接业务时才发现，后端协议写死了，菜单字段写死了，主题色散落在各个页面里，Mock 和真实接口切换也不够清晰。

于是我整理了一个新的 React Admin 通用模板：**React Admin Plus**。

它不是想做一个“大而全”的业务系统，而是希望成为一个适合开源复用、适合快速二开的后台模板基座。目标很简单：clone 下来能快速跑起来，接自己的后端时也不需要到处改页面代码。

## 技术栈

当前模板主要使用：

- React 18
- TypeScript
- Vite
- Ant Design 6
- Tailwind CSS
- Zustand
- React Router
- Axios
- MSW
- Vitest
- ESLint
- GitHub Actions
- GitHub Pages

默认本地开发端口是 `3030`，安装依赖后执行：

```bash
pnpm install
pnpm dev
```

Mock 账号：

```text
username: admin
password: admin123
```

## 它主要解决什么问题？

### 1. 应用配置集中管理

很多后台模板最大的问题不是不能用，而是“配置散”。

项目名、默认路由、登录路由、API 地址、Mock 开关如果分散在页面、布局、请求层里，后续替换成自己的项目时会很痛苦。

所以模板里增加了统一配置入口：

```text
src/config/app.ts
```

常见配置都从这里读取，比如：

- 应用名称
- Logo 简写
- 应用描述
- 默认首页
- 登录页路径
- API 前缀
- Mock 开关
- 通知中心路径

这样使用者二开时，优先改 `.env.example` / `.env.dev` / `src/config/app.ts`，不用在页面里到处搜索硬编码。

### 2. 后端协议通过 adapter 解耦

后台模板最容易和某个后端协议绑死。

比如有的后端返回：

```ts
{
  code: 200,
  data: {},
  msg: "ok"
}
```

也有的返回：

```ts
{
  success: true,
  result: {},
  message: "ok"
}
```

如果页面直接依赖这些字段，换后端就会很麻烦。

所以我把协议适配收口到了：

```text
src/core/adapters
```

核心包括：

- `protocol.ts`：适配响应 code、data、message、未登录状态码
- `auth.ts`：适配用户、角色、权限
- `menu.ts`：适配后端菜单结构

页面、布局、store 尽量只依赖模板内部的标准模型，而不是直接依赖某一个后端格式。

### 3. 动态路由和菜单更适合真实后台

模板支持根据后端菜单生成动态路由。

页面扫描使用 `import.meta.glob`，只扫描页面入口文件，避免把 `hooks`、`schema`、`modal` 这类辅助文件误打进动态路由：

```text
src/pages/**/index.tsx
src/pages/**/index.jsx
src/pages/*.tsx
src/pages/*.jsx
```

后端菜单只需要提供类似这样的组件路径：

```ts
{
  type: "menu",
  path: "user-management",
  component: "system/UserManagement/index"
}
```

它就能匹配到：

```text
src/pages/system/UserManagement/index.tsx
```

这部分是做通用 admin 模板时非常核心的能力。

### 4. 主题系统基于 token，而不是到处写颜色

很多模板的主题切换看起来很炫，但真正维护时会发现页面里到处是 `blue-*`、`red-*`、`slate-*` 这样的硬编码颜色。

React Admin Plus 里把主题收口到了：

```text
src/theme/appTheme.ts
```

目前支持统一配置：

- primary
- success
- warning
- error
- info
- 背景色
- 边框色
- 文本层级
- 圆角
- Ant Design 全局组件尺寸

这些 token 会同步到：

- Ant Design token
- CSS variables
- Tailwind 语义化 class

例如业务页面里推荐写：

```tsx
<span className="text-theme-success">已启用</span>
<div className="bg-theme-error-bg border border-theme-error-border">
  错误提示
</div>
```

而不是直接写死某个 Tailwind 颜色。

为了方便查看效果，模板里还加了一个 `Theme Tokens` 示例页，可以直接观察亮色/暗色模式下的主题变量表现。

### 5. 图标系统做了边界收口

后台模板如果同时混用 Ant Design Icons、自定义 SVG、Iconfont、lucide，后面会越来越乱。

所以这里做了一个约定：

- 菜单图标：统一走 `MenuIcon`
- 页面操作图标：统一使用 `lucide-react`
- 业务代码不直接依赖 `@ant-design/icons`
- 历史 SVG 图标资源已清理

菜单图标使用扁平线条风格，适合后台场景，也方便后续统一替换。

### 6. 内置 Mock，方便无后端演示

项目使用 MSW 做 Mock。

这样有两个好处：

第一，新用户 clone 项目后，不需要后端服务也能完整体验登录、菜单、列表、表单、系统管理等页面。

第二，开源模板可以直接部署到 GitHub Pages 作为在线示例站点。

目前示例站点已经接入 GitHub Pages 自动部署：

```text
https://zzq-github.github.io/react-admin-beautiful/
```

每次 push 后，GitHub Actions 会自动构建并更新在线站点。

### 7. CI 和部署已经配好

模板内置了 GitHub Actions：

- install
- typecheck
- lint
- test
- build
- deploy pages

也就是说，它不只是一个本地 demo，而是一个可以直接作为开源项目维护的模板。

README 里也加入了 badge，方便用户第一眼看到构建状态、在线部署状态和核心技术栈。

## 内置页面

当前 Mock 菜单主要分为三块：

- Dashboard：首页示例
- Examples：最小学习示例，包括基础列表、基础表单、Theme Tokens
- System Demo：复杂 CRUD 和权限示例，包括用户、角色、菜单、部门、字典等页面

Examples 用来学习最小写法，System Demo 用来参考复杂业务页如何组织。

例如 CRUD 页面推荐采用这种结构：

```text
pages/example/FooManagement/
├── index.tsx
├── hooks/
│   ├── useFooTable.ts
│   ├── useFooOperations.ts
│   └── useFooModals.ts
└── schema/
    ├── queryFields.tsx
    ├── tableColumns.tsx
    └── modalForms.tsx
```

页面只负责组合 UI，请求、弹窗、操作逻辑放到 hooks，查询项、表格列、表单项放到 schema。

## 适合谁使用？

这个模板比较适合：

- 想快速启动一个 React 后台项目的人
- 想找一个 Ant Design + Vite + TypeScript 基座的人
- 想要动态路由、权限菜单、Mock、主题 token 的团队
- 想二开一个通用后台，而不是从零搭基础设施的人
- 想学习 admin 模板架构拆分的人

如果你只是想找一个页面特别多的业务系统，它可能不是最花哨的那个。

但如果你希望一个模板结构清楚、边界明确、适合接入自己的后端，它会更合适。

## 快速开始

```bash
git clone https://github.com/zzq-github/react-admin-beautiful.git
cd react-admin-beautiful
pnpm install
pnpm dev
```

常用命令：

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm check
pnpm build
pnpm preview
```

接真实后端时，一般按这个顺序改：

1. 关闭 Mock：`VITE_MSW_ENABLE=false`
2. 配置 `VITE_BASE_API` 或 `VITE_PROXY_TARGET`
3. 修改 `src/core/adapters/protocol.ts`
4. 修改 `src/core/adapters/auth.ts`
5. 修改 `src/core/adapters/menu.ts`
6. 根据业务替换 `src/pages/examples` 和 `src/pages/system`

## 后续计划

我后面还会继续完善：

- 更完整的真实后端接入示例
- CRUD 页面生成器
- 字典/枚举 provider
- 更多主题 token 示例
- 更多模板文档
- 更细的权限控制示例
- 构建体积和性能优化

## 最后

React Admin Plus 目前还在持续完善中。

如果你正在找一个 React Admin 通用模板，或者你也在做类似的后台基础设施，欢迎试用、提 issue 或 star。

在线预览：

https://zzq-github.github.io/react-admin-beautiful/

GitHub：

https://github.com/zzq-github/react-admin-beautiful

如果觉得这个方向有用，也欢迎在评论区交流：你理想中的 React Admin 模板还应该包含哪些能力？

