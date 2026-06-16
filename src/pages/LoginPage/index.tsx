import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  LayoutDashboard,
  Loader2,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";
import { authService } from "@/core/services/authService";
import { setToken } from "@/utils/auth";
import { appConfig } from "@/config/app";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

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
      if (typeof err === "string") setError(err);
      console.error("登录失败:", err);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg-base text-theme-text">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
        <section className="relative hidden overflow-hidden border-r border-theme-border-secondary bg-theme-bg-container lg:flex">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-bg-container)_94%,var(--color-primary)),var(--color-bg-base))]" />
          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-theme-primary text-base font-bold text-white shadow-sm">
                {appConfig.shortName.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <h1 className="text-lg font-semibold leading-tight text-theme-text">
                  {appConfig.name}
                </h1>
                <p className="text-xs text-theme-text-tertiary">
                  {appConfig.description}
                </p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[640px]">
              <div className="mb-8 max-w-lg">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-theme-primary-border bg-theme-primary-bg px-3 py-1 text-sm font-medium text-theme-primary">
                  <ShieldCheck size={16} />
                  Admin Workspace
                </div>
                <h2 className="text-4xl font-semibold leading-tight tracking-normal text-theme-text xl:text-5xl">
                  专注业务配置与数据管理
                </h2>
                <p className="mt-4 max-w-md text-base leading-7 text-theme-text-secondary">
                  统一布局、权限、菜单、主题和基础组件，让后台项目可以更快进入业务开发。
                </p>
              </div>

              <div className="rounded-lg border border-theme-border-secondary bg-theme-bg/80 p-4 shadow-sm backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-theme-primary-bg text-theme-primary">
                      <LayoutDashboard size={17} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-theme-text">
                        Dashboard
                      </div>
                      <div className="text-xs text-theme-text-tertiary">
                        Overview
                      </div>
                    </div>
                  </div>
                  <div className="rounded-full bg-theme-success-bg px-2.5 py-1 text-xs font-medium text-theme-success">
                    Online
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["用户", "12.8k", "bg-theme-primary-bg text-theme-primary"],
                    ["订单", "1.9k", "bg-theme-success-bg text-theme-success"],
                    ["访问", "93k", "bg-theme-warning-bg text-theme-warning"],
                  ].map(([label, value, cls]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-theme-border-secondary bg-theme-bg-container p-3"
                    >
                      <div className={`mb-3 h-8 w-8 rounded-lg ${cls}`} />
                      <div className="text-xs text-theme-text-tertiary">{label}</div>
                      <div className="mt-1 text-lg font-semibold text-theme-text">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-lg border border-theme-border-secondary bg-theme-bg-container p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm font-medium text-theme-text">
                      Activity
                    </div>
                    <div className="h-2 w-16 rounded-full bg-theme-primary-bg" />
                  </div>
                  <div className="flex h-28 items-end gap-2">
                    {[38, 64, 46, 78, 58, 88, 72, 96, 68, 82].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-md bg-theme-primary"
                        style={{ height: `${height}%`, opacity: 0.28 + index * 0.055 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-theme-text-tertiary">
              {appConfig.copyright}
            </p>
          </div>
        </section>

        <main className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8">
          <div className="w-full max-w-[420px]">
            <div className="mb-8 lg:hidden">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-theme-primary text-base font-bold text-white shadow-sm">
                  {appConfig.shortName.slice(0, 1).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-lg font-semibold leading-tight text-theme-text">
                    {appConfig.name}
                  </h1>
                  <p className="text-xs text-theme-text-tertiary">
                    {appConfig.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-theme-border-secondary bg-theme-bg-container p-6 shadow-sm sm:p-8">
              <div className="mb-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-theme-primary-bg text-theme-primary">
                  <Lock size={22} />
                </div>
                <h2 className="text-2xl font-semibold text-theme-text">
                  登录控制台
                </h2>
                <p className="mt-2 text-sm text-theme-text-secondary">
                  使用账号密码进入管理后台。
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-theme-text-secondary"
                  >
                    用户名
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-text-tertiary" />
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      value={formData.username}
                      onChange={handleInputChange}
                      className="block h-11 w-full rounded-lg border border-theme-border bg-theme-bg-elevated pl-10 pr-3 text-sm text-theme-text caret-theme-primary outline-none transition-colors placeholder:text-theme-text-tertiary focus:border-theme-primary focus:ring-2 focus:ring-theme-primary-bg disabled:bg-theme-bg disabled:text-theme-text-tertiary"
                      placeholder="请输入用户名"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-theme-text-secondary"
                  >
                    密码
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-text-tertiary" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block h-11 w-full rounded-lg border border-theme-border bg-theme-bg-elevated pl-10 pr-11 text-sm text-theme-text caret-theme-primary outline-none transition-colors placeholder:text-theme-text-tertiary focus:border-theme-primary focus:ring-2 focus:ring-theme-primary-bg disabled:bg-theme-bg disabled:text-theme-text-tertiary"
                      placeholder="请输入密码"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-theme-text-tertiary transition-colors hover:bg-theme-hover hover:text-theme-text"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      aria-label={showPassword ? "隐藏密码" : "显示密码"}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-theme-error-border bg-theme-error-bg px-3 py-2.5 text-sm text-theme-error">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-theme-primary px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-theme-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      登录中
                    </>
                  ) : (
                    <>
                      登录
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </form>
            </div>

            <p className="mt-6 text-center text-xs text-theme-text-tertiary lg:hidden">
              {appConfig.copyright}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
