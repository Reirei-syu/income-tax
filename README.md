<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# income-tax

讲课费个税计算器，基于 Vite + React 构建，可直接部署到 GitHub Pages。

## 本地运行

前置条件：Node.js 20+

1. 安装依赖

   ```bash
   npm install
   ```

2. 启动开发环境

   ```bash
   npm run dev
   ```

3. 构建生产版本

   ```bash
   npm run build
   ```

## GitHub Pages 部署

仓库内已包含 GitHub Actions 工作流 [`.github/workflows/static.yml`](./.github/workflows/static.yml)，推送到 `main` 分支后会自动构建并发布到 GitHub Pages。

首次启用时需要在 GitHub 仓库中执行：

1. 打开仓库 `Settings`
2. 进入 `Pages`
3. 在 `Build and deployment` 中选择 `Source = GitHub Actions`
4. 推送到 `main` 分支，等待 Actions 完成部署

部署完成后，页面通常可通过以下地址访问：

`https://reirei-syu.github.io/income-tax/`
