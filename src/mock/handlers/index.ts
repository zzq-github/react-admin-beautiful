import { authHandlers } from './auth'
import { dictHandlers } from './dict'
import { userHandlers, roleHandlers, deptHandlers, positionHandlers } from './system'
import { menuHandlers, configHandlers, logHandlers, permissionHandlers, notifyHandlers } from './others'

/**
 * 合并所有 mock handlers
 */
export const handlers = [
  ...authHandlers,
  ...dictHandlers,
  ...userHandlers,
  ...roleHandlers,
  ...deptHandlers,
  ...positionHandlers,
  ...menuHandlers,
  ...configHandlers,
  ...logHandlers,
  ...permissionHandlers,
  ...notifyHandlers,
]