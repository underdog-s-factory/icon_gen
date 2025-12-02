# Icon生成工具箱

一个基于纯前端技术的多平台图标生成工具，支持一键生成 Chrome Extension、iOS App 和 Android App 所需的全套图标。

## ✨ 特性

- 🎨 **纯前端实现** - 基于 HTML5 Canvas，无需后端支持
- 🚀 **一键生成** - 自动生成多种尺寸的图标包
- 📦 **ZIP打包** - 自动打包下载，保持目录结构
- 🔄 **多平台支持** - Chrome Extension、iOS App、Android App
- ✂️ **图片裁剪** - 集成 Cropper.js，支持上传后在线裁剪
- 📋 **剪贴板支持** - 支持直接从剪贴板粘贴图片
- 🎯 **拖拽上传** - 支持拖拽上传图片文件
- 💡 **模块化设计** - 核心逻辑可复用于油猴脚本和Chrome插件

## 📁 项目结构

```
icon-generator-toolbox/
├── website/                   # 静态网站版本
│   ├── index.html            # 主页面
├── tampermonkey/              # 油猴脚本版本
│   └── icon-gen.user.js      # 油猴脚本主文件
├── chrome-extension/          # Chrome扩展版本
│   ├── manifest.json         # Manifest V3配置
│   ├── popup.html            # 弹窗界面
│   ├── popup.css             # 弹窗样式
│   ├── popup.js              # 弹窗逻辑
│   ├── assets/               # 扩展图标
│   ├── core/                 # 核心逻辑（复用）
│   └── lib/                  # 本地依赖库
└── README.md                  # 项目说明
```

## 🚀 快速开始

本项目提供多种使用方式，满足不同场景需求：

### 方式一：静态网站版本

**适用场景**：本地使用、团队内部部署

1. 克隆或下载本项目
2. 在浏览器中直接打开 `website/index.html`
3. 上传或粘贴图片
4. 裁剪图片（支持缩放、移动）
5. 选择目标平台（Chrome/iOS/Android）
6. 点击"生成图标包"按钮
7. 自动下载ZIP文件

**本地服务器运行**（可选）：

```bash
# 使用 Python 3
cd icon-generator-toolbox
python -m http.server 8000

# 使用 Node.js (需要安装 http-server)
npx http-server -p 8000

# 然后访问 http://localhost:8000/website/
```

### 方式二：Chrome扩展版本

**适用场景**：Chrome浏览器用户，一键快速访问

**安装步骤**：

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择 `chrome-extension` 文件夹
6. 安装完成！

**使用方法**：

1. 点击浏览器工具栏中的扩展图标
2. 在弹出窗口中上传或粘贴图片（建议 1024x1024）
3. 裁剪图片（自由调整裁剪区域）
4. 选择目标平台（Chrome/iOS/Android）
5. 点击"生成图标包"按钮
6. 自动下载包含所有尺寸的 ZIP 文件

**特点**：
- ✅ 完全符合 Manifest V3 规范
- ✅ 所有依赖库本地化，无远程加载
- ✅ 快速访问，无需打开新页面
- ✅ 支持剪贴板粘贴功能

### 方式三：油猴脚本版本（暂不可用）

**适用场景**：在任意网页使用，无需打开额外页面

**注意**：此版本目前存在兼容性问题，暂时无法正常使用。

**安装步骤**：

