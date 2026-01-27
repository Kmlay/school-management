// 数据看板页面
import { fetchStats } from '../utils/api.js';
import { showNotification } from '../utils/helpers.js';

export async function renderDashboard() {
    try {
        // 获取统计数据
        const stats = await fetchStats();
        
        return `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-number">${stats.classesCount || 0}</div>
                    <div class="stat-label">班级总数</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="stat-number">${stats.studentsCount || 0}</div>
                    <div class="stat-label">学生总数</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-chalkboard-teacher"></i>
                    </div>
                    <div class="stat-number">${stats.teachersCount || 0}</div>
                    <div class="stat-label">教师总数</div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="stat-number">${stats.scoresCount || 0}</div>
                    <div class="stat-label">成绩记录</div>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-bolt"></i>
                        <span>快速操作</span>
                    </div>
                </div>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="window.location.hash='classes'">
                        <i class="fas fa-plus"></i>
                        添加班级
                    </button>
                    <button class="btn btn-primary" onclick="window.location.hash='students'">
                        <i class="fas fa-user-plus"></i>
                        添加学生
                    </button>
                    <button class="btn btn-primary" onclick="window.location.hash='scores'">
                        <i class="fas fa-edit"></i>
                        录入成绩
                    </button>
                    <button class="btn btn-primary" onclick="window.location.hash='reports'">
                        <i class="fas fa-chart-pie"></i>
                        查看报表
                    </button>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-info-circle"></i>
                        <span>系统信息</span>
                    </div>
                </div>
                <div style="line-height: 1.6; color: var(--gray-600);">
                    <p>🎯 <strong>系统功能完整，包含：</strong></p>
                    <ul style="margin: 1rem 0 1rem 1.5rem;">
                        <li>班级管理（1-6年级）</li>
                        <li>学生信息管理</li>
                        <li>教师信息管理</li>
                        <li>成绩录入与统计</li>
                        <li>数据报表分析</li>
                    </ul>
                    <p>📝 <strong>使用流程：</strong></p>
                    <ol style="margin: 1rem 0 1rem 1.5rem;">
                        <li>首先创建班级</li>
                        <li>然后添加学生到班级</li>
                        <li>最后录入各科成绩</li>
                        <li>查看报表分析数据</li>
                    </ol>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('渲染首页失败:', error);
        return `
            <div class="alert alert-error">
                <i class="fas fa-exclamation-triangle"></i>
                <span>加载数据失败: ${error.message}</span>
            </div>
        `;
    }
}
