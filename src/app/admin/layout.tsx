import Link from "next/link";
import { LayoutDashboard, ShoppingBag, ShoppingCart, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col shadow-sm">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/admin" className="font-bold text-xl tracking-wider">
            KAWAII <span className="text-green-700">ADMIN</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors font-medium">
            <LayoutDashboard className="w-5 h-5" /> ภาพรวม (Dashboard)
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors font-medium">
            <ShoppingCart className="w-5 h-5" /> ออเดอร์ลูกค้า
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors font-medium">
            <ShoppingBag className="w-5 h-5" /> จัดการสินค้า
          </Link>
          <Link href="/admin/inventory" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> สต๊อกสินค้า
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-md transition-colors font-medium">
            <Users className="w-5 h-5" /> ลูกค้าสมาชิก
          </Link>
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">A</div>
            <div>
              <p className="text-sm font-bold">Admin Manager</p>
              <p className="text-xs text-gray-500">admin@kawaii.com</p>
            </div>
          </div>
          <Link href="/" className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 transition-colors w-full">
            <LogOut className="w-4 h-4" /> กลับไปหน้าร้านค้า
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
}
