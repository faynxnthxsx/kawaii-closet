import { createClient } from '@supabase/supabase-js';

// ค่าเหล่านี้จะดึงมาจากไฟล์ .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// สร้าง client สำหรับเชื่อมต่อ
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
