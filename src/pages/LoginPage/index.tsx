import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { authService } from "@/core/services/authService";
import { setToken } from "@/utils/auth";
import { appConfig } from "@/config/app";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // 1. 自动推导表单数据类型
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // 2. 输入框变更处理：使用 ChangeEvent 约束 HTMLInputElement
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 清除错误信息
    if (error) setError("");
  };

  // 3. 表单提交处理：使用 FormEvent 约束
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("请输入用户名和密码");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await authService.login({
        username: formData.username,
        password: formData.password,
      });

      const tokenData = res.data;
      
      setToken(tokenData);
      navigate(appConfig.defaultRoute);
    } catch (err: any) {
      setLoading(false);
      // 如果错误是字符串则显示，否则控制台打印
      if (typeof err === "string") setError(err);
      console.error("登录失败:", err);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg-base flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-theme-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-theme-text mb-2">
            {appConfig.name}
          </h1>
          <p className="text-theme-text-secondary">请登录您的账户以继续</p>
        </div>

        {/* 登录表单 */}
        <div className="bg-theme-bg rounded-lg shadow-lg border border-theme-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 用户名输入 */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-theme-text-secondary mb-2"
              >
                用户名
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-theme-text-tertiary" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-theme-border rounded-md shadow-sm placeholder:text-theme-text-tertiary focus:outline-none focus:ring-theme-primary focus:border-theme-primary bg-theme-bg text-theme-text"
                  placeholder="请输入用户名"
                  disabled={loading}
                />
              </div>
            </div>

            {/* 密码输入 */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-theme-text-secondary mb-2"
              >
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-theme-text-tertiary" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-2 border border-theme-border rounded-md shadow-sm placeholder:text-theme-text-tertiary focus:outline-none focus:ring-theme-primary focus:border-theme-primary bg-theme-bg text-theme-text"
                  placeholder="请输入密码"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-theme-text-tertiary hover:text-theme-text-secondary" />
                  ) : (
                    <Eye className="h-5 w-5 text-theme-text-tertiary hover:text-theme-text-secondary" />
                  )}
                </button>
              </div>
            </div>

            {/* 错误信息 */}
            {error && (
              <div className="bg-theme-error-bg border border-theme-error-border rounded-md p-3">
                <div className="text-sm text-theme-error">{error}</div>
              </div>
            )}

            {/* 登录按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-theme-primary hover:bg-theme-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  登录中...
                </div>
              ) : (
                "登录"
              )}
            </button>
          </form>
        </div>

        {/* 底部信息 */}
        <div className="mt-8 text-center text-sm text-theme-text-tertiary">
          {appConfig.copyright}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
