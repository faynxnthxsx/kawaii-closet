"use client";
import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Star, CheckCircle2, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { productsData } from "@/data/products";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  // แกะ params ด้วย React.use()
  const { id } = use(params);
  
  // ค้นหาสินค้าจากฐานข้อมูล
  const product = productsData.find(p => p.id === id) || productsData[0]; // fallback ไปตัวแรกถ้าไม่เจอ

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  
  const addItem = useCartStore((state) => state.addItem);
  const setDirectItem = useCartStore((state) => state.setDirectItem);
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const currentImage = product.colorImages[selectedColor as keyof typeof product.colorImages];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      image: currentImage,
    });
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = () => {
    setDirectItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      image: currentImage,
    });
    router.push("/checkout");
  };

  // จำลองดาวเฉลี่ย
  const averageRating = product.reviews.length > 0 
    ? product.reviews.reduce((acc, rev) => acc + rev.rating, 0) / product.reviews.length 
    : 5;

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link href="/shop" className="inline-flex items-center text-sm text-gray-500 hover:text-green-700 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          กลับไปหน้าสินค้าทั้งหมด
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* รูปภาพสินค้า */}
          <div className="md:col-span-5 lg:col-span-4 max-w-sm mx-auto w-full">
            <div className="bg-gray-100 rounded-lg aspect-[3/4] overflow-hidden border">
              <img 
                src={currentImage} 
                alt={`${product.name} สี${selectedColor}`} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* รายละเอียด */}
          <div className="md:col-span-7 lg:col-span-8 w-full">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-4 h-4 fill-current ${star > averageRating ? "text-gray-300" : ""}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviews.length} รีวิว)</span>
            </div>

            <p className="text-3xl text-green-700 font-semibold mb-6">฿ {product.price}</p>
            <p className="text-gray-600 mb-8">
              {product.details[0]}
            </p>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">สี</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => {
                  let hex = "#ccc";
                  if (color === "ดำ" || color === "กรมท่า") hex = "#222";
                  if (color === "ขาว" || color === "ครีม") hex = "#fff";
                  if (color === "ชมพู" || color === "แดงไวน์") hex = "#d97787";
                  if (color === "ยีนส์อ่อน") hex = "#8cb6db";
                  if (color === "ยีนส์เข้ม") hex = "#3f5a7d";

                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color ? "border-green-600 shadow-md scale-110" : "border-gray-200"
                      } transition-all relative group`}
                      style={{ backgroundColor: hex }}
                      title={color}
                    >
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                        {color}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">ขนาด</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-14 px-4 h-12 rounded-md border ${
                      selectedSize === size
                        ? "border-green-600 bg-green-50 text-green-700 font-bold"
                        : "border-gray-200 hover:border-gray-300"
                    } transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-3">จำนวน</h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border rounded-md flex items-center justify-center text-xl hover:bg-gray-50 transition-colors"
                >-</button>
                <span className="text-lg w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border rounded-md flex items-center justify-center text-xl hover:bg-gray-50 transition-colors"
                >+</button>
              </div>
            </div>

            {/* ปุ่มกดสั่งซื้อ */}
            {product.stock > 0 ? (
              <div className="flex gap-4">
                <Button size="lg" variant="outline" className="flex-1 text-lg h-14 border-green-700 text-green-700 hover:bg-green-50" onClick={handleAddToCart}>
                  เพิ่มลงตะกร้า
                </Button>
                <Button size="lg" className="flex-1 text-lg h-14 bg-green-700 hover:bg-green-800 text-white" onClick={handleBuyNow}>
                  ซื้อเลย
                </Button>
              </div>
            ) : (
              <div className="w-full bg-red-50 border border-red-200 text-red-600 text-center py-4 rounded-md font-bold text-lg">
                สินค้าหมด (งดจำหน่ายชั่วคราว)
              </div>
            )}
          </div>
        </div>

        {/* แท็บรายละเอียด */}
        <div className="border-t pt-8">
          <div className="flex gap-8 border-b mb-6 overflow-x-auto">
            <button 
              onClick={() => setActiveTab("details")}
              className={`pb-4 font-medium text-lg whitespace-nowrap transition-colors ${activeTab === "details" ? "border-b-2 border-green-700 text-green-700" : "text-gray-500 hover:text-gray-800"}`}
            >
              รายละเอียดสินค้า
            </button>
            <button 
              onClick={() => setActiveTab("size")}
              className={`pb-4 font-medium text-lg whitespace-nowrap transition-colors ${activeTab === "size" ? "border-b-2 border-green-700 text-green-700" : "text-gray-500 hover:text-gray-800"}`}
            >
              ขนาดและการดูแล
            </button>
            <button 
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 font-medium text-lg whitespace-nowrap transition-colors ${activeTab === "reviews" ? "border-b-2 border-green-700 text-green-700" : "text-gray-500 hover:text-gray-800"}`}
            >
              รีวิว ({product.reviews.length})
            </button>
          </div>

          <div className="min-h-[200px] text-gray-600">
            {activeTab === "details" && (
              <ul className="list-disc list-inside space-y-2">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            )}
            
            {activeTab === "size" && (
              <div className="space-y-4">
                <p>คำแนะนำเรื่องขนาด:</p>
                <div className="overflow-x-auto">
                  <table className="w-full max-w-md text-left border-collapse min-w-[300px]">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2">ไซส์</th>
                        <th className="py-2">รายละเอียดเพิ่มเติม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.sizes.map((size) => (
                        <tr className="border-b" key={size}>
                          <td className="py-2 font-medium">{size}</td>
                          <td className="py-2">เป็นไซส์มาตรฐาน (Standard Fit)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm bg-gray-50 p-4 rounded-md inline-block">
                  <span className="font-bold text-gray-800">การดูแลรักษา:</span> {product.care}
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {product.reviews.length === 0 ? (
                  <div className="text-gray-500 italic py-4">ยังไม่มีรีวิวสำหรับสินค้านี้</div>
                ) : (
                  product.reviews.map((rev, idx) => (
                    <div className="border-b pb-4" key={idx}>
                      <div className="flex text-yellow-400 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-4 h-4 fill-current ${star > rev.rating ? "text-gray-300" : ""}`} />
                        ))}
                      </div>
                      <p className="font-semibold text-gray-800">{rev.text}</p>
                      <p className="text-sm text-gray-500 mt-1">โดย {rev.user} - {rev.date}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ป๊อปอัปแจ้งเตือนสวยๆ */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-white border border-green-200 shadow-2xl rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 z-50">
          <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0" />
          <div className="pr-4">
            <p className="font-bold text-gray-900 text-base">เพิ่มสินค้าลงตะกร้าแล้ว!</p>
            <p className="text-sm text-gray-500">ไปที่ตะกร้าเพื่อดำเนินการชำระเงินได้เลย</p>
          </div>
        </div>
      )}
    </>
  );
}
