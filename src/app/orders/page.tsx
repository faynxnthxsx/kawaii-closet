"use client";
import { useOrderStore } from "@/store/orderStore";
import { Package, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const { orders } = useOrderStore();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Package className="w-8 h-8 text-green-700" />
        ประวัติการสั่งซื้อของคุณ
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border">
          <p className="text-xl text-gray-500 mb-4">คุณยังไม่มีประวัติการสั่งซื้อ</p>
          <Link href="/shop/1">
            <Button className="bg-green-700 hover:bg-green-800 text-white">ไปช้อปปิ้งกันเลย</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Header ของแต่ละออเดอร์ */}
              <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">หมายเลขคำสั่งซื้อ</p>
                  <p className="font-bold text-gray-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">วันที่สั่งซื้อ</p>
                  <p className="font-medium text-gray-900">
                    {new Date(order.date).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ยอดสุทธิ</p>
                  <p className="font-bold text-green-700">฿ {order.total}</p>
                </div>
                <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {order.status === "รับคำสั่งซื้อ" && <CheckCircle className="w-4 h-4" />}
                  {order.status === "เตรียมจัดส่ง" && <Clock className="w-4 h-4" />}
                  {order.status}
                </div>
              </div>

              {/* แถบติดตามสถานะ (เพิ่มใหม่) */}
              <div className="px-6 pt-6 pb-2">
                <div className="flex justify-between items-center relative z-0">
                  <div className="absolute top-4 left-6 right-6 h-1 bg-gray-200 -z-10"></div>
                  <div className={`absolute top-4 left-6 h-1 bg-green-500 -z-10 transition-all ${
                    order.status === "รับคำสั่งซื้อ" ? "w-0" : 
                    order.status === "เตรียมจัดส่ง" ? "w-1/2" : "w-full"
                  }`}></div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-md">✓</div>
                    <span className="text-xs font-medium text-gray-700">รับคำสั่งซื้อ</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${
                      order.status === "เตรียมจัดส่ง" || order.status === "ระหว่างขนส่ง" || order.status === "จัดส่งสำเร็จ" 
                      ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}>2</div>
                    <span className={`text-xs font-medium ${order.status === "เตรียมจัดส่ง" ? "text-green-600 font-bold" : "text-gray-500"}`}>กำลังจัดส่ง</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${
                      order.status === "ระหว่างขนส่ง" || order.status === "จัดส่งสำเร็จ"
                      ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}>3</div>
                    <span className={`text-xs font-medium ${order.status === "ระหว่างขนส่ง" ? "text-green-600 font-bold" : "text-gray-500"}`}>ส่งสำเร็จแล้ว</span>
                  </div>
                </div>
              </div>

              {/* รายการสินค้า */}
              <div className="p-4 border-t mt-4 bg-gray-50/50">
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 border rounded overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500 mt-1">สี: {item.color}, ไซส์: {item.size}</p>
                        <p className="text-sm text-gray-500">จำนวน: {item.quantity}</p>
                      </div>
                      <div className="font-medium text-gray-900">
                        ฿ {item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
