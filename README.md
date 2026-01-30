# 简历网站（React + TypeScript + Vite）

这是一个纯前端的单页简历网站（SPA）。页面内容主要由 `src/components/*` 组件组合而成，使用 Tailwind CSS 完成样式，构建产物为可直接部署的静态文件（`dist/`）。

## 本地运行

```bash
npm ci
npm run dev
```

## 本地联调（前端 + /api/chat 后端）

本项目的 AI 聊天后端位于 `api/chat.ts`（Serverless Function 形态）。如需在本地完整体验（包含流式输出），可同时启动本地 API 与前端：

```bash
npm install
npm run dev:api
```

另开一个终端启动前端：

```bash
npm run dev
```

## 构建与预览

```bash
npm run build
npm run preview
```

## 技术栈与结构

- 前端框架：React 18
- 构建工具：Vite
- 语言：TypeScript
- 样式：Tailwind CSS（`tailwind.config.js`）
- 图标：lucide-react
- 动效/3D：three
- 资源：`public/` 下文件会被原样拷贝到 `dist/`（简历 PDF 放在 `public/resume.pdf`）

## AI 功能：HR 问答聊天框

项目包含一个右下角的 HR Chat Box（`src/components/HRChatWidget.tsx`），支持基于简历内容的实时问答。

- 默认走接口模式：前端请求 `/api/chat`，由服务端代理调用大模型（避免在浏览器暴露 Key）。
- 默认开启“脱敏联系方式”：聊天回答不会主动输出手机号/邮箱；可在聊天窗内关闭脱敏后再询问。
- 可切换为 Mock 模式：不接大模型，仅用于本地演示（`VITE_CHAT_MODE=mock`）。
- 支持“流式输出”（SSE）：后端按增量推送，前端逐字显示；如上游不支持或失败，会自动回退为一次性响应。

### 大模型环境变量（服务端）

部署到 Vercel（或任何支持 Serverless Function 的平台）后，在平台的 Environment Variables 中配置：

- `LLM_API_KEY`：模型 API Key（必填）
- `LLM_MODEL`：模型名（可选，默认 `gpt-4o-mini`）
- `LLM_BASE_URL`：OpenAI 兼容的 API Base URL（可选，默认 `https://api.openai.com/v1`）

### 前端可选环境变量

- `VITE_CHAT_API_URL`：自定义聊天接口地址（默认 `/api/chat`）
- `VITE_CHAT_MODE`：`api`（默认）或 `mock`
- 说明：`npm run preview` 仅用于静态预览，不包含 `/api/chat` 后端；如需真实对话，请本地 `npm run dev` 或部署到支持函数的平台（如 Vercel）。

## 上线部署（推荐）

基础简历站点是纯静态页面；如果启用 AI 聊天，需要一个支持函数/后端的部署环境（推荐 Vercel）。

### 方式 A：Vercel（推荐）

1. 将项目代码推送到 GitHub。
2. 在 Vercel 控制台点击 **Add New... -> Project**，导入你的仓库。
3. **重要**：如果你的项目文件在仓库的 `resume` 子目录下，请在 **Root Directory** 处点击 Edit 并选择 `resume` 目录。
4. **Framework Preset** 会自动识别为 `Vite`。
5. 在 **Environment Variables** 中填入：
   - `LLM_API_KEY`：你的大模型 API Key
   - `LLM_MODEL`：（可选）
   - `LLM_BASE_URL`：（可选）
6. 点击 **Deploy**。

项目内已包含 `vercel.json` 配置文件，会自动处理 API 路由与前端路由的转发规则。

### 方式 B：Netlify / Cloudflare Pages

- Build Command：`npm run build`
- Publish directory：`dist`

### 方式 C：GitHub Pages（仓库子路径部署）

如果最终访问路径是 `https://<user>.github.io/<repo>/`，需要给 Vite 设置 `base` 为 `/<repo>/`，然后重新构建并把 `dist/` 发布到 Pages。注意 GitHub Pages 不支持 `/api/chat` 这类服务端接口，AI 聊天需要独立后端或改用支持函数的平台。
