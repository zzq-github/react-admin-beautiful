import { http, HttpResponse, delay } from 'msw'

const BASE_URL = '/api'

/**
 * 菜单管理 mock
 */
export const menuHandlers = [
  http.get(`${BASE_URL}/system/menu/list`, async () => {
    await delay(200)
    return HttpResponse.json({
      code: 200,
      data: [
        { id: 1, parentId: 0, name: '系统管理', path: '/system', component: '', icon: 'system', visible: true, keepAlive: true, type: 1, sort: 1, status: 0 },
        { id: 11, parentId: 1, name: '用户管理', path: 'user-management', component: 'system/UserManagement/index', icon: 'user', visible: true, keepAlive: true, type: 2, sort: 1, status: 0 },
        { id: 12, parentId: 1, name: '角色管理', path: 'role-management', component: 'system/RoleManagement/index', icon: 'peoples', visible: true, keepAlive: true, type: 2, sort: 2, status: 0 },
      ],
      msg: '',
    })
  }),

  http.get(`${BASE_URL}/system/menu/get`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: { id: 11, parentId: 1, name: '用户管理', path: 'user-management', component: 'system/UserManagement/index', icon: 'user', visible: true, keepAlive: true, type: 2, sort: 1, status: 0 }, msg: '' })
  }),
  http.post(`${BASE_URL}/system/menu/create`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/menu/update`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/system/menu/delete`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
]

/**
 * 参数配置 mock
 */
export const configHandlers = [
  http.get(`${BASE_URL}/system/config/page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const configList = [
      { id: 1, category: 'general', name: '主键生成策略', key: 'sys.id-type', value: 'snowflake', type: 1, visible: true, remark: '主键生成策略', createTime: 1672531200000 },
      { id: 2, category: 'general', name: '用户初始密码', key: 'sys.user.init-password', value: '123456', type: 1, visible: false, remark: '用户初始密码', createTime: 1672531200000 },
    ]

    const start = (pageNo - 1) * pageSize
    const list = configList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 200,
      data: { list, total: configList.length },
      msg: '',
    })
  }),

  http.get(`${BASE_URL}/system/config/get`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: { id: 1, category: 'general', name: '主键生成策略', key: 'sys.id-type', value: 'snowflake', type: 1, visible: true, remark: '主键生成策略', createTime: 1672531200000 }, msg: '' })
  }),
  http.post(`${BASE_URL}/system/config/create`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/config/update`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/system/config/delete`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
]

/**
 * 日志管理 mock
 */
export const logHandlers = [
  http.get(`${BASE_URL}/system/login-log/page`, async ({ request }) => {
    await delay(200)
    return HttpResponse.json({
      code: 200,
      data: { list: [], total: 0 },
      msg: '',
    })
  }),
  http.get(`${BASE_URL}/system/operate-log/page`, async ({ request }) => {
    await delay(200)
    return HttpResponse.json({
      code: 200,
      data: { list: [], total: 0 },
      msg: '',
    })
  }),
]

/**
 * 权限 mock
 */
export const permissionHandlers = [
  http.get(`${BASE_URL}/system/role/menu-list`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: [1, 11, 12, 13, 14], msg: '' })
  }),
  http.post(`${BASE_URL}/system/role/assign-menu`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
  http.get(`${BASE_URL}/system/role/data-scope`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: [1, 2], msg: '' })
  }),
  http.post(`${BASE_URL}/system/role/assign-data-scope`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
]

/**
 * 通知消息 mock
 */
export const notifyHandlers = [
  http.get(`${BASE_URL}/system/notify-message/page`, async ({ request }) => {
    await delay(200)
    return HttpResponse.json({
      code: 200,
      data: { list: [], total: 0 },
      msg: '',
    })
  }),
]
