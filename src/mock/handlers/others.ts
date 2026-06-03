import { http, HttpResponse, delay } from 'msw'

const BASE_URL = 'http://localhost:3030/admin-api'

/**
 * 菜单管理 mock
 */
export const menuHandlers = [
  http.get(`${BASE_URL}/system/menu/list`, async () => {
    await delay(150)
    const menuList = [
      { id: 1, parentId: 0, name: '系统管理', path: '/system', component: '', componentName: 'System', icon: 'system', visible: true, keepAlive: true, alwaysShow: true, type: 1, sort: 1, status: 0, createTime: 1672531200000 },
      { id: 11, parentId: 1, name: '用户管理', path: 'user-management', component: 'system/UserManagement/index', componentName: 'UserManagement', icon: 'user', visible: true, keepAlive: true, type: 2, sort: 1, status: 0, createTime: 1672531200000 },
      { id: 12, parentId: 1, name: '角色管理', path: 'role-management', component: 'system/RoleManagement/index', componentName: 'RoleManagement', icon: 'peoples', visible: true, keepAlive: true, type: 2, sort: 2, status: 0, createTime: 1672531200000 },
      { id: 13, parentId: 1, name: '部门管理', path: 'department-management', component: 'system/DepartmentManagement/index', componentName: 'DepartmentManagement', icon: 'tree', visible: true, keepAlive: true, type: 2, sort: 3, status: 0, createTime: 1672531200000 },
      { id: 14, parentId: 1, name: '菜单管理', path: 'menu-management', component: 'system/MenuManagement/index', componentName: 'MenuManagement', icon: 'tree', visible: true, keepAlive: true, type: 2, sort: 4, status: 0, createTime: 1672531200000 },
      { id: 15, parentId: 1, name: '岗位管理', path: 'position-management', component: 'system/PositionManagement/index', componentName: 'PositionManagement', icon: 'edit', visible: true, keepAlive: true, type: 2, sort: 5, status: 0, createTime: 1672531200000 },
      { id: 16, parentId: 1, name: '字典管理', path: 'dict-management', component: 'system/DictManagement/index', componentName: 'DictManagement', icon: 'dict', visible: true, keepAlive: true, type: 2, sort: 6, status: 0, createTime: 1672531200000 },
      { id: 17, parentId: 1, name: '参数设置', path: 'parameter-settings', component: 'system/ParameterSettings/index', componentName: 'ParameterSettings', icon: 'edit', visible: true, keepAlive: true, type: 2, sort: 7, status: 0, createTime: 1672531200000 },
      { id: 18, parentId: 1, name: '日志管理', path: 'log-management', component: 'system/LogManagement/index', componentName: 'LogManagement', icon: 'log', visible: true, keepAlive: true, type: 2, sort: 8, status: 0, createTime: 1672531200000 },
      // 按钮权限示例
      { id: 111, parentId: 11, name: '用户查询', path: '', component: '', icon: '', visible: true, keepAlive: false, type: 3, sort: 1, status: 0, createTime: 1672531200000 },
      { id: 112, parentId: 11, name: '用户新增', path: '', component: '', icon: '', visible: true, keepAlive: false, type: 3, sort: 2, status: 0, createTime: 1672531200000 },
      { id: 113, parentId: 11, name: '用户修改', path: '', component: '', icon: '', visible: true, keepAlive: false, type: 3, sort: 3, status: 0, createTime: 1672531200000 },
      { id: 114, parentId: 11, name: '用户删除', path: '', component: '', icon: '', visible: true, keepAlive: false, type: 3, sort: 4, status: 0, createTime: 1672531200000 },
    ]
    return HttpResponse.json({ code: 0, data: menuList, msg: '' })
  }),

  http.get(`${BASE_URL}/system/menu/get`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: { id: 11, parentId: 1, name: '用户管理', path: 'user-management', component: 'system/UserManagement/index', icon: 'user', visible: true, keepAlive: true, type: 2, sort: 1, status: 0 }, msg: '' })
  }),

  http.post(`${BASE_URL}/system/menu/create`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/menu/update`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/system/menu/delete`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
]

/**
 * 参数设置 mock
 */
