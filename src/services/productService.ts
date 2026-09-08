import { supabase } from "@/lib/supabase";
import { productsData } from "@/data/products";

// ==========================================
// ไฟล์นี้คือ "โครงสร้าง Service" สำหรับต่อ Database
// เพื่อนของคุณสามารถมาลบคอมเมนต์และเปิดใช้ Supabase ได้เลยจากที่นี่ที่เดียว
// ==========================================

export const getProducts = async () => {
  // TODO: เมื่อต่อ Supabase แล้ว ให้ลบคอมเมนต์ด้านล่างนี้
  /*
  const { data, error } = await supabase.from('products').select('*');
  if (error) console.error(error);
  return data || [];
  */

  // ปัจจุบันส่งข้อมูลจำลองกลับไปก่อน
  return productsData;
};

export const getProductById = async (id: string) => {
  // TODO: เมื่อต่อ Supabase แล้ว ให้ลบคอมเมนต์ด้านล่างนี้
  /*
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) console.error(error);
  return data;
  */

  return productsData.find(p => p.id === id) || productsData[0];
};

export const getProductsByCategory = async (category: string) => {
  // TODO: เมื่อต่อ Supabase แล้ว ให้ลบคอมเมนต์ด้านล่างนี้
  /*
  const { data, error } = await supabase.from('products').select('*').eq('category', category);
  if (error) console.error(error);
  return data || [];
  */

  return productsData.filter(p => p.category === category);
};

export const createProduct = async (productData: any) => {
  // TODO: เมื่อต่อ Supabase แล้ว ให้ลบคอมเมนต์ด้านล่างนี้
  /*
  const { data, error } = await supabase.from('products').insert([productData]).select();
  if (error) console.error(error);
  return data;
  */
  
  console.log("Mock Create:", productData);
  return true;
};

export const updateProduct = async (id: string, productData: any) => {
  // TODO: เมื่อต่อ Supabase แล้ว ให้ลบคอมเมนต์ด้านล่างนี้
  /*
  const { data, error } = await supabase.from('products').update(productData).eq('id', id).select();
  if (error) console.error(error);
  return data;
  */
  
  console.log("Mock Update:", id, productData);
  return true;
};

export const deleteProduct = async (id: string) => {
  // TODO: เมื่อต่อ Supabase แล้ว ให้ลบคอมเมนต์ด้านล่างนี้
  /*
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) console.error(error);
  return true;
  */
  
  console.log("Mock Delete:", id);
  return true;
};
