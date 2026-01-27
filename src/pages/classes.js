// 班级管理页面
import { fetchClasses, createClass, updateClass, deleteClass } from '../utils/api.js';
import { showNotification, showModal } from '../utils/helpers.js';

export async function renderClasses() {
    try {
        const classes = await fetchClasses();
        
        return `
            <div class="card">
                <div class="card-header">
                    <div class="card-title">
                        <i class="fas fa-users"></i>
                        <span>班级管理</span>
                    </div>
                    <button class="btn btn-primary" onclick="showAddClassModal()">
                        <i class="fas fa-plus"></i>
                        添加班级
                    </button>
                </div>
                
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>年级</th>
                                <th>班号</th>
                                <th>班级名称</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${classes.length > 0 ? classes.map(cls => `
                                <tr>
                                    <td><span class="badge badge-primary">${cls.grade}年级</span></td>
                                    <td><strong>${cls.class_number}班</strong></td>
                                    <td>${cls.class_name || '-'}</td>
                                    <td>${new Date(cls.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <div style="display: flex; gap: 0.5rem;">
                                            <button class="btn btn-sm btn-secondary" onclick="editClass('${cls.id}')">
                                                <i class="fas fa-edit"></i>
                                                编辑
                                            </button>
                                            <button class="btn btn-sm btn-danger" onclick="deleteClassConfirm('${cls.id}')">
                                                <i class="fas fa-trash"></i>
                                                删除
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('') : `
                                <tr>
                                    <td colspan="5">
                                        <div class="empty-state">
                                            <div class="empty-icon">
                                                <i class="fas fa-users-slash"></i>
                                            </div>
                                            <h3>暂无班级数据</h3>
                                            <p>点击"添加班级"按钮创建第一个班级</p>
                                        </div>
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
    } catch (error) {
        console.error('渲染班级页面失败:', error);
        return `
            <div class="alert alert-error">
                <i class="fas fa-exclamation-triangle"></i>
                <span>加载班级数据失败: ${error.message}</span>
            </div>
        `;
    }
}

// 全局函数供HTML调用
window.showAddClassModal = function() {
    showModal('添加班级', `
        <form id="addClassForm">
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">年级 *</label>
                    <select class="form-select" id="grade" required>
                        <option value="">选择年级</option>
                        ${[1,2,3,4,5,6].map(g => `
                            <option value="${g}">${g}年级</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">班号 *</label>
                    <input type="number" class="form-input" id="classNumber" min="1" max="99" required>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">班级名称（可选）</label>
                <input type="text" class="form-input" id="className" placeholder="例如：阳光班、启航班">
            </div>
        </form>
    `, 'saveClass()');
};

window.saveClass = async function() {
    try {
        const grade = document.getElementById('grade').value;
        const classNumber = document.getElementById('classNumber').value;
        const className = document.getElementById('className').value;
        
        if (!grade || !classNumber) {
            showNotification('请填写年级和班号', 'error');
            return;
        }
        
        const classData = {
            grade: parseInt(grade),
            class_number: parseInt(classNumber),
            class_name: className || null
        };
        
        await createClass(classData);
        showNotification('班级添加成功！', 'success');
        
        // 重新加载页面
        window.location.reload();
        
    } catch (error) {
        showNotification('添加失败: ' + error.message, 'error');
    }
};

window.editClass = function(classId) {
    // 这里实现编辑功能
    showNotification('编辑功能开发中...', 'info');
};

window.deleteClassConfirm = function(classId) {
    showModal('确认删除', `
        <p>确定要删除这个班级吗？</p>
        <p class="text-muted">删除操作不可恢复，请谨慎操作。</p>
    `, `deleteClass('${classId}')`);
};

window.deleteClass = async function(classId) {
    try {
        await deleteClass(classId);
        showNotification('班级删除成功！', 'success');
        window.location.reload();
    } catch (error) {
        showNotification('删除失败: ' + error.message, 'error');
    }
};
