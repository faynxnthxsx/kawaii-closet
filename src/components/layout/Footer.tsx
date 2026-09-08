export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Kawaii Closet</h3>
            <p className="text-sm text-gray-500">
              เสื้อผ้าสไตล์มินิมอล ที่ใส่ในทุกวันของคุณ <br/>
              เลือกสรรเสื้อผ้าคุณภาพดี ดีไซน์เรียบง่าย ใส่ได้ทุกโอกาส
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">เมนู</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>หน้าหลัก</li>
              <li>สินค้าทั้งหมด</li>
              <li>หมวดหมู่</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">ช่วยเหลือ</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>ติดตามสถานะการจัดส่ง</li>
              <li>นโยบายการเปลี่ยนคืนสินค้า</li>
              <li>ติดต่อเรา</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">ติดต่อเรา</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>อีเมล: contact@kawaiicloset.com</li>
              <li>โทร: 02-123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Kawaii Closet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
