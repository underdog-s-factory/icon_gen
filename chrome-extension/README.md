# Icon生成工具箱 - Chrome扩展版

一键生成多平台图标包的 Chrome 浏览器扩展。

## 功能特性

- ✅ 支持 Chrome Extension、iOS App、Android App 三大平台
- ✅ 一键生成所有所需尺寸的图标
- ✅ 内置 Cropper.js 图片裁剪功能
- ✅ 支持拖拽上传、文件选择、剪贴板粘贴
- ✅ 纯前端处理，无需后端服务器
- ✅ 自动打包为 ZIP 文件下载
- ✅ 完全符合 Manifest V3 规范

## 安装方法

### 开发者模式安装

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择 `chrome-extension` 文件夹
6. 安装完成！

## 使用方法

1. 点击浏览器工具栏中的插件图标
2. 上传或粘贴一张图片（建议使用 1024x1024 的正方形图片）
3. 在预览区调整裁剪框
4. 选择目标平台（Chrome/iOS/Android）
5. 点击"生成图标包"按钮
6. 自动下载包含所有尺寸图标的 ZIP 文件

## 支持的图标尺寸

### Chrome Extension
- 16x16 - favicon, 工具栏
- 32x32 - Windows 任务栏
- 48x48 - 扩展管理页面
- 128x128 - Chrome 网上应用店

### iOS App
- 14 种不同尺寸，涵盖所有 iPhone/iPad 设备
- 包含 App Store 所需的 1024x1024 图标

### Android App
- 6 种密度（mdpi/hdpi/xhdpi/xxhdpi/xxxhdpi）
- 包含 Play Store 所需的 512x512 图标

## 技术架构

### Manifest V3 合规性

本插件完全符合 Chrome Manifest V3 规范：

- ✅ 使用 `manifest_version: 3`
- ✅ 所有依赖库（JSZip）已下载到本地
- ✅ 无远程代码加载
- ✅ 无 `eval()` 或动态代码执行
- ✅ 使用本地资源引用

### 目录结构

```
chrome-extension/
├── manifest.json          # Manifest V3 配置文件
├── popup.html            # 弹窗界面
├── popup.css             # 弹窗样式
├── popup.js              # 弹窗交互逻辑
├── assets/               # 插件自身图标
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── core/                 # 核心处理逻辑
│   ├── icon-sizes.js     # 图标尺寸定义
│   ├── canvas-processor.js # Canvas 图像处理
│   └── utils.js          # 工具函数
└── lib/                  # 第三方库（本地）
    ├── jszip.min.js      # ZIP 打包库
    ├── cropper.min.js    # 图片裁剪库
    └── cropper.min.css   # 裁剪库样式
```

### 核心技术

- **HTML5 Canvas API** - 图像缩放和处理
- **JSZip** - ZIP 文件打包（本地版本）
- **Cropper.js** - 图片裁剪库（本地版本）
- **FileReader API** - 文件读取
- **Clipboard API** - 剪贴板访问

## 开发说明

### 本地依赖

所有依赖库已下载到本地 `lib/` 目录：
- `jszip.min.js` (v3.10.1) - 从 CDN 下载的本地副本
- `cropper.min.js` (v1.5.13) - 图片裁剪库
- `cropper.min.css` (v1.5.13) - 裁剪库样式

### 核心模块

核心处理逻辑位于 `core/` 目录，与网站版和油猴脚本版共享：
- `icon-sizes.js` - 定义各平台图标尺寸规范
- `canvas-processor.js` - Canvas 图像处理核心函数
- `utils.js` - ZIP 打包、文件下载等工具函数

### 修改和调试

1. 修改代码后，在 `chrome://extensions/` 页面点击"重新加载"
2. 打开插件弹窗，按 F12 可以打开开发者工具调试
3. 查看控制台输出和网络请求

## 注意事项

- 建议使用 1024x1024 或更大的正方形图片作为源图
- 支持的图片格式：PNG、JPG、GIF、WebP
- 文件大小限制：10MB
- 生成的图标为 PNG 格式，无损压缩

## 许可证

本项目基于 MIT 许可证开源。

## 相关链接

- [Chrome Extension 开发文档](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 迁移指南](https://developer.chrome.com/docs/extensions/mv3/intro/)