// API接口模块
export async function fetchStats() {
    const supabase = window.AppState.supabase;
    
    try {
        const [classes, students, teachers, scores] = await Promise.all([
            supabase.from('classes').select('*', { count: 'exact', head: true }),
            supabase.from('students').select('*', { count: 'exact', head: true }),
            supabase.from('teachers').select('*', { count: 'exact', head: true }),
            supabase.from('scores').select('*', { count: 'exact', head: true })
        ]);
        
        return {
            classesCount: classes.count || 0,
            studentsCount: students.count || 0,
            teachersCount: teachers.count || 0,
            scoresCount: scores.count || 0
        };
    } catch (error) {
        console.error('获取统计数据失败:', error);
        throw error;
    }
}

export async function fetchClasses() {
    const supabase = window.AppState.supabase;
    
    try {
        const { data, error } = await supabase
            .from('classes')
            .select('*')
            .order('grade')
            .order('class_number');
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('获取班级数据失败:', error);
        throw error;
    }
}

export async function createClass(classData) {
    const supabase = window.AppState.supabase;
    
    try {
        const { error } = await supabase
            .from('classes')
            .insert([classData]);
        
        if (error) throw error;
    } catch (error) {
        console.error('创建班级失败:', error);
        throw error;
    }
}

export async function updateClass(classId, classData) {
    const supabase = window.AppState.supabase;
    
    try {
        const { error } = await supabase
            .from('classes')
            .update(classData)
            .eq('id', classId);
        
        if (error) throw error;
    } catch (error) {
        console.error('更新班级失败:', error);
        throw error;
    }
}

export async function deleteClass(classId) {
    const supabase = window.AppState.supabase;
    
    try {
        const { error } = await supabase
            .from('classes')
            .delete()
            .eq('id', classId);
        
        if (error) throw error;
    } catch (error) {
        console.error('删除班级失败:', error);
        throw error;
    }
}

// 学生相关API
export async function fetchStudents() {
    const supabase = window.AppState.supabase;
    
    try {
        const { data, error } = await supabase
            .from('students')
            .select(`
                *,
                classes (grade, class_number, class_name)
            `)
            .order('student_id');
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('获取学生数据失败:', error);
        throw error;
    }
}

export async function createStudent(studentData) {
    const supabase = window.AppState.supabase;
    
    try {
        const { error } = await supabase
            .from('students')
            .insert([studentData]);
        
        if (error) throw error;
    } catch (error) {
        console.error('创建学生失败:', error);
        throw error;
    }
}