export const configHandlers = [
  http.get(`${BASE_URL}/infra/config/page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const configList = [
      { id: 1, category: '主键生成策略', name: '主键自增策略', key: 'infra.id.auto-increment', value: 'true', type: 1, visible: true, remark: '主键是否自增', createTime: 1672531200000 },
      { id: 2, category: '数据加密策略', name: 'AES加密开关', key: 'infra.aes.enable', value: 'false', type: 2, visible: true, remark: 'AES加密是否开启', createTime: 1672531200000 },
      { id: 3, category: '数据加密策略', name: 'RSA公钥', key: 'infra.rsa.public-key', value: 'MIIBIjANBgkq...', type: 3, visible: false, remark: 'RSA加密公钥', createTime: 1672531200000 },
      { id: 4, category: '主键生成策略', name: '雪花算法开关', key: 'infra.id.snowflake', value: 'true', type: 1, visible: true, remark: '是否使用雪花算法生成ID', createTime: 1672531200000 },
    ]

    const start = (pageNo - 1) * pageSize
    const list = configList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 0,
      data: { list, total: configList.length },
      msg: '',
    })
  }),

  http.post(`${BASE_URL}/infra/config/create`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/infra/config/update`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/infra/config/delete`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
]

/**
 * 日志管理 mock
 */
export const logHandlers = [
  // 登录日志分页
  http.get(`${BASE_URL}/system/login-log/page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const loginLogList = [
      { id: 1, logType: 1, traceId: 'xxx', userId: 1, userType: 2, username: 'admin', result: 0, ip: '127.0.0.1', userAgent: 'Mozilla/5.0', createTime: 1672531200000 },
      { id: 2, logType: 1, traceId: 'xxx', userId: 2, userType: 2, username: 'zhangsan', result: 0, ip: '192.168.1.1', userAgent: 'Mozilla/5.0', createTime: 1672531200000 },
      { id: 3, logType: 1, traceId: 'xxx', userId: 3, userType: 2, username: 'lisi', result: 20, ip: '10.0.0.1', userAgent: 'Mozilla/5.0', createTime: 1672531200000 },
    ]

    const start = (pageNo - 1) * pageSize
    const list = loginLogList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 0,
      data: { list, total: loginLogList.length },
      msg: '',
    })
  }),

  // 操作日志分页
  http.get(`${BASE_URL}/system/operate-log/page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const operateLogList = [
      { id: 1, traceId: 'xxx', userId: 1, userType: 2, module: 'system', name: '创建用户', type: 1, content: '创建用户 admin', exts: '{}', requestMethod: 'POST', requestUrl: '/system/user/create', userIp: '127.0.0.1', userAgent: 'Mozilla/5.0', duration: 50, resultCode: 0, resultMsg: '', createTime: 1672531200000 },
      { id: 2, traceId: 'xxx', userId: 1, userType: 2, module: 'system', name: '修改角色', type: 2, content: '修改角色 common', exts: '{}', requestMethod: 'PUT', requestUrl: '/system/role/update', userIp: '127.0.0.1', userAgent: 'Mozilla/5.0', duration: 30, resultCode: 0, resultMsg: '', createTime: 1672531200000 },
      { id: 3, traceId: 'xxx', userId: 1, userType: 2, module: 'system', name: '删除菜单', type: 3, content: '删除菜单ID 114', exts: '{}', requestMethod: 'DELETE', requestUrl: '/system/menu/delete', userIp: '127.0.0.1', userAgent: 'Mozilla/5.0', duration: 20, resultCode: 0, resultMsg: '', createTime: 1672531200000 },
    ]

    const start = (pageNo - 1) * pageSize
    const list = operateLogList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 0,
      data: { list, total: operateLogList.length },
      msg: '',
    })
  }),
]

/**
 * 权限分配 mock
 */
export const permissionHandlers = [
  http.get(`${BASE_URL}/system/permission/list-role-menus`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: [1, 11, 12, 13, 14, 15, 16, 17, 18, 111, 112, 113, 114], msg: '' })
  }),
  http.post(`${BASE_URL}/system/permission/assign-role-menu`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.get(`${BASE_URL}/system/permission/list-user-roles`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: [1, 2], msg: '' })
  }),
  http.post(`${BASE_URL}/system/permission/assign-user-role`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.post(`${BASE_URL}/system/permission/assign-role-data-scope`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
]

/**
 * 通知消息 mock
 */
export const notifyHandlers = [
  http.get(`${BASE_URL}/system/notify-message/page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const notifyList = [
      { id: 1, userId: 1, userType: 2, templateCode: 'test', templateContent: '欢迎登录芋道管理系统', templateParams: '{}', readStatus: false, readTime: null, createTime: 1672531200000 },
      { id: 2, userId: 1, userType: 2, templateCode: 'test', templateContent: '系统将于今晚10点进行维护', templateParams: '{}', readStatus: true, readTime: 1672531200000, createTime: 1672531200000 },
      { id: 3, userId: 1, userType: 2, templateCode: 'test', templateContent: '您的密码已成功修改', templateParams: '{}', readStatus: false, readTime: null, createTime: 1672531200000 },
    ]

    const start = (pageNo - 1) * pageSize
    const list = notifyList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 0,
      data: { list, total: notifyList.length },
      msg: '',
    })
  }),

  http.get(`${BASE_URL}/system/notify-message/my-page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const notifyList = [
      { id: 1, userId: 1, userType: 2, templateCode: 'test', templateContent: '欢迎登录芋道管理系统', templateParams: '{}', readStatus: false, readTime: null, createTime: 1672531200000 },
      { id: 2, userId: 1, userType: 2, templateCode: 'test', templateContent: '系统将于今晚10点进行维护', templateParams: '{}', readStatus: true, readTime: 1672531200000, createTime: 1672531200000 },
    ]

    const start = (pageNo - 1) * pageSize
    const list = notifyList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 0,
      data: { list, total: notifyList.length },
      msg: '',
    })
  }),

  http.get(`${BASE_URL}/system/notify-message/get-unread-list`, async () => {
    await delay(100)
    return HttpResponse.json({
      code: 0,
      data: [
        { id: 1, templateContent: '欢迎登录芋道管理系统', readStatus: false, createTime: 1672531200000 },
        { id: 3, templateContent: '您的密码已成功修改', readStatus: false, createTime: 1672531200000 },
      ],
      msg: '',
    })
  }),

  http.get(`${BASE_URL}/system/notify-message/get-unread-count`, async () => {
    await delay(50)
    return HttpResponse.json({ code: 0, data: 2, msg: '' })
  }),

  http.put(`${BASE_URL}/system/notify-message/update-read`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/notify-message/update-all-read`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
]