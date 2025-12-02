/**
 * Icon生成工具箱 - Chrome插件交互逻辑
 * 复用核心处理逻辑，适配插件环境
 */

// 全局变量
let currentImageFile = null;
let currentPlatform = 'chrome';
let cropper = null;

// DOM元素
const uploadSection = document.getElementById('uploadSection');
const workspaceSection = document.getElementById('workspaceSection');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const pasteBtn = document.getElementById('pasteBtn');
const previewImage = document.getElementById('previewImage');
const filenameDisplay = document.getElementById('filename');
const reuploadBtn = document.getElementById('reuploadBtn');
const generateBtn = document.getElementById('generateBtn');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const messageContainer = document.getElementById('messageContainer');

// 初始化
function init() {
  setupEventListeners();
  updatePlatformSelection();
}

// 设置事件监听器
function setupEventListeners() {
  // 上传区域点击
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  // 文件选择
  fileInput.addEventListener('change', handleFileSelect);

  // 拖拽上传（插件环境中可能不支持，但保留代码）
  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  uploadArea.addEventListener('drop', handleDrop);

  // 粘贴按钮
  pasteBtn.addEventListener('click', handlePaste);

  // 重新上传按钮
  reuploadBtn.addEventListener('click', handleReupload);

  // 平台选择
  const platformRadios = document.querySelectorAll('input[name="platform"]');
  platformRadios.forEach(radio => {
    radio.addEventListener('change', handlePlatformChange);
  });

  // 生成按钮
  generateBtn.addEventListener('click', handleGenerate);
}

// 处理文件选择
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    processImageFile(file);
  }
}

// 处理拖拽悬停
function handleDragOver(event) {
  event.preventDefault();
  uploadArea.classList.add('dragover');
}

// 处理拖拽离开
function handleDragLeave(event) {
  event.preventDefault();
  uploadArea.classList.remove('dragover');
}

// 处理拖拽放下
function handleDrop(event) {
  event.preventDefault();
  uploadArea.classList.remove('dragover');

  const file = event.dataTransfer.files[0];
  if (file) {
    processImageFile(file);
  }
}

// 处理粘贴
async function handlePaste() {
  try {
    const file = await window.IconProcessor.pasteImageFromClipboard();
    processImageFile(file);
  } catch (error) {
    showMessage(error.message, 'error');
  }
}
// 处理重新上传
function handleReupload() {
  currentImageFile = null;
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
  fileInput.value = '';
  
  // 切换显示区域
  uploadSection.style.display = 'block';
  workspaceSection.style.display = 'none';
  
  // 重置进度
  progressContainer.style.display = 'none';
}

// 处理平台切换
function handlePlatformChange(event) {
  currentPlatform = event.target.value;
}

// 显示消息
function showMessage(message, type = 'success') {
  const msgDiv = document.createElement('div');
  msgDiv.className = `toast-message ${type}`;
  msgDiv.textContent = message;
  
  messageContainer.appendChild(msgDiv);
  
  setTimeout(() => {
    msgDiv.style.opacity = '0';
    msgDiv.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      if (msgDiv.parentNode) msgDiv.parentNode.removeChild(msgDiv);
    }, 300);
  }, 3000);
}

// 处理生成
async function handleGenerate() {
  if (!currentImageFile) {
    showMessage('请先上传图片', 'error');
    return;
  }

  try {
    // 禁用按钮
    generateBtn.disabled = true;
    generateBtn.textContent = '⏳ 生成中...';

    // 显示进度条
    progressContainer.style.display = 'block';
    updateProgress(0, 0);

    // 获取裁剪后的图片
    let sourceImage = currentImageFile;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas({
        width: 1024,
        height: 1024
      });
      sourceImage = canvas.toDataURL('image/png');
    }

    // 生成图标
    const icons = await window.IconProcessor.generateIcons(
      sourceImage,
      currentPlatform,
      updateProgress
    );

    // 创建ZIP包
    updateProgress(icons.length, icons.length);
    progressText.textContent = '正在打包...';

    const zipBlob = await window.IconUtils.createZipPackage(icons, currentPlatform);

    // 下载文件
    const filename = `${currentPlatform}-icons-${Date.now()}.zip`;
    window.IconUtils.downloadFile(zipBlob, filename);

    // 显示成功消息
    showMessage(
      `成功生成 ${icons.length} 个图标！文件大小: ${window.IconUtils.formatFileSize(zipBlob.size)}`,
      'success'
    );

    // 重置UI
    setTimeout(() => {
      progressContainer.style.display = 'none';
      generateBtn.disabled = false;
      generateBtn.textContent = '🚀 开始生成';
    }, 1000);

  } catch (error) {
    console.error('生成失败:', error);
    showMessage('生成失败: ' + error.message, 'error');

    // 重置UI
    progressContainer.style.display = 'none';
    generateBtn.disabled = false;
    generateBtn.textContent = '🚀 开始生成';
  }
}

// 更新进度
function updateProgress(current, total) {
  if (total === 0) {
    progressFill.style.width = '0%';
    progressText.textContent = '0%';
    return;
  }

  const percentage = Math.round((current / total) * 100);
  progressFill.style.width = percentage + '%';
  progressText.textContent = percentage + '%';
}

// 处理图片文件
function processImageFile(file) {
  // 验证文件
  if (!window.IconUtils.validateImageFile(file)) {
    showMessage('无效的图片文件或文件过大（最大10MB）', 'error');
    return;
  }

  // 保存文件
  currentImageFile = file;

  // 显示预览
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    filenameDisplay.textContent = file.name;
    
    // 切换显示区域：隐藏上传区，显示工作区
    uploadSection.style.display = 'none';
    workspaceSection.style.display = 'block';

    if (cropper) {
      cropper.destroy();
    }

    cropper = new Cropper(previewImage, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
      minContainerWidth: 300,
      minContainerHeight: 300
    });
  };
  reader.readAsDataURL(file);
}

// 更新平台选择
function updatePlatformSelection() {
  const checkedRadio = document.querySelector('input[name="platform"]:checked');
  if (checkedRadio) {
    currentPlatform = checkedRadio.value;
  }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}