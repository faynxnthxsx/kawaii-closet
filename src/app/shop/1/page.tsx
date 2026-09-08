"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Star, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const colorImages: Record<string, string> = {
  "ดำ": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  "ขาว": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  "เทา": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
};

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("ดำ");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const addItem = useCartStore((state) => state.addItem);
  const setDirectItem = useCartStore((state) => state.setDirectItem);
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: "prod-1",
      name: "เสื้อยืด Oversize",
      price: 390,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      image: colorImages[selectedColor],
    });
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = () => {
    // เอาสินค้าไปพักไว้ใน directItem เพื่อซื้อแบบไม่เข้าตะกร้า
    setDirectItem({
      id: "prod-1",
      name: "เสื้อยืด Oversize",
      price: 390,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      image: colorImages[selectedColor],
    });
    router.push("/checkout");
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16">
          {/* รูปภาพสินค้า */}
          <div className="md:col-span-5 lg:col-span-4 max-w-sm mx-auto w-full">
            <div className="bg-gray-100 rounded-lg aspect-[3/4] overflow-hidden border">
              {/* เอา key และ animate-in ออก เพื่อให้รูปเปลี่ยนทันทีโดยไม่โหลดใหม่ (ไม่กระพริบ) */}
              <img 
                src={colorImages[selectedColor]} 
                alt={`เสื้อยืด Oversize สี${selectedColor}`} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* รายละเอียด */}
          <div className="md:col-span-7 lg:col-span-8 w-full">
            <h1 className="text-3xl font-bold mb-2">เสื้อยืด Oversize</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current text-gray-300" />
              </div>
              <span className="text-sm text-gray-500">(120 รีวิว)</span>
            </div>

            <p className="text-3xl text-green-700 font-semibold mb-6">฿ 390</p>
            <p className="text-gray-600 mb-8">
              เสื้อยืดทรง Oversize ใส่สบาย เนื้อผ้านุ่ม ระบายอากาศได้ดี เหมาะกับทุกสไตล์
            </p>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">สี</h3>
              <div className="flex gap-3">
                {["ดำ", "ขาว", "เทา"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color ? "border-green-600 shadow-md scale-110" : "border-gray-200"
                    } transition-all`}
                    style={{ backgroundColor: color === "ดำ" ? "#222" : color === "ขาว" ? "#fff" : "#ccc" }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">ขนาด</h3>
              <div className="flex gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-12 rounded-md border ${
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

            {/* ปุ่มกดสั่งซื้อ: ขอบเขียว 1 ปุ่ม, ทึบเขียว 1 ปุ่ม */}
            <div className="flex gap-4">
              <Button size="lg" variant="outline" className="flex-1 text-lg h-14 border-green-700 text-green-700 hover:bg-green-50" onClick={handleAddToCart}>
                เพิ่มลงตะกร้า
              </Button>
              <Button size="lg" className="flex-1 text-lg h-14 bg-green-700 hover:bg-green-800 text-white" onClick={handleBuyNow}>
                ซื้อเลย
              </Button>
            </div>
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
              รีวิว (120)
            </button>
          </div>

          <div className="min-h-[200px] text-gray-600">
            {activeTab === "details" && (
              <ul className="list-disc list-inside space-y-2">
                <li>ผ้า Cotton 100% เกรดพรีเมียม</li>
                <li>ทรง Oversize ไหล่ตก สไตล์มินิมอลเกาหลี</li>
                <li>คอเสื้อกลม ตัดเย็บประณีต ไม่ย้วยง่าย</li>
                <li>สามารถใส่ได้ทั้งผู้ชายและผู้หญิง (Unisex)</li>
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
                        <th className="py-2">รอบอก (นิ้ว)</th>
                        <th className="py-2">ความยาว (นิ้ว)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="py-2">S</td><td className="py-2">40</td><td className="py-2">26</td></tr>
                      <tr className="border-b"><td className="py-2">M</td><td className="py-2">42</td><td className="py-2">27</td></tr>
                      <tr className="border-b"><td className="py-2">L</td><td className="py-2">44</td><td className="py-2">28</td></tr>
                      <tr className="border-b"><td className="py-2">XL</td><td className="py-2">46</td><td className="py-2">29</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm bg-gray-50 p-4 rounded-md inline-block">การดูแลรักษา: ซักเครื่องได้ด้วยน้ำเย็น, ห้ามใช้น้ำยาฟอกขาว, รีดด้วยไฟอ่อน</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="font-semibold text-gray-800">ใส่สบายมากครับ ชอบเนื้อผ้า</p>
                  <p className="text-sm text-gray-500 mt-1">โดย คุณสมชาย - 12 ก.ย. 2568</p>
                </div>
                <div className="border-b pb-4">
                  <div className="flex text-yellow-400 mb-1">
                    <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <p className="font-semibold text-gray-800">ทรงสวย สีตรงปก แต่แอบตัวใหญ่ไปนิดนึง</p>
                  <p className="text-sm text-gray-500 mt-1">โดย คุณสมหญิง - 10 ก.ย. 2568</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ป๊อปอัปแจ้งเตือนสวยๆ เวลากดเพิ่มลงตะกร้า (Toast Notification) */}
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
