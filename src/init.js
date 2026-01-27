// 应用初始化模块
import { createSupabaseClient } from './utils/supabase.js';
import { showNotification } from './utils/helpers.js';

export async function initializeApp() {
    try {
        // 从全局配置获取Supabase配置
        // const supabaseUrl = window.APP_CONFIG?.supabaseUrl;
        // const supabaseKey = window.APP_CONFIG?.supabaseKey;
        const supabaseUrl = 'https://zdhfnuixtefeudtogrzw.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkaGZudWl4dGVmZXVkdG9ncnp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MDU0NDksImV4cCI6MjA4NDk4MTQ0OX0.Pe1VOuJn8PZiE0l1qEQr1cLJEA--WgHp7iiECQkZe78';
        
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase配置缺失，请检查环境变量');
        }
        
        console.log('初始化Supabase客户端...');
        const supabase = createSupabaseClient(supabaseUrl, supabaseKey);
        
        // 测试连接
        console.log('测试数据库连接...');
        const { data, error } = await supabase
            .from('classes')
            .select('count')
            .limit(1);
        
        if (error) {
            throw new Error(`数据库连接失败: ${error.message}`);
        }
        
        console.log('✅ 数据库连接成功');
        
        // 保存到全局状态
        window.AppState.supabase = supabase;
        
        return supabase;
        
    } catch (error) {
        console.error('应用初始化错误:', error);
        showNotification(`初始化失败: ${error.message}`, 'error');
        throw error;
    }
}
