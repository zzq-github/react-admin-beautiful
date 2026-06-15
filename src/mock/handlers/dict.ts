import { http, HttpResponse, delay } from 'msw'

const BASE_URL = '/api'

/**
 * 字典相关 mock
 */
export const dictHandlers = [
  // 获取全部字典数据（简版）
  http.get(`${BASE_URL}/system/dict-data/list-all-simple`, async () => {
    await delay(150)
    return HttpResponse.json({
      code: 200,
      data: [
        { dictType: 'system_user_sex', value: '0', label: '女', colorType: 'success', cssClass: '' },
        { dictType: 'system_user_sex', value: '1', label: '男', colorType: 'primary', cssClass: '' },
        { dictType: 'system_user_sex', value: '2', label: '未知', colorType: 'info', cssClass: '' },
        { dictType: 'common_status', value: '0', label: '开启', colorType: 'success', cssClass: '' },
        { dictType: 'common_status', value: '1', label: '关闭', colorType: 'danger', cssClass: '' },
        { dictType: 'system_menu_type', value: '1', label: '目录', colorType: '', cssClass: '' },
        { dictType: 'system_menu_type', value: '2', label: '菜单', colorType: '', cssClass: '' },
        { dictType: 'system_menu_type', value: '3', label: '按钮', colorType: '', cssClass: '' },
        { dictType: 'system_role_type', value: '1', label: '自定义角色', colorType: '', cssClass: '' },
        { dictType: 'system_role_type', value: '2', label: '系统内置角色', colorType: '', cssClass: '' },
        { dictType: 'system_data_scope', value: '1', label: '全部数据权限', colorType: '', cssClass: '' },
        { dictType: 'system_data_scope', value: '2', label: '指定部门数据权限', colorType: '', cssClass: '' },
        { dictType: 'system_data_scope', value: '3', label: '本部门数据权限', colorType: '', cssClass: '' },
        { dictType: 'system_data_scope', value: '4', label: '本部门及以下数据权限', colorType: '', cssClass: '' },
        { dictType: 'system_data_scope', value: '5', label: '仅本人数据权限', colorType: '', cssClass: '' },
      ],
      msg: '',
    })
  }),

  // 字典数据分页
  http.get(`${BASE_URL}/system/dict-data/page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const dictDataList = [
      { id: 1, sort: 1, label: '女', value: '0', dictType: 'system_user_sex', status: 0, colorType: 'success', cssClass: '', remark: '性别-女', createTime: 1672531200000 },
      { id: 2, sort: 2, label: '男', value: '1', dictType: 'system_user_sex', status: 0, colorType: 'primary', cssClass: '', remark: '性别-男', createTime: 1672531200000 },
      { id: 3, sort: 1, label: '开启', value: '0', dictType: 'common_status', status: 0, colorType: 'success', cssClass: '', remark: '状态-开启', createTime: 1672531200000 },
      { id: 4, sort: 2, label: '关闭', value: '1', dictType: 'common_status', status: 0, colorType: 'danger', cssClass: '', remark: '状态-关闭', createTime: 1672531200000 },
      { id: 5, sort: 1, label: '目录', value: '1', dictType: 'system_menu_type', status: 0, colorType: '', cssClass: '', remark: '菜单类型-目录', createTime: 1672531200000 },
      { id: 6, sort: 2, label: '菜单', value: '2', dictType: 'system_menu_type', status: 0, colorType: '', cssClass: '', remark: '菜单类型-菜单', createTime: 1672531200000 },
      { id: 7, sort: 3, label: '按钮', value: '3', dictType: 'system_menu_type', status: 0, colorType: '', cssClass: '', remark: '菜单类型-按钮', createTime: 1672531200000 },
    ]

    const start = (pageNo - 1) * pageSize
    const list = dictDataList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 200,
      data: { list, total: dictDataList.length },
      msg: '',
    })
  }),

  http.post(`${BASE_URL}/system/dict-data/create`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/dict-data/update`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/system/dict-data/delete`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),

  // 字典类型分页
  http.get(`${BASE_URL}/system/dict-type/page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const dictTypeList = [
      { id: 1, name: '用户性别', type: 'system_user_sex', status: 0, remark: '用户性别', createTime: 1672531200000 },
      { id: 2, name: '通用状态', type: 'common_status', status: 0, remark: '通用状态', createTime: 1672531200000 },
      { id: 3, name: '菜单类型', type: 'system_menu_type', status: 0, remark: '菜单类型', createTime: 1672531200000 },
      { id: 4, name: '角色类型', type: 'system_role_type', status: 0, remark: '角色类型', createTime: 1672531200000 },
      { id: 5, name: '数据权限', type: 'system_data_scope', status: 0, remark: '数据权限范围', createTime: 1672531200000 },
    ]

    const start = (pageNo - 1) * pageSize
    const list = dictTypeList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 200,
      data: { list, total: dictTypeList.length },
      msg: '',
    })
  }),

  http.get(`${BASE_URL}/system/dict-type/list-all-simple`, async () => {
    await delay(150)
    return HttpResponse.json({
      code: 200,
      data: [
        { id: 1, name: '用户性别', type: 'system_user_sex' },
        { id: 2, name: '通用状态', type: 'common_status' },
        { id: 3, name: '菜单类型', type: 'system_menu_type' },
        { id: 4, name: '角色类型', type: 'system_role_type' },
        { id: 5, name: '数据权限', type: 'system_data_scope' },
      ],
      msg: '',
    })
  }),

  http.post(`${BASE_URL}/system/dict-type/create`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/dict-type/update`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/system/dict-type/delete`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 200, data: true, msg: '' })
  }),
]
