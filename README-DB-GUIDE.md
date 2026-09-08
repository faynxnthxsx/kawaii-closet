# 🚀 คู่มือการเชื่อมต่อ Database ฉบับสมบูรณ์ (จับมือทำทีละสเต็ป)

สวัสดีครับ Developer! 👋 
ผมได้เตรียม **โครงสร้างโค้ด (Service Layer)** และติดตั้ง Library (`@supabase/supabase-js`) ไว้ให้คุณหมดแล้ว หน้าที่ของคุณตอนนี้มีแค่ "สร้างตารางใน Database" "เอา Key มาใส่" และ "ลบคอมเมนต์โค้ด" เท่านั้น! 

มาเริ่มกันเลยครับ ทำตามทีละข้อ รับรองว่าต่อ DB เสร็จภายใน 15 นาที!

---

## 🟢 ขั้นตอนที่ 1: สร้าง Project ใน Supabase และรับ API Key
1. ไปที่เว็บไซต์ [Supabase.com](https://supabase.com/) แล้วกดปุ่ม **Start your project** (สมัครสมาชิกด้วย GitHub ก็ได้ครับ)
2. กดปุ่ม **New Project** ตั้งชื่อว่า `kawaii-closet` ตั้งรหัสผ่าน Database และรอระบบสร้างโปรเจกต์สัก 2-3 นาที
3. เมื่อสร้างเสร็จ ให้ไปที่เมนูซ้ายมือ (รูปเฟือง ⚙️) เลือก **Project Settings** -> **API**
4. ในหน้า API คุณจะเจอ:
   - **Project URL**
   - **Project API Keys (anon / public)**
5. กลับมาที่โค้ดในคอมพิวเตอร์ของคุณ เปิดไฟล์ชื่อ **`.env.local`** (ที่อยู่ด้านนอกสุดของโปรเจกต์)
6. เอาค่าที่คุณเพิ่งได้มา แปะทับลงไปแบบนี้:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5...
   ```
*(🎉 ยินดีด้วย! ตอนนี้เว็บของคุณเชื่อมกับ Supabase เรียบร้อยแล้ว)*

---

## 🟢 ขั้นตอนที่ 2: รันคำสั่ง SQL สร้างตาราง (Copy & Paste ได้เลย)
เราต้องสร้าง 2 ตารางคือ `products` (สินค้า) และ `orders` (ออเดอร์) 
เพื่อให้ง่ายที่สุด ให้ไปที่เมนูซ้ายมือใน Supabase หาไอคอน **SQL Editor** (รูปสัญลักษณ์ `< >`) 
เปิด New Query แล้วก๊อปปี้โค้ดด้านล่างนี้ไปวาง และกดปุ่ม **RUN** (มุมขวาล่าง):

```sql
-- สร้างตารางสินค้า (Products)
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  stock int NOT NULL DEFAULT 0,
  colors jsonb NOT NULL DEFAULT '[]',
  sizes jsonb NOT NULL DEFAULT '[]',
  details jsonb NOT NULL DEFAULT '[]',
  care text,
  "colorImages" jsonb NOT NULL DEFAULT '{}'
);

-- สร้างตารางออเดอร์ลูกค้า (Orders)
CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_info jsonb NOT NULL,
  items jsonb NOT NULL,
  total_price numeric NOT NULL,
  status text NOT NULL DEFAULT 'รับคำสั่งซื้อ'
);
```
*(ถ้าขึ้นว่า Success แปลว่าตารางสร้างเสร็จแล้ว ไปดูผลลัพธ์ได้ที่เมนู Table Editor)*

---

## 🟢 ขั้นตอนที่ 3: เปิดใช้งานโค้ด Backend (Uncomment โค้ดที่เตรียมไว้)
ผมได้เตรียมโค้ดคำสั่งยิงฐานข้อมูล (CRUD) ไว้ให้คุณหมดแล้ว อยู่ในโฟลเดอร์ `src/services/`
งานของคุณคือเข้าไป "ลบคอมเมนต์" เพื่อเปิดใช้งานโค้ดเหล่านั้นครับ

### ไฟล์ที่ 1: `src/services/productService.ts` (ระบบจัดการสินค้า)
เปิดไฟล์นี้ขึ้นมา คุณจะเห็นโครงสร้างฟังก์ชันแบบนี้:
```typescript
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
```
👉 **สิ่งที่คุณต้องทำ:** ให้คุณเอาสัญลักษณ์ `/*` และ `*/` ออก เพื่อเปิดใช้งานคำสั่ง `supabase` และลบคำสั่ง `return productsData;` บรรทัดล่างสุดทิ้งไป ทำแบบนี้ให้ครบ **ทุกฟังก์ชัน** ในไฟล์นี้! (get, create, update, delete)

### ไฟล์ที่ 2: `src/services/orderService.ts` (ระบบจัดการออเดอร์)
ทำเหมือนเดิมครับ เข้าไปลบคอมเมนต์ `/*` และ `*/` ออกในทุกๆ ฟังก์ชัน เพื่อเปิดใช้งานคำสั่ง Supabase จริงๆ

---

## 🟢 ขั้นตอนที่ 4: เชื่อม UI หน้าเว็บเข้ากับ Service

เมื่อคุณเปิดใช้งานไฟล์ Service ในขั้นตอนที่ 3 เสร็จแล้ว ขั้นตอนสุดท้ายคือเอา Service ไปเสียบแทน Mock Data เดิมในหน้าเว็บครับ!

### 4.1 เปลี่ยนหน้าแสดงสินค้าทั้งหมด
- ไปที่ไฟล์ `src/app/page.tsx` และ `src/app/shop/page.tsx` 
- ลบ `import { productsData } from "@/data/products";` ทิ้ง
- เปลี่ยนเป็น `import { getProducts } from "@/services/productService";`
- ใน Component เปลี่ยนไปใช้ตัวแปร `const products = await getProducts();` แทน `productsData`

### 4.2 เปลี่ยนหน้าหมวดหมู่สินค้า
- ไปที่ไฟล์ `src/app/category/[slug]/page.tsx`
- ใช้คำสั่ง `const products = await getProductsByCategory(slug);` 

### 4.3 เปลี่ยนตอนลูกค้ากด Checkout 
- ไปที่ไฟล์ `src/app/checkout/page.tsx`
- ในฟังก์ชัน `handleCheckout` (ที่ลูกค้ากดยืนยันจ่ายเงิน) ให้เรียกใช้:
  ```typescript
  import { createOrder } from "@/services/orderService";
  
  // และในฟังก์ชันแทนที่จะเซฟลงเครื่อง ให้ใช้:
  await createOrder({
     customer_info: { name: firstName, address: address /* ฯลฯ */ },
     items: checkoutItems,
     total_price: total + 50,
     status: "รับคำสั่งซื้อ"
  });
  ```

### 4.4 ระบบ Admin
เปลี่ยนระบบ State `useState(productsData)` ในหน้า `/admin/products` และ `/admin/inventory` ให้เป็นฟังก์ชัน `fetch` ข้อมูลมาจาก `getProducts()` และเวลาแก้ไข/ลบ ก็ให้ไปยิงฟังก์ชัน `updateProduct()` / `deleteProduct()` ใน Service แทน

---

🔥 **เท่านี้ก็เสร็จเรียบร้อย!** เว็บไซต์ Kawaii Closet ของคุณจะทำงานบน Database จริง 100% 
ระบบที่ผมเตรียมไว้ช่วยร่นเวลาทำงานคุณไปได้ 80% เลยทีเดียว ขอให้สนุกกับการเขียนโค้ดนะครับ! 💻✨
