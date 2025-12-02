/**
 * I18n support for Icon Generator Chrome Extension
 */

// Language Resources (shared with website)
const LOCALES = {
  zh: {
    subtitle: '优雅的多平台图标生成工具',
    upload_title: '点击或拖拽图片至此',
    upload_hint: '支持 PNG, JPG, GIF, WebP (最大 10MB)',
    paste: '从剪贴板粘贴',
    platform_title: '选择目标平台',
    generate: '开始生成',
    generating: '生成中...',
    packing: '正在打包...',
    success: (size) => `成功! 文件大小: ${size}`,
    invalid_file: '无效的图片文件或文件过大（最大10MB）',
    paste_error: '无法访问剪贴板',
    no_image: '剪贴板中没有图像',
    remove: '移除',
    reupload: '重新上传',
    chrome_desc: 'Extension',
    ios_desc: 'App Icon',
    android_desc: 'App Icon',
    close: '×'
  },
  en: {
    subtitle: 'Elegant Multi-Platform Icon Generator',
    upload_title: 'Click or drag image here',
    upload_hint: 'Supports PNG, JPG, GIF, WebP (Max 10MB)',
    paste: 'Paste from clipboard',
    platform_title: 'Choose target platform',
    generate: 'Generate Icons',
    generating: 'Generating...',
    packing: 'Packaging...',
    success: (size) => `Done! File size: ${size}`,
    invalid_file: 'Invalid image or file exceeds 10MB',
    paste_error: 'Cannot access clipboard',
    no_image: 'Clipboard contains no image',
    remove: 'Remove',
    reupload: 'Re-upload',
    chrome_desc: 'Extension',
    ios_desc: 'App Icon',
    android_desc: 'App Icon',
    close: '×'
  }
};

// Global State
let currentLanguage = 'zh';

// Initialize I18n
async function initI18n() {
  // Detect language
  try {
    const result = await chrome.storage.local.get(['iconGenLang']);
    const savedLang = result.iconGenLang;
    
    if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
      currentLanguage = savedLang;
    } else {
      const browserLang = navigator.language || navigator.languages[0];
      currentLanguage = browserLang.startsWith('zh') ? 'zh' : 'en';
    }
  } catch (error) {
    // Fallback to browser language if storage access fails
    const browserLang = navigator.language || navigator.languages[0];
    currentLanguage = browserLang.startsWith('zh') ? 'zh' : 'en';
  }
  
  // Apply translations
  applyTranslations();
  
  // Setup language switcher
  setupLanguageSwitcher();
}

// Set Language
async function setLanguage(lang) {
  if (lang !== 'zh' && lang !== 'en') return;
  currentLanguage = lang;
  
  try {
    await chrome.storage.local.set({ iconGenLang: lang });
  } catch (error) {
    console.warn('Failed to save language preference:', error);
  }
  
  applyTranslations();
}

// Get Current Language
function getLanguage() {
  return currentLanguage;
}

// Translate Key
function t(key, ...args) {
  const locale = LOCALES[currentLanguage];
  if (!locale) return key;
  
  const value = locale[key];
  if (typeof value === 'function') {
    return value(...args);
  }
  return value || key;
}

// Apply Translations to DOM
function applyTranslations() {
  // Update all elements with data-i18n attributes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });
  
  // Update elements with data-i18n-attr attributes
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const attr = el.getAttribute('data-i18n-attr');
    const key = el.getAttribute('data-i18n');
    if (attr && key) {
      el.setAttribute(attr, t(key));
    }
  });
  
  // Update language switcher button states
  const langButtons = document.querySelectorAll('.lang-switcher button');
  langButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === currentLanguage) {
      btn.classList.add('active');
    }
  });
}

// Setup Language Switcher
function setupLanguageSwitcher() {
  const switcher = document.querySelector('.lang-switcher');
  if (!switcher) return;
  
  switcher.innerHTML = `
    <button class="lang-btn" data-lang="zh">中文</button>
    <button class="lang-btn" data-lang="en">English</button>
  `;
  
  switcher.addEventListener('click', async (e) => {
    if (e.target.classList.contains('lang-btn')) {
      const lang = e.target.dataset.lang;
      await setLanguage(lang);
    }
  });
}

// Expose to global scope
window.I18n = {
  init: initI18n,
  setLanguage,
  getLanguage,
  t,
  applyTranslations
};