1. 安装油猴扩展（Tampermonkey）
   - [Chrome 版本](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox 版本](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - [Edge 版本](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. 安装脚本
   - 打开 `tampermonkey/icon-gen.user.js` 文件
   - 复制全部内容
   - 在油猴扩展中点击"添加新脚本"
   - 粘贴代码并保存

**使用方法**：

1. 在任意网页上，点击油猴图标
2. 选择"Open Icon Generator"菜单项
3. 在弹出的界面中上传或粘贴图片
4. 裁剪图片
5. 选择目标平台
6. 点击"生成图标包"按钮
7. 自动下载ZIP文件

**特点**：
- ✅ 可在任意网页使用
- ✅ 通过右键菜单快速调用
- ✅ 支持拖拽、粘贴、文件选择
- ✅ 完整的进度显示

## 📱 支持的平台

### Chrome Extension
生成 4 种尺寸：
- 16x16 (favicon, 工具栏)
- 32x32 (Windows 任务栏)
- 48x48 (扩展管理页面)
- 128x128 (Chrome 网上应用店)

### iOS App
生成 14 种尺寸：
- 通知图标 (20-60px)
- 设置图标 (29-87px)
- Spotlight图标 (40-80px)
- 应用图标 (120-180px)
- iPad图标 (76-167px)
- App Store (1024x1024)

### Android App
生成 6 种尺寸：
- mdpi (48x48)
- hdpi (72x72)
- xhdpi (96x96)
- xxhdpi (144x144)
- xxxhdpi (192x192)
- Play Store (512x512)

## 🔧 核心技术

- **HTML5 Canvas API** - 图像处理和缩放
- **JSZip** - ZIP文件打包
- **Cropper.js** - 专业的图片裁剪库
- **原生JavaScript** - 无框架依赖
- **CSS3** - 现代化UI设计

## 🎯 核心逻辑复用

核心模块（`core/` 目录）采用模块化设计，可以轻松复用到其他场景：

### 在油猴脚本中使用

```javascript
// 引入核心模块
// @require file:///path/to/core/icon-sizes.js
// @require file:///path/to/core/canvas-processor.js
// @require file:///path/to/core/utils.js

// 使用核心功能
const icons = await window.IconProcessor.generateIcons(imageFile, 'chrome');
const zipBlob = await window.IconUtils.createZipPackage(icons, 'chrome');
```

### 在Chrome插件中使用

```javascript
// 在 manifest.json 中引入
{
  "background": {
    "scripts": [
      "core/icon-sizes.js",
      "core/canvas-processor.js",
      "core/utils.js"
    ]
  }
}

// 在插件代码中使用
const icons = await IconProcessor.generateIcons(imageFile, 'ios');
```

## 📝 API 文档

### IconProcessor.generateIcons()

生成指定平台的所有尺寸图标。

```javascript
/**
 * @param {File|string} imageSource - 图像文件或 data URL
 * @param {string} platform - 平台名称 ('chrome', 'ios', 'android')
 * @param {Function} progressCallback - 进度回调 (current, total)
 * @returns {Promise<Array>} 图标数据数组
 */
const icons = await IconProcessor.generateIcons(file, 'chrome', (current, total) => {
  console.log(`进度: ${current}/${total}`);
});
```

### IconUtils.createZipPackage()

创建ZIP压缩包。

```javascript
/**
 * @param {Array} icons - 图标数据数组
 * @param {string} platform - 平台名称
 * @returns {Promise<Blob>} ZIP文件的Blob对象
 */
const zipBlob = await IconUtils.createZipPackage(icons, 'ios');
```

### IconUtils.downloadFile()

触发文件下载。

```javascript
/**
 * @param {Blob} blob - 文件Blob对象
 * @param {string} filename - 文件名
 */
IconUtils.downloadFile(zipBlob, 'icons.zip');
```

## 🎨 设计理念

1. **极简主义** - 界面简洁，操作直观
2. **模块化** - 核心逻辑与UI分离，便于复用
3. **无依赖** - 除JSZip外无其他依赖
4. **纯前端** - 所有处理在浏览器中完成，保护隐私

## 🔮 未来计划

- [x] 开发油猴脚本版本
- [x] 开发Chrome扩展版本
- [ ] 支持批量处理
- [ ] 添加图标预览功能
- [ ] 支持自定义尺寸
- [ ] 添加图标优化选项
- [ ] 发布到 Chrome 网上应用店
- [ ] 支持更多平台（如 macOS、Windows）

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请提交 Issue。