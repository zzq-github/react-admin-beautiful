# 文档索引

这里是 React Admin Plus 的唯一文档入口。根目录 `README.md` 负责快速了解项目；更细的接入、开发和架构说明都从这里进入。

## 推荐阅读顺序

1. [自定义项目指南](./customize-template.md)：fork 后先改哪些配置、主题、Mock 和项目元信息。
2. [后端接入指南](./backend-integration.md)：如何从 Mock 切到真实后端，响应协议、分页、权限和菜单字段怎么约定。
3. [创建页面指南](./create-page.md)：如何新增页面、配置菜单、接入按钮权限、使用图表和额外路由。
4. [架构说明](./architecture.md)：核心目录、adapter/service/store/router 的职责边界。

## 按任务查找

| 你要做什么                 | 阅读文档                                  |
| -------------------------- | ----------------------------------------- |
| 把模板改成自己的项目       | [自定义项目指南](./customize-template.md) |
| 接真实后端接口             | [后端接入指南](./backend-integration.md)  |
| 新增业务页面或 CRUD 页面   | [创建页面指南](./create-page.md)          |
| 统一 API 目录和函数命名    | [API 命名规范](./api-conventions.md)      |
| 理解核心代码为什么这样分层 | [架构说明](./architecture.md)             |

## 文档分层

- 入门接入：`customize-template.md`
- 后端协议：`backend-integration.md`、`api-conventions.md`
- 页面开发：`create-page.md`
- 架构解释：`architecture.md`

## 维护约定

- 根 `README.md` 只放项目定位、快速启动、目录结构和文档入口。
- 新增接入步骤优先补到对应专题文档，不要把同一段说明同时写进多个文件。
