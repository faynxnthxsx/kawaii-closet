import { supabase } from "@/lib/supabase";

// ==========================================
// ไฟล์นี้คือ "โครงสร้าง Service" สำหรับออเดอร์
// ให้เพื่อนลบคอมเมนต์และใช้ Supabase แทน Zustand ได้เลย
// ==========================================

export const createOrder = async (orderData: any) => {
  // TODO: เมื่อต่อ Supabase แล้ว ให้ลบคอมเมนต์ด้านล่างนี้
  /*
  const { data, error } = await supabase.from('orders').insert([orderData]).select();
  if (error) throw error;
  return data;
  */
  
  return true;
};

export const getOrders = async () => {
  // TODO: เมื่อต่อ Supabase แล้ว ให้ลบคอมเมนต์ด้านล่างนี้
  /*
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (error) console.error(error);
  return data || [];
  */
  return [];
};

export const updateOrderStatus = async (id: string, status: string) => {
  // TODO: เมื่อต่อ Supabase แล้ว ให้ลบคอมเมนต์ด้านล่างนี้
  /*
  const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select();
  if (error) console.error(error);
  return data;
  */
  return true;
};
