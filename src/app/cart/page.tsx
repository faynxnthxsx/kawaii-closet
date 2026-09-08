"use client";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">ตะกร้าสินค้า</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border">
          <p className="text-xl text-gray-500 mb-4">ยังไม่มีสินค้าในตะกร้า</p>
          <Link href="/shop/1">
            <Button className="bg-green-700 hover:bg-green-800 text-white">กลับไปเลือกซื้อสินค้า</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item, index) => (
              <div key={index} className="flex gap-4 border-b py-4">
                <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden border shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">สี: {item.color} | ขนาด: {item.size}</p>
                  <p className="font-medium mt-1">฿ {item.price}</p>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} className="w-8 h-8 border rounded hover:bg-gray-100">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} className="w-8 h-8 border rounded hover:bg-gray-100">+</button>
                    <button 
                      onClick={() => removeItem(item.id, item.size, item.color)} 
                      className="ml-auto text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
                      title="ลบสินค้าทิ้ง"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg h-fit border">
            <h2 className="text-xl font-bold mb-4">สรุปคำสั่งซื้อ</h2>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>ยอดรวมสินค้า</span>
              <span>฿ {getTotalPrice()}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>ค่าจัดส่ง</span>
              <span>฿ 50</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4 mb-6">
              <span>ยอดรวมทั้งหมด</span>
              <span className="text-green-700">฿ {getTotalPrice() + 50}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full h-12 text-lg bg-green-700 hover:bg-green-800 text-white">ดำเนินการชำระเงิน</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
