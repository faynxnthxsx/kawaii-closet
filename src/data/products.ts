export const productsData = [
  {
    id: "1",
    category: "shirts",
    name: "เสื้อยืด Oversize",
    price: 390,
    stock: 15,
    colors: ["ดำ", "ขาว", "เทา"],
    sizes: ["S", "M", "L", "XL"],
    colorImages: {
      "ดำ": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      "ขาว": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      "เทา": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    details: ["ผ้า Cotton 100% เกรดพรีเมียม", "ทรง Oversize ไหล่ตก สไตล์มินิมอลเกาหลี", "คอเสื้อกลม ตัดเย็บประณีต ไม่ย้วยง่าย", "สามารถใส่ได้ทั้งผู้ชายและผู้หญิง (Unisex)"],
    care: "ซักเครื่องได้ด้วยน้ำเย็น, ห้ามใช้น้ำยาฟอกขาว, รีดด้วยไฟอ่อน",
    reviews: [
      { user: "คุณสมชาย", date: "12 ก.ย. 2568", text: "ใส่สบายมากครับ ชอบเนื้อผ้า", rating: 5 },
      { user: "คุณสมหญิง", date: "10 ก.ย. 2568", text: "ทรงสวย สีตรงปก แต่แอบตัวใหญ่ไปนิดนึง", rating: 4 }
    ]
  },
  {
    id: "s3",
    category: "shirts",
    name: "เสื้อครอป รัดรูป",
    price: 290,
    stock: 8,
    colors: ["ดำ", "ชมพู"],
    sizes: ["S", "M"],
    colorImages: {
      "ดำ": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
      "ชมพู": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
    },
    details: ["ผ้าร่องยืดหยุ่นสูง แนบไปกับลำตัว", "ทรงเข้ารูป แอบเซ็กซี่เบาๆ", "แมทช์กับกางเกงเอวสูงได้ลงตัว"],
    care: "ซักเครื่องตามปกติ, ห้ามใช้น้ำยาฟอกขาว",
    reviews: [{ user: "คุณเจน", date: "2 ต.ค. 2568", text: "ใส่แล้วผอมมาก ชอบค่ะ สั่งเพิ่มแน่นอน", rating: 5 }]
  },
  {
    id: "2",
    category: "pants",
    name: "กางเกงสแล็ค ทรงเกาหลี",
    price: 590,
    stock: 0,
    colors: ["ดำ", "กรมท่า", "เทา"],
    sizes: ["28", "30", "32", "34"],
    colorImages: {
      "ดำ": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
      "กรมท่า": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
      "เทา": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80"
    },
    details: ["เนื้อผ้าทิ้งตัวสวย ไม่ยับง่าย", "ทรงขากระบอกเล็ก เอวสูง", "แพทเทิร์นเนี๊ยบ ใส่ทำงานหรือใส่เที่ยวก็ดูดี"],
    care: "ซักเครื่องได้ รีดด้วยความร้อนปานกลาง ไม่ควรบิดแรง",
    reviews: [
      { user: "คุณอาร์ม", date: "5 ต.ค. 2568", text: "ทรงสวยมากครับ ตัดเย็บดี", rating: 5 },
      { user: "คุณกิ๊บ", date: "3 ต.ค. 2568", text: "ซื้อให้แฟน แฟนชอบมาก", rating: 5 }
    ]
  },
  {
    id: "p2",
    category: "pants",
    name: "กางเกงยีนส์ เอวสูง",
    price: 690,
    stock: 12,
    colors: ["ยีนส์อ่อน", "ยีนส์เข้ม"],
    sizes: ["S", "M", "L"],
    colorImages: {
      "ยีนส์อ่อน": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
      "ยีนส์เข้ม": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80"
    },
    details: ["ผ้ายีนส์หนานุ่ม ยืดหยุ่นเล็กน้อย", "ทรงเอวสูง เก็บหน้าท้องได้ดีมาก", "ปลายขาปล่อยรุ่ย สไตล์เกาหลี"],
    care: "แยกซักในครั้งแรก ป้องกันสีตก, กลับด้านก่อนซักและตากแดดร่ม",
    reviews: [{ user: "คุณแนน", date: "4 ต.ค. 2568", text: "เก็บทรงดีมาก ขาดูยาวขึ้นเยอะเลย", rating: 4 }]
  },
  {
    id: "p3",
    category: "pants",
    name: "กางเกงขาสั้น ใส่สบาย",
    price: 350,
    stock: 20,
    colors: ["ครีม", "ดำ"],
    sizes: ["M", "L", "XL"],
    colorImages: {
      "ครีม": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
      "ดำ": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80"
    },
    details: ["ผ้าคอตตอน 100% ใส่สบายสุดๆ", "เอวยางยืดรอบตัว มีเชือกรูดกระชับได้", "กระเป๋าลึก 2 ข้าง ใช้งานได้จริง"],
    care: "ซักเครื่องได้ตามปกติ แห้งไว",
    reviews: []
  },
  {
    id: "3",
    category: "dresses",
    name: "ชุดเดรส มินิมอล",
    price: 790,
    stock: 0,
    colors: ["ครีม", "ขาว"],
    sizes: ["Freesize"],
    colorImages: {
      "ครีม": "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=600&q=80",
      "ขาว": "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=600&q=80"
    },
    details: ["ดีไซน์เรียบหรู ดูแพง คัตติ้งเนี๊ยบ", "มีซับในในตัวทั้งชุด ไม่บางแน่นอน", "ดีเทลผูกโบว์ด้านหลังปรับความกระชับได้", "เหมาะสำหรับใส่ไปคาเฟ่หรือทำงาน"],
    care: "ซักมือหรือใส่ถุงซัก ซักด้วยน้ำเย็น, รีดด้วยไฟอ่อน",
    reviews: [
      { user: "คุณปู", date: "15 ต.ค. 2568", text: "น่ารักมากค่ะ ตรงปกสุดๆ ซับในดีมาก", rating: 5 }
    ]
  },
  {
    id: "d2",
    category: "dresses",
    name: "เดรสยาว ผ้าพริ้ว",
    price: 890,
    stock: 5,
    colors: ["แดงไวน์", "กรมท่า"],
    sizes: ["S", "M", "L"],
    colorImages: {
      "แดงไวน์": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
      "กรมท่า": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80"
    },
    details: ["ผ้าชีฟองเนื้อทราย พริ้วทิ้งตัวสวยมาก", "ทรงกระโปรงบาน เดินแล้วดูสง่า", "ใส่ออกงานแต่ง หรืองานกลางคืนได้เลย"],
    care: "ซักแห้ง หรือซักมืออย่างถนอม ห้ามบิด ห้ามอบร้อน",
    reviews: [{ user: "คุณบี", date: "20 ต.ค. 2568", text: "สีแดงขับผิวมากค่ะ สวยเกินราคา", rating: 5 }]
  }
];
