import React from "react";
import { User, X, Bell, Menu } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import { removeToken } from "@/utils/auth";
import { logout } from "@/api/login";

// --- 1. 定义 Props 接口 ---
interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  // 从 Store 中获取真实的用户信息
  const user = useUserStore((state) => state.info?.user);

  /**
   * 退出登录处理
   */
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // 即使接口失败也继续清理本地状态
    }
    removeToken();
    useUserStore.getState().resetUser();
    window.location.href = "/#/login";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={sidebarOpen ? "折叠菜单" : "展开菜单"}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              芋道react
            </h1>
            <p className="text-xs text-gray-500">yudao Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* 通知图标 */}
          <button
            onClick={()=>navigate("/user/notify-message")}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Bell size={20} />
          </button>

          {/* 用户信息卡片 */}
          <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              {/* 如果用户有头像可以渲染 img，否则渲染图标 */}
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  className="w-full h-full rounded-full"
                  alt="avatar"
                />
              ) : (
                <User className="text-white" size={16} />
              )}
            </div>

            <div className="text-sm">
              <p className="font-medium text-gray-900">
                {user?.nickname || "管理员"}
              </p>
              <button
                type="button"
                className="text-gray-500 hover:text-red-500 transition-colors text-left"
                onClick={handleLogout}
              >
                退出
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
