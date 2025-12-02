/**
 * Icon生成工具箱 - 图标尺寸定义
 * 定义各平台所需的图标尺寸规范
 */

const ICON_SIZES = {
  chrome: [
    { size: 16, name: 'icon16.png', description: 'favicon, 工具栏' },
    { size: 32, name: 'icon32.png', description: 'Windows 任务栏' },
    { size: 48, name: 'icon48.png', description: '扩展管理页面' },
    { size: 128, name: 'icon128.png', description: 'Chrome 网上应用店' }
  ],
  
  ios: [
    { size: 20, name: 'Icon-20.png', description: 'Notification iOS 1x' },
    { size: 40, name: 'Icon-20@2x.png', description: 'Notification iOS 2x' },
    { size: 60, name: 'Icon-20@3x.png', description: 'Notification iOS 3x' },
    { size: 29, name: 'Icon-29.png', description: 'Settings iOS 1x' },
    { size: 58, name: 'Icon-29@2x.png', description: 'Settings iOS 2x' },
    { size: 87, name: 'Icon-29@3x.png', description: 'Settings iOS 3x' },
    { size: 40, name: 'Icon-40@2x.png', description: 'Spotlight iOS 2x' },
    { size: 80, name: 'Icon-40@3x.png', description: 'Spotlight iOS 3x' },
    { size: 120, name: 'Icon-60@2x.png', description: 'App Icon iPhone 2x' },
    { size: 180, name: 'Icon-60@3x.png', description: 'App Icon iPhone 3x' },
    { size: 76, name: 'Icon-76.png', description: 'App Icon iPad 1x' },
    { size: 152, name: 'Icon-76@2x.png', description: 'App Icon iPad 2x' },
    { size: 167, name: 'Icon-83.5@2x.png', description: 'App Icon iPad Pro' },
    { size: 1024, name: 'Icon-1024.png', description: 'App Store' }
  ],
  
  android: [
    { size: 48, density: 'mdpi', name: 'mipmap-mdpi/ic_launcher.png', description: '基准密度 (1x)' },
    { size: 72, density: 'hdpi', name: 'mipmap-hdpi/ic_launcher.png', description: '高密度 (1.5x)' },
    { size: 96, density: 'xhdpi', name: 'mipmap-xhdpi/ic_launcher.png', description: '超高密度 (2x)' },
    { size: 144, density: 'xxhdpi', name: 'mipmap-xxhdpi/ic_launcher.png', description: '超超高密度 (3x)' },
    { size: 192, density: 'xxxhdpi', name: 'mipmap-xxxhdpi/ic_launcher.png', description: '超超超高密度 (4x)' },
    { size: 512, name: 'playstore-icon.png', description: 'Play Store 应用商店' }
  ]
};

// 导出配置（支持多种模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ICON_SIZES };
} else if (typeof window !== 'undefined') {
  window.ICON_SIZES = ICON_SIZES;
}