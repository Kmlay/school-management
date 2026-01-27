// 页面路由模块
import { renderDashboard } from './pages/dashboard.js';
import { renderClasses } from './pages/classes.js';
import { renderStudents } from './pages/students.js';
import { renderTeachers } from './pages/teachers.js';
import { renderScores } from './pages/scores.js';
import { renderReports } from './pages/reports.js';
import { showNotification } from './utils/helpers.js';

const pageMap = {
    dashboard: {
        title: '数据看板',
        description: '系统概览和统计数据',
        render: renderDashboard
    },
    classes: {
        title: '班级管理',
        description: '管理班级信息',
        render: renderClasses
    },
    students: {
        title: '学生管理',
        description: '管理学生信息',
        render: renderStudents
    },
    teachers: {
        title: '教师管理',
        description: '管理教师信息',
        render: renderTeachers
    },
    scores: {
        title: '成绩录入',
        description: '录入和管理学生成绩',
        render: renderScores
    },
    reports: {
        title: '成绩报表',
        description: '查看成绩统计和分析',
        render: renderReports
    }
};

export async function showPage(pageName) {
    try {
        const page = pageMap[pageName];
        if (!page) {
            throw new Error(`页面 ${pageName} 不存在`);
        }
        
        // 更新页面标题
        document.getElementById('page-title').textContent = page.title;
        document.getElementById('page-description').textContent = page.description;
        
        // 更新URL哈希
        window.location.hash = pageName;
        
        // 更新应用状态
        window.AppState.currentPage = pageName;
        
        // 渲染页面
        const content = await page.render();
        document.getElementById('content').innerHTML = content;
        
        // 执行页面特定脚本
        executePageScript(pageName);
        
    } catch (error) {
        console.error(`加载页面 ${pageName} 失败:`, error);
        showNotification(`加载页面失败: ${error.message}`, 'error');
        
        // 显示错误页面
        document.getElementById('content').innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3>页面加载失败</h3>
                <p>${error.message}</p>
                <button class="btn btn-primary" onclick="window.location.hash='dashboard'">
                    返回首页
                </button>
            </div>
        `;
    }
}

function executePageScript(pageName) {
    // 这里可以执行页面特定的初始化脚本
    switch (pageName) {
        case 'classes':
            // 初始化班级页面事件
            if (typeof window.initClassesPage === 'function') {
                window.initClassesPage();
            }
            break;
        case 'students':
            // 初始化学生页面事件
            if (typeof window.initStudentsPage === 'function') {
                window.initStudentsPage();
            }
            break;
        // 其他页面...
    }
}
