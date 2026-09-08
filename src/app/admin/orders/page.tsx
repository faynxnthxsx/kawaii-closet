"use client";
import { useOrderStore } from "@/store/orderStore";
import type { Order } from "@/store/orderStore";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrderStore();

  const handleStatusChange = (id: string, newStatus: Order["status"]) => {
    updateOrderStatus(id, newStatus);
    alert(`อัปเดตสถานะออเดอร์ ${id} เป็น "${newStatus}" เรียบร้อยแล้ว!`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ออเดอร์ลูกค้า (Orders)</h1>
        <p className="text-gray-500">จัดการคำสั่งซื้อและอัปเดตสถานะการจัดส่งให้ลูกค้า</p>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl mb-2">ยังไม่มีออเดอร์</p>
            <p className="text-sm">เมื่อลูกค้าสั่งซื้อ ข้อมูลจะมาปรากฏที่นี่</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm text-gray-500 bg-gray-50">
                  <th className="p-4 font-medium">รหัสออเดอร์</th>
                  <th className="p-4 font-medium">วันที่ / เวลา</th>
                  <th className="p-4 font-medium">รายการสินค้า</th>
                  <th className="p-4 font-medium">ยอดรวม</th>
                  <th className="p-4 font-medium">เปลี่ยนสถานะ</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50/50">
                    <td className="p-4 align-top">
                      <div className="font-bold text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        <span className={`px-2 py-0.5 rounded-full font-medium ${
                          order.status === "รับคำสั่งซื้อ" ? "bg-orange-100 text-orange-800" :
                          order.status === "เตรียมจัดส่ง" ? "bg-blue-100 text-blue-800" :
                          order.status === "ระหว่างขนส่ง" ? "bg-purple-100 text-purple-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          สถานะปัจจุบัน: {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 align-top">
                      {new Date(order.date).toLocaleString("th-TH")}
                    </td>
                    <td className="p-4 align-top">
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-2 text-sm border-b pb-2 last:border-0 last:pb-0">
                            <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-gray-500">สี{item.color} | ไซส์ {item.size} | x{item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-green-700 align-top">
                      ฿ {order.total}
                    </td>
                    <td className="p-4 align-top">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                        className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-sm bg-white cursor-pointer"
                      >
                        <option value="รับคำสั่งซื้อ">รับคำสั่งซื้อ (รอแพ็ค)</option>
                        <option value="เตรียมจัดส่ง">เตรียมจัดส่ง (แพ็คแล้ว)</option>
                        <option value="ระหว่างขนส่ง">ระหว่างขนส่ง (ส่งให้ขนส่งแล้ว)</option>
                        <option value="จัดส่งสำเร็จ">จัดส่งสำเร็จ</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
