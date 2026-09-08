"use client";
import { useState } from "react";
import { productsData } from "@/data/products";
import { Search, AlertCircle, PackagePlus, PackageMinus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminInventoryPage() {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleStockChange = (id: string, amount: number) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newStock = Math.max(0, p.stock + amount);
        return { ...p, stock: newStock };
      }
      return p;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">สต๊อกสินค้า (Inventory)</h1>
          <p className="text-gray-500">จัดการจำนวนสินค้าคงเหลือในคลัง</p>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
          <div className="relative w-72">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อสินค้า..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 text-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-500 bg-gray-50">
                <th className="p-4 font-medium">รหัสสินค้า / ชื่อ</th>
                <th className="p-4 font-medium">หมวดหมู่</th>
                <th className="p-4 font-medium text-center">สถานะ</th>
                <th className="p-4 font-medium text-center">จำนวนคงเหลือ</th>
                <th className="p-4 font-medium text-right">ปรับสต๊อก</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-500 mt-1">ID: {product.id}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{product.category}</td>
                  <td className="p-4 text-center">
                    {product.stock > 0 ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">พร้อมขาย</span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center justify-center gap-1 w-max mx-auto">
                        <AlertCircle className="w-3 h-3" /> สินค้าหมด (งดจำหน่าย)
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center font-bold text-lg">
                    {product.stock}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleStockChange(product.id, -1)} disabled={product.stock === 0}>
                        <PackageMinus className="w-4 h-4 text-red-500" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleStockChange(product.id, 1)}>
                        <PackagePlus className="w-4 h-4 text-green-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
