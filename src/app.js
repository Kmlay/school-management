// 主应用入口文件
import { initializeApp } from './init.js';
import { showPage } from './router.js';
import { showNotification } from './utils/helpers.js';

// 全局应用状态
const AppState = {
    supabase: null,
    currentPage: 'dashboard',
    isLoading: false,
    user: null,
    data: {
        classes: [],
        students: [],
        teachers: [],
        scores: []
    }
};

// 初始化应用
async function init() {
    try {
        // 显示加载状态
        setLoading(true);
        
        // 初始化应用
        await initializeApp();
        
        // 设置导航事件
        setupNavigation();
        
        // 设置页面路由
        setupRouting();
        
        // 初始加载首页
        await showPage('dashboard');
        
        // 更新连接状态
        updateConnectionStatus(true);
        
        showNotification('系统初始化成功！', 'success');
        
    } catch (error) {
        console.error('应用初始化失败:', error);
        showNotification('系统初始化失败: ' + error.message, 'error');
        updateConnectionStatus(false);
    } finally {
        setLoading(false);
    }
}

// 设置导航事件
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            showPage(page);
            
            // 更新活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// 设置路由
function setupRouting() {
    // 处理URL哈希变化
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1) || 'dashboard';
        showPage(hash);
    });
    
    // 初始处理
    const initialHash = window.location.hash.substring(1) || 'dashboard';
    showPage(initialHash);
}

// 更新连接状态
function updateConnectionStatus(isConnected) {
    const statusElement = document.getElementById('connection-status');
    if (statusElement) {
        if (isConnected) {
            statusElement.className = 'status online';
            statusElement.innerHTML = '<i class="fas fa-circle"></i> 在线';
        } else {
            statusElement.className = 'status offline';
            statusElement.innerHTML = '<i class="fas fa-circle"></i> 离线';
        }
    }
}

// 设置加载状态
function setLoading(isLoading) {
    AppState.isLoading = isLoading;
    const content = document.getElementById('content');
    if (isLoading) {
        content.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>正在加载...</p>
            </div>
        `;
    }
}

// 导出应用状态
window.AppState = AppState;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 导出函数供其他模块使用
export { AppState, setLoading, updateConnectionStatus };
