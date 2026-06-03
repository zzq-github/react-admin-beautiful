import { loadEnv } from 'vite';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载开发环境变量
const env = loadEnv('dev', process.cwd());
const apiUrl = env.VITE_BASE_API+'/v3/api-docs/system';

if (!apiUrl) {
  console.error('错误：未找到 VITE_BASE_API 环境变量，请检查 .env.dev 文件');
  process.exit(1);
}

console.log(`使用 API 地址: ${apiUrl}`);

// 构建命令参数
const args = [
  'openapi-typescript-codegen',
  '--input', apiUrl,
  '--output', './openai',
  '--client', 'axios'
];

console.log('执行命令:', 'npx', args.join(' '));

// 使用 npx 执行
const child = spawn('npx', args, { stdio: 'inherit', shell: true });

child.on('close', (code) => {
  if (code !== 0) {
    console.error(`命令执行失败，退出码: ${code}`);
    process.exit(code);
  }
  console.log('API 代码生成完成');
});