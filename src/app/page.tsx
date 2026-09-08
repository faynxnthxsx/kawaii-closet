import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { productsData } from "@/data/products";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col items-center flex-1">
        {/* ส่วนป้ายโฆษณา (แบนเนอร์) */}
        <section className="w-full bg-slate-100 py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            เสื้อผ้าสไตล์มินิมอล <br/> ที่ใส่ในทุกวันของคุณ
          </h1>
          <p className="mt-4 text-lg text-gray-600 mb-8 max-w-2xl mx-auto px-4">
            เลือกสรรเสื้อผ้าคุณภาพดี ดีไซน์เรียบง่าย ใส่ได้ทุกโอกาส
          </p>
          <Link href="/shop/1">
            <Button size="lg" className="px-8 text-lg bg-green-700 hover:bg-green-800 text-white">
              เลือกซื้อสินค้าเลย
            </Button>
          </Link>
        </section>

        <section className="container mx-auto px-4 py-12 w-full">
          <h2 className="text-2xl font-bold mb-8 text-center">สินค้าขายดี</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* แสดงสินค้าขายดี 3 ชิ้นแรกจากฐานข้อมูล */}
            {productsData.slice(0, 3).map((item) => {
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
        </section>
      </div>

      {/* นำแถบด้านล่างมาไว้เฉพาะหน้าแรก */}
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}
