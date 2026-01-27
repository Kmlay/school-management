// Supabase客户端工具
export function createSupabaseClient(url, key) {
    return window.supabase.createClient(url, key);
}

// 安全查询包装器
export async function safeQuery(queryFn, errorMessage = '操作失败') {
    try {
        const result = await queryFn();
        if (result.error) {
            throw new Error(result.error.message);
        }
        return result.data;
    } catch (error) {
        console.error('Supabase查询错误:', error);
        throw new Error(`${errorMessage}: ${error.message}`);
    }
}

// 批量操作
export async function batchOperation(operations) {
    const results = [];
    for (const operation of operations) {
        try {
            const result = await operation();
            results.push({ success: true, data: result });
        } catch (error) {
            results.push({ success: false, error: error.message });
        }
    }
    return results;
}
