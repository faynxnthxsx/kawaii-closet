"use client";
import { useState } from "react";
import { productsData } from "@/data/products";
import { Plus, Edit, Trash2, Search, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  
  // สถานะสำหรับ Modal เพิ่ม/แก้ไข
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleDelete = (id: string) => {
    if(confirm("ยืนยันการลบสินค้านี้ออกจากระบบ?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  }

  const openAddModal = () => {
    setModalMode("add");
    setCurrentProduct({
      name: "",
      category: "shirts",
      price: "",
      details: [""]
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setModalMode("edit");
    setCurrentProduct({ ...product }); // copy data
    setIsModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!currentProduct.name || !currentProduct.price) {
      alert("กรุณากรอกชื่อและราคาให้ครบถ้วน");
      return;
    }

    if (modalMode === "add") {
      // จำลองการเพิ่มข้อมูลใหม่
      const newProduct = {
        ...currentProduct,
        id: "new-" + Date.now(),
        colors: ["ตามรูป"],
        sizes: ["Freesize"],
        colorImages: { "ตามรูป": "" }, // จำลองไม่มีรูป
        reviews: []
      };
      setProducts([newProduct, ...products]);
      alert("เพิ่มสินค้าสำเร็จ!");
    } else {
      // อัปเดตข้อมูลเดิมใน memory
      setProducts(products.map(p => p.id === currentProduct.id ? { ...p, ...currentProduct } : p));
      alert("อัปเดตข้อมูลสำเร็จ!");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">จัดการสินค้า (Products)</h1>
          <p className="text-gray-500">เพิ่ม ลบ และแก้ไขข้อมูลสินค้าในร้านของคุณ</p>
        </div>
        <Button onClick={openAddModal} className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> เพิ่มสินค้าใหม่
        </Button>
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
          <div className="text-sm font-medium text-gray-500">
            ทั้งหมด {filteredProducts.length} รายการ
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-sm text-gray-500 bg-gray-50">
                <th className="p-4 font-medium w-24">รูปภาพ</th>
                <th className="p-4 font-medium">ชื่อสินค้า</th>
                <th className="p-4 font-medium">หมวดหมู่</th>
                <th className="p-4 font-medium">ราคา</th>
                <th className="p-4 font-medium text-center">ตัวเลือก (สี/ไซส์)</th>
                <th className="p-4 font-medium text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    ไม่พบสินค้าที่ค้นหา
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const coverImage = product.colorImages ? (product.colorImages[product.colors[0] as keyof typeof product.colorImages] || "") : "";
                  
                  return (
                    <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50/80 transition-colors">
                      <td className="p-4">
                        <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border shrink-0">
                          {coverImage ? (
                            <img src={coverImage} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        {product.stock === 0 && (
                          <div className="mt-1">
                            <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold">งดจำหน่าย (สินค้าหมด)</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase border">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-green-700">฿ {product.price}</td>
                      <td className="p-4 text-sm text-gray-600 text-center">
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium mr-1">
                          {product.colors?.length || 1} สี
                        </span>
                        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                          {product.sizes?.length || 1} ไซส์
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => openEditModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 hover:border-blue-200 border border-transparent rounded-md transition-all" 
                            title="แก้ไข"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)} 
                            className="p-2 text-red-600 hover:bg-red-50 hover:border-red-200 border border-transparent rounded-md transition-all" 
                            title="ลบ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                {modalMode === "add" ? (
                  <><Plus className="w-5 h-5 text-green-600" /> เพิ่มสินค้าใหม่</>
                ) : (
                  <><Edit className="w-5 h-5 text-blue-600" /> แก้ไขข้อมูลสินค้า</>
                )}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">ชื่อสินค้า</label>
                <input 
                  type="text" 
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 transition-all" 
                  placeholder="เช่น เสื้อไหมพรม สไตล์เกาหลี" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">หมวดหมู่</label>
                  <select 
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-600 bg-white"
                  >
                    <option value="shirts">เสื้อ (Shirts)</option>
                    <option value="pants">กางเกง (Pants)</option>
                    <option value="dresses">เดรส (Dresses)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">ราคา (บาท)</label>
                  <input 
                    type="number" 
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-600" 
                    placeholder="0" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">รายละเอียดเบื้องต้น</label>
                <textarea 
                  rows={3} 
                  value={currentProduct.details ? currentProduct.details[0] : ""}
                  onChange={(e) => setCurrentProduct({...currentProduct, details: [e.target.value]})}
                  className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-green-600" 
                  placeholder="อธิบายจุดเด่นของสินค้า..."
                ></textarea>
              </div>

              {/* การอัปโหลดรูปภาพ (UI จำลอง) */}
              {modalMode === "edit" && currentProduct.colorImages && (
                <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-1.5">รูปภาพปัจจุบัน (แก้ไขยังไม่ได้ต้องต่อ DB)</label>
                   <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                     <img src={currentProduct.colorImages[currentProduct.colors[0]]} className="w-full h-full object-cover" />
                   </div>
                </div>
              )}
            </div>

            <div className="p-5 border-t bg-gray-50 flex justify-end gap-3">
              <Button variant="outline" className="px-6" onClick={() => setIsModalOpen(false)}>ยกเลิก</Button>
              <Button className="bg-green-700 hover:bg-green-800 text-white px-6 shadow-md" onClick={handleSaveProduct}>
                บันทึกการเปลี่ยนแปลง
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
