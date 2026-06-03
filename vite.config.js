import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ReactInjectorVitePlugin } from "yunji-tagger";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    ReactInjectorVitePlugin(),
    createSvgIconsPlugin({
      // 必须：指定需要缓存的图标文件夹路径（请确保路径正确）
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
      // 指定 symbolId 格式，对应 SvgIcon 组件中的 <use xlinkHref="#icon-xxx" />
      symbolId: "icon-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3030, // 设置默认启动端口
    proxy: {
      // 将 /admin-api/ 开头的请求代理到后端服务，解决开发环境跨域问题
      "/admin-api": {
        target: "http://192.168.0.249:48089",
        changeOrigin: true,
      },
    },
  },
});
