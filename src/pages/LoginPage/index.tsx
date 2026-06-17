import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Database,
  Eye,
  EyeOff,
  Gauge,
  Layers,
  Loader2,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";
import { authService } from "@/core/services/authService";
import { setToken } from "@/utils/auth";
import { appConfig } from "@/config/app";

const metrics = [
  {
    label: "用户",
    value: "12.8k",
    icon: User,
    className: "bg-theme-primary-bg text-theme-primary",
  },
  {
    label: "订单",
    value: "1.9k",
    icon: Database,
    className: "bg-theme-success-bg text-theme-success",
  },
  {
    label: "访问",
    value: "93k",
    icon: Activity,
    className: "bg-theme-warning-bg text-theme-warning",
  },
];

const bars = [38, 64, 46, 78, 58, 88, 72, 96, 68, 82];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
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

      setToken(res.data);
      navigate(appConfig.defaultRoute);
    } catch (err: any) {
      setLoading(false);
      setError(typeof err === "string" ? err : "登录失败，请检查账号或密码");
      console.error("登录失败:", err);
    }
  };

  return (
    <div className="login-page min-h-screen bg-theme-bg-base text-theme-text">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)]">
        <section className="login-hero relative hidden overflow-hidden border-r border-theme-border-secondary bg-theme-bg-container lg:flex">
          <div className="login-grid-pattern absolute inset-0" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-12">
            <div className="login-enter login-enter-delay-1 flex items-center gap-3">
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

            <div className="mx-auto w-full max-w-[660px]">
              <div className="login-enter login-enter-delay-2 mb-8 max-w-xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-theme-primary-border bg-theme-primary-bg px-3 py-1 text-sm font-medium text-theme-primary">
                  <ShieldCheck size={15} />
                  Admin Workspace
                </div>
                <h2 className="text-4xl font-semibold leading-tight text-theme-text xl:text-5xl">
                  专注业务配置与数据管理
                </h2>
                <p className="mt-4 max-w-lg text-base leading-7 text-theme-text-secondary">
                  统一布局、权限、菜单、主题和基础组件，让后台项目可以更快进入业务开发。
                </p>
              </div>

              <div className="login-enter login-enter-delay-3 login-preview-panel rounded-2xl border border-theme-border-secondary bg-theme-bg p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-theme-primary-bg text-theme-primary">
                      <Gauge size={17} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-theme-text">
                        Control Overview
                      </div>
                      <div className="text-xs text-theme-text-tertiary">
                        Realtime workspace
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-theme-success-bg px-2.5 py-1 text-xs font-medium text-theme-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-theme-success" />
                    Online
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {metrics.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="rounded-xl border border-theme-border-secondary bg-theme-bg-container p-3 transition-transform duration-motion-base ease-motion-out hover:-translate-y-0.5"
                      >
                        <div
                          className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${item.className}`}
                        >
                          <Icon size={15} />
                        </div>
                        <div className="text-xs text-theme-text-tertiary">
                          {item.label}
                        </div>
                        <div className="mt-1 text-lg font-semibold text-theme-text">
                          {item.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-theme-border-secondary bg-theme-bg-container p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-theme-text">
                      <Layers size={15} className="text-theme-primary" />
                      Activity
                    </div>
                    <div className="h-1.5 w-16 rounded-full bg-theme-primary-bg" />
                  </div>
                  <div className="flex h-28 items-end gap-2">
                    {bars.map((height, index) => (
                      <div
                        key={index}
                        className="login-bar flex-1 rounded-t-md bg-theme-primary"
                        style={
                          {
                            height: `${height}%`,
                            opacity: 0.22 + index * 0.055,
                            "--bar-delay": `${index * 50}ms`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="login-enter login-enter-delay-4 text-sm text-theme-text-tertiary">
              {appConfig.copyright}
            </p>
          </div>
        </section>

        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-theme-bg-base px-5 py-8 sm:px-8">
          <div className="login-grid-pattern absolute inset-0 opacity-50 lg:hidden" />
          <div className="login-enter login-enter-delay-3 relative z-10 w-full max-w-[396px]">
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

            <div className="rounded-2xl border border-theme-border-secondary bg-theme-bg-container p-6 sm:p-7">
              <div className="mb-7">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-theme-primary-bg text-theme-primary">
                  <Lock size={20} />
                </div>
                <h2 className="text-2xl font-semibold tracking-normal text-theme-text">
                  登录控制台
                </h2>
                <p className="mt-2 text-sm leading-6 text-theme-text-secondary">
                  使用账号密码进入管理后台。
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                      autoComplete="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="login-input block h-11 w-full rounded-lg border border-theme-border bg-theme-bg-elevated pl-10 pr-3 text-sm text-theme-text caret-theme-primary outline-none transition-all duration-motion-base ease-motion-out placeholder:text-theme-text-tertiary focus:border-theme-primary focus:bg-theme-bg-container focus:ring-2 focus:ring-theme-primary-bg disabled:bg-theme-bg disabled:text-theme-text-tertiary"
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
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="login-input block h-11 w-full rounded-lg border border-theme-border bg-theme-bg-elevated pl-10 pr-11 text-sm text-theme-text caret-theme-primary outline-none transition-all duration-motion-base ease-motion-out placeholder:text-theme-text-tertiary focus:border-theme-primary focus:bg-theme-bg-container focus:ring-2 focus:ring-theme-primary-bg disabled:bg-theme-bg disabled:text-theme-text-tertiary"
                      placeholder="请输入密码"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-theme-text-tertiary transition-all duration-motion-base ease-motion-out hover:bg-theme-hover hover:text-theme-text active:scale-95"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                      aria-label={showPassword ? "隐藏密码" : "显示密码"}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {error ? (
                  <div className="flex items-start gap-2 rounded-lg border border-theme-error-border bg-theme-error-bg px-3 py-2.5 text-sm text-theme-error">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="login-submit inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-theme-primary px-4 text-sm font-medium text-white transition-all duration-motion-base ease-motion-out hover:bg-theme-primary-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
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

              <div className="mt-5 flex items-center justify-between rounded-lg bg-theme-bg-base px-3 py-2 text-xs text-theme-text-tertiary">
                <span>演示账号</span>
                <span className="font-medium text-theme-text-secondary">
                  admin / admin123
                </span>
              </div>
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
