"use client";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, MapPin, Truck, CreditCard, Search } from "lucide-react";
import { provincePostalCodes } from "@/data/provinces";
import type { CartItem } from "@/store/cartStore";

const provincesList = Object.keys(provincePostalCodes).sort();

// ดึงรหัสไปรษณีย์ของจริงจากฐานข้อมูล
const getPostalCodes = (prov: string) => {
  return provincePostalCodes[prov] || [];
};

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart, directItem, setDirectItem } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  
  // เช็คว่าเป็นการซื้อเลย (direct) หรือซื้อจากตะกร้า
  const checkoutItems = directItem ? [directItem] : items;
  const checkoutTotal = directItem ? (directItem.price * directItem.quantity) : getTotalPrice();

  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderedItems, setOrderedItems] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);

  // State สำหรับกล่องค้นหาจังหวัด
  const [selectedProv, setSelectedProv] = useState("");
  const [provSearch, setProvSearch] = useState("");
  const [showProvDropdown, setShowProvDropdown] = useState(false);
  const provDropdownRef = useRef<HTMLDivElement>(null);

  // ปิด Dropdown เมื่อคลิกที่อื่น
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (provDropdownRef.current && !provDropdownRef.current.contains(event.target as Node)) {
        setShowProvDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProvinces = provincesList.filter(p => p.includes(provSearch));
  const availablePostalCodes = getPostalCodes(selectedProv);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProv) {
      alert("กรุณาเลือกจังหวัด");
      return;
    }
    
    const newOrderId = `#SV${Math.floor(Math.random() * 100000)}`;
    setOrderId(newOrderId);
    
    addOrder({
      id: newOrderId,
      date: new Date().toISOString(),
      items: [...checkoutItems],
      total: checkoutTotal + 50,
      status: "รับคำสั่งซื้อ"
    });

    setOrderedItems([...checkoutItems]);
    setOrderTotal(checkoutTotal + 50);
    setIsSuccess(true);
    
    // ล้างข้อมูลหลังสั่งซื้อสำเร็จ
    if (directItem) {
      setDirectItem(null);
    } else {
      clearCart();
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* ส่วนแสดงความสำเร็จเหมือนเดิม */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">สั่งซื้อสำเร็จ!</h1>
          <p className="text-gray-600 mb-2">ขอบคุณสำหรับการสั่งซื้อ ทางร้านได้รับออเดอร์แล้วครับ</p>
          <p className="text-gray-600">รหัสออเดอร์ของคุณคือ: <span className="font-bold text-gray-900 text-lg">{orderId}</span></p>
        </div>

        <div className="bg-white border rounded-lg p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-center border-b pb-4">ติดตามสถานะคำสั่งซื้อ</h2>
          {/* แถบสถานะ */}
          <div className="flex justify-between items-center mb-8 px-2 relative z-0">
            <div className="absolute top-4 left-6 right-6 h-1 bg-gray-200 -z-10"></div>
            <div className="absolute top-4 left-6 w-1/2 h-1 bg-green-500 -z-10"></div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">✓</div>
              <span className="text-xs font-medium">รับคำสั่งซื้อ</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm shadow-[0_0_0_4px_rgba(34,197,94,0.2)]">2</div>
              <span className="text-xs font-bold text-green-600">เตรียมจัดส่ง</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-sm">3</div>
              <span className="text-xs font-medium text-gray-500">ระหว่างขนส่ง</span>
            </div>
          </div>

          <h3 className="font-semibold mb-4 text-gray-700 bg-gray-50 p-2 rounded">รายการสินค้าที่ต้องจัดส่ง:</h3>
          <div className="space-y-4 mb-4 px-2">
            {orderedItems.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-16 h-16 bg-white border rounded overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-gray-500 mt-1">สี: {item.color}, ไซส์: {item.size}</p>
                  <p className="text-gray-500">จำนวน: {item.quantity}</p>
                </div>
                <div className="font-medium text-gray-900">
                  ฿ {item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg px-2">
            <span>ยอดชำระทั้งหมด (รวมค่าส่ง ฿ 50)</span>
            <span className="text-green-700">฿ {orderTotal}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full h-14 text-lg border-green-700 text-green-700 hover:bg-green-50">กลับไปช้อปปิ้ง</Button>
          </Link>
          <Link href="/orders" className="flex-1">
            <Button className="bg-green-700 hover:bg-green-800 text-white w-full h-14 text-lg">ดูประวัติคำสั่งซื้อทั้งหมด</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-xl text-gray-500 mb-4">ไม่พบสินค้าที่จะชำระเงิน</p>
        <Link href="/shop/1">
          <Button className="bg-green-700 hover:bg-green-800 text-white">กลับไปเลือกซื้อสินค้า</Button>
        </Link>
      </div>
    );
  }

  const inputClass = "w-full border border-gray-300 rounded-md p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 hover:border-gray-400 transition-all bg-white";

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <CreditCard className="w-8 h-8 text-green-700" />
        ชำระเงิน
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* ฝั่งซ้าย: ฟอร์มกรอกที่อยู่จัดส่ง */}
        <div>
          <h2 className="text-xl font-bold mb-6 pb-2 border-b flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-700" />
            ข้อมูลผู้ติดต่อและที่อยู่จัดส่ง
          </h2>
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ <span className="text-red-500">*</span></label>
                <input required type="text" className={inputClass} placeholder="ชื่อ" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล <span className="text-red-500">*</span></label>
                <input required type="text" className={inputClass} placeholder="นามสกุล" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล (ไม่บังคับ)</label>
              <input type="email" className={inputClass} placeholder="example@email.com" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
              <input required type="tel" className={inputClass} placeholder="081-234-5678" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่จัดส่ง <span className="text-red-500">*</span></label>
              <textarea required rows={3} className={inputClass} placeholder="บ้านเลขที่, อาคาร, ซอย, ถนน..."></textarea>
            </div>
            
            {/* ระบบพิมพ์ค้นหาจังหวัดและรหัสไปรษณีย์ */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative" ref={provDropdownRef}>
                <label className="block text-sm font-medium text-gray-700 mb-1">จังหวัด <span className="text-red-500">*</span></label>
                <div 
                  className={`${inputClass} flex justify-between items-center cursor-text`}
                  onClick={() => setShowProvDropdown(true)}
                >
                  <input 
                    type="text"
                    required
                    value={selectedProv || provSearch}
                    onChange={(e) => {
                      setProvSearch(e.target.value);
                      setSelectedProv(""); // พิมพ์ใหม่คือรีเซ็ตค่าที่เลือก
                      setShowProvDropdown(true);
                    }}
                    onFocus={() => setShowProvDropdown(true)}
                    placeholder="พิมพ์ค้นหาจังหวัด..."
                    className="outline-none w-full bg-transparent"
                  />
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                </div>
                
                {/* กล่อง Dropdown จังหวัด */}
                {showProvDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredProvinces.length > 0 ? (
                      filteredProvinces.map(prov => (
                        <div 
                          key={prov} 
                          className="px-4 py-2 hover:bg-green-50 cursor-pointer"
                          onClick={() => {
                            setSelectedProv(prov);
                            setProvSearch("");
                            setShowProvDropdown(false);
                          }}
                        >
                          {prov}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-sm">ไม่พบจังหวัดที่ค้นหา</div>
                    )}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">รหัสไปรษณีย์ <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select required className={`${inputClass} appearance-none cursor-pointer pr-10`} defaultValue="" disabled={!selectedProv}>
                    <option value="" disabled>{selectedProv ? "-- เลือกรหัส --" : "เลือกจังหวัดก่อน"}</option>
                    {availablePostalCodes.map((code) => (
                      <option key={code} value={code}>{code}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Truck className="w-5 h-5 text-green-700" />
                วิธีชำระเงิน
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-300 transition-colors">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4 accent-green-700" />
                  <span className="font-medium text-gray-800">โอนเงินผ่านธนาคาร / QR PromptPay</span>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-green-50 hover:border-green-300 transition-colors">
                  <input type="radio" name="payment" className="w-4 h-4 accent-green-700" />
                  <span className="font-medium text-gray-800">ชำระเงินปลายทาง (COD)</span>
                </label>
              </div>
            </div>
          </form>
        </div>
        
        {/* ฝั่งขวา: สรุปคำสั่งซื้อ */}
        <div>
          <div className="bg-gray-50 p-6 rounded-lg border sticky top-24 shadow-sm">
            <h2 className="text-xl font-bold mb-6">สรุปคำสั่งซื้อ</h2>
            
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {checkoutItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-16 h-16 bg-white border rounded overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-gray-500 mt-1">สี: {item.color}, ไซส์: {item.size}</p>
                    <p className="text-gray-500">จำนวน: {item.quantity}</p>
                  </div>
                  <div className="font-medium text-gray-900">
                    ฿ {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>ยอดรวมสินค้า</span>
                <span>฿ {checkoutTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>ค่าจัดส่ง</span>
                <span>฿ 50</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-4 mt-2 border-t">
                <span>ยอดรวมทั้งหมด</span>
                <span className="text-green-700">฿ {checkoutTotal + 50}</span>
              </div>
            </div>
            
            <Button 
              type="submit" 
              form="checkout-form"
              className="w-full h-14 text-lg bg-green-700 hover:bg-green-800 text-white mt-8 shadow-md transition-transform active:scale-[0.98]"
            >
              ยืนยันการสั่งซื้อ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
