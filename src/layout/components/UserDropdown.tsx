import React from 'react';
import { Dropdown, Space, Avatar } from 'antd';
import { User, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import { removeToken } from '@/utils/auth';
import { authService } from '@/core/services/authService';
import { appConfig } from '@/config/app';

const UserDropdown: React.FC = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.info?.user);
  const resetUser = useUserStore((state) => state.resetUser);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // Local state still needs to be cleared even if the server logout fails.
    }
    removeToken();
    resetUser();
    navigate(appConfig.loginRoute, { replace: true });
  };

  const items = [
    {
      key: 'settings',
      label: '个人设置',
      icon: <Settings size={14} />,
      onClick: () => {},
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogOut size={14} />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <Space
        size={8}
        align="center"
        className="h-9 cursor-pointer hover:bg-theme-hover px-2 rounded-lg transition-colors"
      >
        <Avatar
          size={28}
          src={user?.avatar}
          icon={!user?.avatar && <User size={16} />}
          className="bg-theme-primary"
        />
        <span className="text-sm font-medium text-theme-text-secondary hidden sm:inline">
          {user?.nickname || 'Admin'}
        </span>
      </Space>
    </Dropdown>
  );
};

export default UserDropdown;
