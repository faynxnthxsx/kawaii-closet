import { Users, Clock } from "lucide-react";

export default function AdminCustomersPage() {
  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center">
      <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full">
        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">ระบบลูกค้าสมาชิก</h1>
        <p className="text-gray-500 mb-8">
          ระบบจัดการโปรไฟล์ลูกค้า, แต้มสะสม และระบบคูปองส่วนลด
        </p>
        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full font-medium text-sm">
          <Clock className="w-4 h-4" /> จะเพิ่มในเร็วๆ นี้ (Coming Soon)
        </div>
      </div>
    </div>
  );
}
