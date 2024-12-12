const supabase = supabase.createClient(
    'https://ladaynoqqfogftxjqxgx.supabase.co',  // Substitua pela sua URL
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZGF5bm9xcWZvZ2Z0eGpxeGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyODA0MTQsImV4cCI6MjA0Nzg1NjQxNH0.uTUzBQrkEH3qjBbGEhmM1ZNzxVEQW2VNuoUr-CXxzwA'        // Substitua pela sua chave anônima
);

async function fetchData(tableName) {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
    return data;
}

async function insertData(tableName, newData) {
    const { data, error } = await supabase.from(tableName).insert(newData);
    if (error) {
        console.error('Erro ao inserir dados:', error);
        return null;
    }
    return data;
}