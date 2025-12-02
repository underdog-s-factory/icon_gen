/**
 * Icon生成工具箱 - 通用工具函数
 * 提供ZIP打包、文件下载等辅助功能
 */

/**
 * 创建ZIP压缩包（使用JSZip库）
 * @param {Array} icons - 图标数据数组
 * @param {string} platform - 平台名称
 * @returns {Promise<Blob>} - 返回ZIP文件的Blob对象
 */
async function createZipPackage(icons, platform) {
  // 检查JSZip是否已加载
  if (typeof JSZip === 'undefined') {
    throw new Error('JSZip库未加载');
  }
  
  const zip = new JSZip();
  
  // 创建平台文件夹
  const folder = zip.folder(platform + '-icons');
  
  // 将每个图标添加到ZIP
  icons.forEach(icon => {
    // 移除data URL前缀，获取base64数据
    const base64Data = icon.data.split(',')[1];
    
    // 添加文件到ZIP（保持目录结构）
    folder.file(icon.name, base64Data, { base64: true });
  });
  
  // 生成ZIP文件
  const content = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 9
    }
  });
  
  return content;
}

/**
 * 触发文件下载
 * @param {Blob} blob - 文件Blob对象
 * @param {string} filename - 文件名
 */
function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // 触发下载
  document.body.appendChild(link);
  link.click();
  
  // 清理
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * 格式化文件大小
 * @param {number} bytes - 字节数
 * @returns {string} - 格式化后的文件大小
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 验证图像文件
 * @param {File} file - 文件对象
 * @returns {boolean} - 是否为有效的图像文件
 */
function validateImageFile(file) {
  // 检查文件类型
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return false;
  }
  
  // 检查文件大小（限制10MB）
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
}

/**
 * 显示错误消息
 * @param {string} message - 错误消息
 * @param {HTMLElement} container - 容器元素
 */
function showError(message, container) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  container.appendChild(errorDiv);
  
  // 3秒后自动移除
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv);
    }
  }, 3000);
}

/**
 * 显示成功消息
 * @param {string} message - 成功消息
 * @param {HTMLElement} container - 容器元素
 */
function showSuccess(message, container) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.textContent = message;
  
  container.appendChild(successDiv);
  
  // 3秒后自动移除
  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.parentNode.removeChild(successDiv);
    }
  }, 3000);
}

// 导出函数（支持多种模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createZipPackage,
    downloadFile,
    formatFileSize,
    validateImageFile,
    showError,
    showSuccess
  };
} else if (typeof window !== 'undefined') {
  window.IconUtils = {
    createZipPackage,
    downloadFile,
    formatFileSize,
    validateImageFile,
    showError,
    showSuccess
  };
}