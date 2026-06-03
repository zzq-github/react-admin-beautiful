// 登录入参
export interface AuthLoginReqVO {
  username: string;
  password: string;
  captchaVerification?: string;
  socialType?: number;
  socialCode?: string;
  socialState?: string;
}

// 登录返参
export interface CommonResultAuthLoginRespVO {
  accessToken: string;
  refreshToken: string;
  userId: number;
  expiresTime: number;
}

// 权限接口返参
export interface AuthPermissionInfoRespVO {
  user: UserVO;
  roles: string[];
  permissions: string[];
  menus: MenuVO;
}

/** 用户信息 VO */
export interface UserVO {
  id: number;
  nickname: string;
  avatar: string;
  deptId: number;
  username: string;
  email?: string;
}

/** 登录用户的菜单信息 Response VO */
// type 1 - 目录, 2 - 菜单, 3 - 按钮
export interface MenuVO {
  id: number;
  parentId: number;
  name: string;
  path?: string;
  component?: string;
  componentName?: string;
  icon?: string;
  visible: boolean;
  keepAlive: boolean;
  alwaysShow?: boolean;
  children?: MenuVO[];
  type: 1 | 2 | 3;
}
