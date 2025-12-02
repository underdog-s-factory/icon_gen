/**
 * Icon生成工具箱 - Canvas图像处理核心函数
 * 提供图像缩放、处理和生成功能
 */

/**
 * 将图像缩放到指定尺寸
 * @param {HTMLImageElement} image - 源图像对象
 * @param {number} size - 目标尺寸（正方形）
 * @returns {string} - 返回 data URL 格式的图像数据
 */
function resizeImage(image, size) {
  // 创建离屏 canvas 元素
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  
  // 获取 2D 渲染上下文
  const ctx = canvas.getContext('2d');
  
  // 启用图像平滑以获得更好的缩放质量
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // 绘制缩放后的图像
  ctx.drawImage(image, 0, 0, size, size);
  
  // 返回 PNG 格式的 data URL
  return canvas.toDataURL('image/png');
}

/**
 * 从文件或 data URL 加载图像
 * @param {File|string} source - 图像文件对象或 data URL
 * @returns {Promise<HTMLImageElement>} - 返回加载完成的图像对象
 */
function loadImage(source) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      // 图像加载成功，释放对象 URL（如果是从文件创建的）
      if (typeof source !== 'string') {
        URL.revokeObjectURL(img.src);
      }
      resolve(img);
    };
    
    img.onerror = () => {
      reject(new Error('图像加载失败'));
    };
    
    // 设置图像源
    if (typeof source === 'string') {
      img.src = source;
    } else {
      img.src = URL.createObjectURL(source);
    }
  });
}

/**
 * 生成指定平台的所有尺寸图标
 * @param {File|string} imageSource - 图像文件对象或 data URL
 * @param {string} platform - 平台名称 ('chrome', 'ios', 'android')
 * @param {Function} progressCallback - 进度回调函数 (current, total)
 * @returns {Promise<Array>} - 返回图标数据数组
 */
async function generateIcons(imageSource, platform, progressCallback) {
  // 检查平台是否有效
  if (!window.ICON_SIZES || !window.ICON_SIZES[platform]) {
    throw new Error(`不支持的平台: ${platform}`);
  }
  
  // 加载源图像
  const img = await loadImage(imageSource);
  
  // 获取该平台的尺寸配置
  const sizes = window.ICON_SIZES[platform];
  const total = sizes.length;
  const icons = [];
  
  // 生成各尺寸图标
  for (let i = 0; i < total; i++) {
    const sizeInfo = sizes[i];
    
    // 调用进度回调
    if (progressCallback) {
      progressCallback(i + 1, total);
    }
    
    // 缩放图像
    const resizedDataUrl = resizeImage(img, sizeInfo.size);
    
    // 保存图标信息
    icons.push({
      name: sizeInfo.name,
      data: resizedDataUrl,
      size: sizeInfo.size,
      description: sizeInfo.description || ''
    });
  }
  
  return icons;
}

/**
 * 从剪贴板粘贴图像
 * @returns {Promise<File>} - 返回图像文件对象
 */
async function pasteImageFromClipboard() {
  try {
    const clipboardItems = await navigator.clipboard.read();
    
    for (const item of clipboardItems) {
      for (const type of item.types) {
        if (type.startsWith('image/')) {
          const blob = await item.getType(type);
          return new File([blob], 'pasted-image.png', { type: 'image/png' });
        }
      }
    }
    
    throw new Error('剪贴板中没有图像');
  } catch (error) {
    throw new Error('无法访问剪贴板: ' + error.message);
  }
}

// 导出函数（支持多种模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    resizeImage,
    loadImage,
    generateIcons,
    pasteImageFromClipboard
  };
} else if (typeof window !== 'undefined') {
  window.IconProcessor = {
    resizeImage,
    loadImage,
    generateIcons,
    pasteImageFromClipboard
  };
}
