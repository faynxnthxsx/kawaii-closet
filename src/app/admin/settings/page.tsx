"use client";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ตั้งค่าร้านค้า (Settings)</h1>
        <p className="text-gray-500">จัดการข้อมูลพื้นฐานและการแสดงผลของร้านค้าคุณ</p>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-4 border-b pb-2">ข้อมูลทั่วไป</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">ชื่อร้านค้า</label>
                <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600" defaultValue="Kawaii Closet" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">อีเมลติดต่อ</label>
                <input type="email" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600" defaultValue="contact@kawaiicloset.com" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b pb-2">การชำระเงิน</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 rounded" />
                <span className="font-medium text-gray-700">เปิดรับโอนเงินผ่านธนาคาร (QR PromptPay)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                <span className="font-medium text-gray-700">เปิดรับบัตรเครดิต (Stripe / Omise)</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 border-t flex justify-end">
          <Button className="bg-green-700 hover:bg-green-800 text-white px-8" onClick={() => alert('บันทึกการตั้งค่าสำเร็จ (จำลอง)')}>
            บันทึกการตั้งค่า
          </Button>
        </div>
      </div>
    </div>
  );
}
