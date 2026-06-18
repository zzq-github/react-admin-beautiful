import { authHandlers } from './auth';
import { dictHandlers } from './dict';
import { exampleHandlers } from './examples';
import { userHandlers, roleHandlers, deptHandlers, positionHandlers } from './system';
import {
  menuHandlers,
  configHandlers,
  logHandlers,
  permissionHandlers,
  notifyHandlers,
} from './others';

/**
 * 合并所有 mock handlers
 */
export const handlers = [
  ...authHandlers,
  ...dictHandlers,
  ...exampleHandlers,
  ...userHandlers,
  ...roleHandlers,
  ...deptHandlers,
  ...positionHandlers,
  ...menuHandlers,
  ...configHandlers,
  ...logHandlers,
  ...permissionHandlers,
  ...notifyHandlers,
];
