# 芋道 React 前端框架

## 项目简介

这是一个基于 React 的芋道（Yudao）前端框架，专为后台管理系统开发而设计。本框架提取了芋道 Vue 版前端常用功能，采用更规范的目录和组件命名规则，并集成了一系列现代化开发工具和最佳实践。

**注意**：本项目是自主开发自用的框架，未集成所有前端框架功能，仅包含常用核心功能，适合快速搭建中后台管理系统。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 4.x
- **UI 组件库**: Ant Design 6.x
- **状态管理**: Zustand
- **路由管理**: React Router DOM 6.x
- **HTTP 客户端**: Axios
- **CSS 框架**: Tailwind CSS 3.x
- **图标库**: Lucide React
- **图表库**: Recharts
- **工具库**: Day.js, Crypto-js, js-md5, jsencrypt
- **开发工具**: TypeScript 5.x

## 功能特性

### 1. 系统管理
- **用户管理**: 用户增删改查、状态管理、角色分配
- **角色管理**: 角色权限配置、数据权限控制
- **菜单管理**: 动态路由菜单、图标配置、权限控制
- **部门管理**: 树形部门结构、部门人员管理
- **岗位管理**: 岗位信息维护
- **字典管理**: 系统字典数据维护
- **参数设置**: 系统参数配置管理

### 2. 日志监控
- **登录日志**: 用户登录记录查询
- **操作日志**: 用户操作行为记录
- **系统监控**: 基础系统状态展示

### 3. 个人中心
- **通知消息**: 用户个人消息通知管理

### 4. 开发特性
- **动态路由**: 基于后端菜单配置的动态路由加载
- **权限控制**: 前端路由级和组件级权限控制
- **请求封装**: 统一的 Axios 请求拦截、Token 自动刷新
- **表单组件**: 基于 Schema 的表单生成器 (`SchemaForm`)
- **表格组件**: 增强型表格组件 (`BaseTable`) 支持查询、分页、选择
- **查询筛选**: 可配置的查询筛选组件 (`QueryFilter`)
- **弹窗管理**: 统一的弹窗管理组件 (`BaseModal`, `FormModal`)
- **图标管理**: SVG 图标组件 (`SvgIcon`) 和图标选择器

## 项目结构

```
src/
├── api/                    # API 接口定义
│   ├── login/             # 登录相关接口
│   └── system/            # 系统管理接口
├── assets/                # 静态资源
│   └── icons/svg/         # SVG 图标文件
├── components/            # 通用组件
│   ├── BaseModal/         # 基础弹窗组件
│   ├── BaseTable/         # 基础表格组件
│   ├── FormModal/         # 表单弹窗组件
│   ├── QueryFilter/       # 查询筛选组件
│   ├── SchemaForm/        # Schema 表单组件
│   └── SvgIcon/           # SVG 图标组件
├── hooks/                 # 自定义 Hook
│   ├── useRequest.ts      # 请求 Hook
│   ├── useTableRequest.ts # 表格请求 Hook
│   └── useQueryFilter.ts  # 查询筛选 Hook
├── layout/                # 布局组件
│   ├── Layout.tsx         # 主布局
│   ├── Header/            # 顶部导航
│   └── Sidebar/           # 侧边栏菜单
├── pages/                 # 页面组件
│   ├── LoginPage/         # 登录页面
│   ├── NotFoundPage/      # 404 页面
│   ├── system/            # 系统管理页面
│   └── user/              # 个人中心页面
├── router/                # 路由配置
│   ├── index.tsx          # 路由主文件
│   ├── DynamicRoutes.tsx  # 动态路由加载
│   └── dynamicImport.ts   # 动态导入工具
├── store/                 # 状态管理
│   ├── useDictStore.ts    # 字典状态
│   └── useUserStore.ts    # 用户状态
├── types/                 # TypeScript 类型定义
│   ├── env.d.ts           # 环境变量类型
│   └── global.d.ts        # 全局类型
└── utils/                 # 工具函数
    ├── auth.ts            # 认证相关
    ├── request.ts         # 请求封装
    ├── menu.ts            # 菜单处理
    ├── route.ts           # 路由工具
    ├── dict.ts            # 字典工具
    └── encrypt.ts         # 加密工具
```

## 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 开发环境运行

```bash
npm run dev
```

应用将启动在 `http://localhost:5173`（默认端口）。

### 生产环境构建

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览构建结果

```bash
npm run preview
```

