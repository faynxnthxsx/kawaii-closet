import Link from "next/link";
import { productsData } from "@/data/products";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let categoryTitle = "สินค้าทั้งหมด";
  if (slug === "shirts") categoryTitle = "เสื้อ (Shirts)";
  else if (slug === "pants") categoryTitle = "กางเกง (Pants)";
  else if (slug === "dresses") categoryTitle = "ชุดเดรส (Dresses)";

  // กรองสินค้าเฉพาะหมวดหมู่นั้นจากฐานข้อมูลจำลอง
  const products = productsData.filter(p => p.category === slug);

  return (
    <div className="container mx-auto px-4 py-12 min-h-[70vh]">
      <div className="flex justify-between items-end mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">{categoryTitle}</h1>
        <div className="text-sm text-gray-500">
          เรียงตาม: <select className="border-b border-gray-300 outline-none cursor-pointer"><option>สินค้าใหม่ล่าสุด</option><option>ราคา ต่ำ-สูง</option></select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {products.map((item) => {
          const firstColor = item.colors[0];
          const coverImage = item.colorImages[firstColor as keyof typeof item.colorImages] || "";
          
          return (
            <Link href={`/shop/${item.id}`} key={item.id} className="group cursor-pointer">
              <div className="aspect-[3/4] w-full bg-gray-100 rounded-md overflow-hidden border mb-3 relative">
                <img src={coverImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors truncate">{item.name}</h3>
              <p className="text-xs text-gray-500 mb-1 mt-1">มีให้เลือก {item.colors.length} สี</p>
              <p className="font-medium text-green-700">฿ {item.price}</p>
            </Link>
          );
        })}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          ไม่พบสินค้าในหมวดหมู่นี้
        </div>
      )}
    </div>
  );
}
