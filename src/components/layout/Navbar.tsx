"use client";
import Link from "next/link";
import { ShoppingCart, Package, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function Navbar() {
  const { items } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* โลโก้แบรนด์ */}
        <Link href="/" className="text-xl font-bold tracking-wider">
          KAWAII <span className="text-green-700">CLOSET</span>
        </Link>

        {/* เมนูตรงกลาง (สำหรับจอใหญ่) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-green-700 transition-colors">หน้าหลัก</Link>
          
          {/* เมนูหมวดหมู่แบบ Dropdown */}
          <div className="relative group py-5">
            <span className="hover:text-green-700 transition-colors cursor-pointer flex items-center gap-1">
              หมวดหมู่สินค้า <ChevronDown className="w-4 h-4" />
            </span>
            <div className="absolute top-full left-0 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/category/shirts" className="block px-4 py-3 hover:bg-gray-50 hover:text-green-700 border-b">เสื้อ (Shirts)</Link>
              <Link href="/category/pants" className="block px-4 py-3 hover:bg-gray-50 hover:text-green-700 border-b">กางเกง (Pants)</Link>
              <Link href="/category/dresses" className="block px-4 py-3 hover:bg-gray-50 hover:text-green-700">ชุดเดรส (Dresses)</Link>
            </div>
          </div>
          
          <Link href="/shop" className="hover:text-green-700 transition-colors">สินค้าทั้งหมด</Link>
        </div>

        {/* ไอคอนเมนูฝั่งขวา */}
        <div className="flex items-center gap-6">
          <Link href="/orders" className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center gap-1">
            <Package className="w-6 h-6" />
            <span className="text-[10px] font-medium uppercase tracking-wider hidden sm:block">ประวัติ</span>
          </Link>
          
          <Link href="/cart" className="text-gray-600 hover:text-green-700 transition-colors flex flex-col items-center gap-1">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {/* Badge ตัวเลขตะกร้า */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider hidden sm:block">ตะกร้า</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