## 配置说明

### 环境变量配置

项目支持多环境配置，通过 `.env.dev`（开发环境）和 `.env.prod`（生产环境）文件管理。

主要配置项：

```bash
# 基础 API 地址（必须修改）
VITE_BASE_API = 'http://your-api-server.com'

# 页面标题
VITE_TITLE = '管理系统'

# 功能开关
VITE_TENANT_ENABLE = false    # 多租户开关（本框架未实现）
VITE_CAPTCHA_ENABLE = false   # 验证码开关（本框架未实现）
VITE_DOC_ENABLE = false       # 文档开关

# 百度统计代码（可选）
VITE_BAIDU_CODE = 'your-code'
```

### 后端对接配置

1. **修改 API 基础地址**：在 `.env.dev` 和 `.env.prod` 中设置 `VITE_BASE_API` 为实际后端地址。
2. **接口路径**：默认接口路径为 `VITE_BASE_API + "/byai-api/"`，可在 `src/utils/request.ts` 中调整。

## 注意事项

### 1. 菜单路径映射

由于目录和组件命名规则与芋道 Vue 版前端不一致但更规范，**数据库中的菜单组件路径需要修改**。

**示例**：
- 原菜单组件路径：`system/menu/index`
- 需要改为本项目中对应的路径：`system/MenuManagement/index`

其他路径改写规则相同，请根据实际页面路径调整数据库中的菜单配置。

### 2. 功能开关

**必须关闭以下后端功能开关**，因为这些功能在本框架中尚未实现：
- **多租户功能**：在 `.env` 文件中设置 `VITE_TENANT_ENABLE = false`
- **验证码功能**：在 `.env` 文件中设置 `VITE_CAPTCHA_ENABLE = false`

如果后端开启了这些功能，会导致前端接口调用异常。

### 3. 动态路由配置

动态路由从后端菜单接口获取，菜单数据需要包含以下字段：
- `path`: 路由路径（对应组件路径）
- `component`: 组件名称（对应 `src/pages` 下的文件路径）
- `icon`: 图标名称（对应 `assets/icons/svg` 下的 SVG 文件名）

### 4. 图标使用

项目使用 SVG 图标系统，图标文件位于 `src/assets/icons/svg/` 目录。使用方式：

```tsx
import SvgIcon from '@/components/SvgIcon';

<SvgIcon name="user" className="w-5 h-5" />
```

## 开发指南

### API 代码生成

项目提供了 API 代码生成脚本，可根据后端 Swagger 文档自动生成 TypeScript 接口代码：

```bash
# 生成 API 接口代码
npm run get-api

# 生成 API 代码（带代码生成器）
npm run get-api-code
```

### 组件开发规范

1. **组件命名**：使用 PascalCase，目录与组件同名
2. **文件结构**：每个组件目录包含 `index.tsx`（主组件）和 `types.ts`（类型定义）
3. **样式规范**：使用 Tailwind CSS 原子类，避免编写自定义 CSS
4. **状态管理**：简单状态使用组件内状态，跨组件状态使用 Zustand
5. **表单处理**：优先使用 `SchemaForm` 组件生成表单

### 新增页面步骤

1. 在 `src/pages` 下创建页面目录和组件
2. 在 `src/router/DynamicRoutes.tsx` 中配置路由懒加载（可选）
3. 后端菜单管理中添加对应菜单项
4. 如需接口，在 `src/api` 下创建对应接口定义

## 常见问题

### Q1: 启动后页面空白，控制台报错
A: 检查 `VITE_BASE_API` 配置是否正确，确保后端服务可访问。

### Q2: 登录后菜单不显示
A: 检查菜单接口返回的数据格式，确保 `path` 和 `component` 字段正确映射到前端路由。

### Q3: 图标显示为方块
A: 检查图标名称是否正确，确保 `src/assets/icons/svg` 目录下存在对应的 SVG 文件。

### Q4: 生产环境构建后资源加载 404
A: 检查 `vite.config.ts` 中的 `base` 配置，或部署服务器的路径配置。

## 许可证

本项目基于 MIT 许可证开源，详情请参阅 LICENSE 文件。

## 致谢

- 感谢 [芋道开源项目](https://github.com/YunaiV/ruoyi-vue-pro) 提供的后端架构参考
- 感谢 Ant Design、React、Vite 等优秀开源项目

---

**提示**：本项目仍在持续完善中，欢迎提交 Issue 和 Pull Request。
