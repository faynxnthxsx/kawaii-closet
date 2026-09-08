"use client";
import { useOrderStore } from "@/store/orderStore";
import { TrendingUp, ShoppingCart, DollarSign, Package } from "lucide-react";

export default function AdminDashboard() {
  const { orders } = useOrderStore();
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === "รับคำสั่งซื้อ" || o.status === "เตรียมจัดส่ง").length;
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ภาพรวมร้านค้า (Dashboard)</h1>
          <p className="text-gray-500">ข้อมูลสรุปยอดขายและคำสั่งซื้อทั้งหมดของคุณ</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">ยอดขายรวม</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">฿ {totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-green-100 text-green-700 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-green-600 flex items-center gap-1 font-medium">
            <TrendingUp className="w-4 h-4" /> +12.5% จากเดือนที่แล้ว
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">ออเดอร์ทั้งหมด</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</h3>
            </div>
            <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
              <ShoppingCart className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">ออเดอร์ทั้งหมดในระบบ</p>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">ออเดอร์รอจัดส่ง</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{pendingOrders}</h3>
            </div>
            <div className="p-3 bg-orange-100 text-orange-700 rounded-lg">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">ต้องรีบแพ็คส่งลูกค้า!</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">ออเดอร์ล่าสุด (Recent Orders)</h2>
        {orders.length === 0 ? (
          <div className="text-center py-10 text-gray-500">ยังไม่มีออเดอร์เข้ามาเลย ลองไปกดสั่งซื้อเล่นๆ ดูสิ!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm text-gray-500 bg-gray-50">
                  <th className="p-4 font-medium rounded-tl-lg">รหัสออเดอร์</th>
                  <th className="p-4 font-medium">วันที่</th>
                  <th className="p-4 font-medium">จำนวนชิ้น</th>
                  <th className="p-4 font-medium">ยอดรวม</th>
                  <th className="p-4 font-medium rounded-tr-lg">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString("th-TH")}
                    </td>
                    <td className="p-4">{order.items.reduce((sum, i) => sum + i.quantity, 0)} ชิ้น</td>
                    <td className="p-4 font-medium">฿ {order.total}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "รับคำสั่งซื้อ" ? "bg-orange-100 text-orange-800" :
                        order.status === "เตรียมจัดส่ง" ? "bg-blue-100 text-blue-800" :
                        order.status === "ระหว่างขนส่ง" ? "bg-purple-100 text-purple-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {order.status}
                      </span>
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
